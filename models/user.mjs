export default function initUserModel(sequelize, DataTypes) {
  return sequelize.define('user',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          isEmail: true,
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true,
        },
      },
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true,
        },
      },
      bootcamp: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: 'users',
      underscored: true,
    });
}
