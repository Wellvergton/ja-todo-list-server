const { DataTypes, Model } = require("sequelize");

class Session extends Model {
  static init(connection) {
    super.init(
      {
        sid: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        expires: DataTypes.DATE,
        data: DataTypes.TEXT,
      },
      {
        sequelize: connection,
      }
    );
  }
}

module.exports = Session;
