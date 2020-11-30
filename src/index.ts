import portfinder from 'portfinder';
import loaders from './loaders';

async function startServer() {

  /**
   * load express application
   **/
  const app = await loaders();

  // find an open port
  portfinder.getPort((err, port) => {
    if (err) {
      throw err;
    }

    // start the server
    app.listen(port, () => (
      console.log(`Running on :${port} 👍`)
    )).on('error', err => {
      console.error(err);
      process.exit(1);
    });
  });
}

startServer();