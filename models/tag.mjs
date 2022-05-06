export default function initTagModel(sequelize, DataTypes) {
  return sequelize.define('tag',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      tableName: 'tags',
      underscored: true,
    });
}
