const { DataTypes, Model } = require("sequelize");
const uid = require("uid-safe");

class Todo extends Model {
  static init(connection) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        title: DataTypes.STRING,
        context: DataTypes.STRING,
        description: DataTypes.STRING,
        type: DataTypes.STRING,
        date: DataTypes.STRING,
      },
      {
        sequelize: connection,
      }
    );
  }

  static associtate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "owner" });
  }
}

module.exports = Todo;
