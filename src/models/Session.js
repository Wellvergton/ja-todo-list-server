const { DataTypes, Model } = require("sequelize");

class Session extends Model {
  static init(connection) {
    super.init(
      {
        sid: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        user_id: DataTypes.UUID,
        expires: DataTypes.DATE,
        data: DataTypes.TEXT,
      },
      {
        sequelize: connection,
      }
    );
  }

  static assotiate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "owner" });
  }
}

module.exports = Session;
