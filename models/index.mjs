import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';
import initUserModel from './user.mjs';
import initTaskModel from './task.mjs';
import initTagModel from './tag.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Task = initTaskModel(sequelize, Sequelize.DataTypes);
db.Tag = initTagModel(sequelize, Sequelize.DataTypes);

db.User.hasMany(db.Task);
db.Task.belongsTo(db.User);

db.Task.belongsToMany(db.Tag, { through: 'tasks_tags' });
db.Tag.belongsToMany(db.Task, { through: 'tasks_tags' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
