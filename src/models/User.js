const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
      },
      {
        sequelize: connection,
        hooks: {
          beforeSave: async (user) => {
            if (user.password) {
              user.password_hash = await bcrypt.hash(user.password, 8);
            }
          },
        },
      }
    );
  }

  static associtate(models) {
    this.hasMany(models.Todo, { foreignKey: "user_id", as: "todos" });
  }

  static checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = User;
