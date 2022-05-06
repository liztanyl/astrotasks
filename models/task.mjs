export default function initTaskModel(sequelize, DataTypes) {
  return sequelize.define('task',
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
      url: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      courseDate: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      completed: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: 'tasks',
      underscored: true,
    });
}
