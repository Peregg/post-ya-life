import express from 'express';
import next from 'next';
import glob from 'glob';

const isDev = process.env.NODE_ENV !== 'production';

const app = next({ dev: isDev });
const handle = app.getRequestHandler();

const loadProject = (app) => {
  const models = glob.sync('src/**/models/*.ts');
  /* eslint-disable-next-line */
  models.forEach((file) => require(`../${file}`));
};

(async () => {
  await app.prepare();

  // init main database
  /* eslint-disable-next-line */
  require('./database');

  const server = express();

  try {
    // @xxx load models files
    loadProject(app);
  } catch (e) {
    console.error(`[server error] ${e.message}`);
  }

  server.all('*', handle);
  await server.listen(process.env.PORT);

  console.info(`[server] ready on port ${process.env.PORT}`);
})();
