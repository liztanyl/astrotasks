import cookieParser from 'cookie-parser';
import express from 'express';
import bindRoutes from './routes.mjs';
import cron from 'node-cron'
import { getNewTasks } from './getCourseData.mjs';

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('dist'));

const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  const { default: webpack } = await import('webpack')
  const { default: webpackDevMiddleware } =  await import('webpack-dev-middleware');
  const { default: webpackHotMiddleware } = await import('webpack-hot-middleware');
  const { default: webpackConfig } = await import('./webpack_conf/webpack.dev.js');

  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    // html only
    writeToDisk: (filePath) => /\.html$/.test(filePath),
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
}

bindRoutes(app);

cron.schedule('0 10 * * 1', function() {
  console.log('Monday 10am - going to fetch bootcamp data');
  getNewTasks();
});
cron.schedule('0 10 * * 2', function() {
  console.log('Tuesday 10am - going to fetch bootcamp data');
  getNewTasks();
});
cron.schedule('0 10 * * 3', function() {
  console.log('Wednesday 10am - going to fetch bootcamp data');
  getNewTasks();
});
cron.schedule('0 10 * * 4', function() {
  console.log('Thursday 10am - going to fetch bootcamp data');
  getNewTasks();
});
cron.schedule('0 10 * * 5', function() {
  console.log('Friday 10am - going to fetch bootcamp data');
  getNewTasks();
});

const PORT = process.env.PORT || 3004;
app.listen(PORT);