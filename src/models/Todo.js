const { DataTypes, Model } = require("sequelize");

class Todo extends Model {
  static init(connection) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
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
