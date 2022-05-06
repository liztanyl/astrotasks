import { resolve } from 'path';
import db from './models/index.mjs';

import initUsersController from './controllers/users.mjs';
import initTasksController from './controllers/tasks.mjs';

export default function routes(app) {
  const usersController = initUsersController(db);
  const tasksController = initTasksController(db);

  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
  app.post('/signup', usersController.create);
  app.post('/login', usersController.login);
  app.post('/check-auth', usersController.checkAuth);
  app.post('/tasks', tasksController.index);
  app.post('/tasks/add', tasksController.add);
  app.post('/task/:id', tasksController.show);
  app.post('/task/:id/edit', tasksController.edit);
  app.post('/task/:id/delete', tasksController.destroy);
  app.post('/task/:id/update', tasksController.update);
  app.post('/tasks/get-new', tasksController.fetchNew);
}
