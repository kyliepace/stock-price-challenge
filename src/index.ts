import express from 'express';
import portfinder from 'portfinder';
import Redis from 'ioredis';
import { scaleLinear } from 'd3-scale';

async function startServer() {
  const app = express();

  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  await require('./loaders').default({ expressApp: app });

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
};

startServer();



/**
 * code to move
 */
// // init redis; how to use: https://github.com/luin/ioredis#basic-usage
// const redis = new Redis();

// /**
//  * Use D3 to map values to the (x, y) position on the ASCII line chart.
//  * https://github.com/d3/d3-scale#linear-scales
//  * https://observablehq.com/@d3/d3-scalelinear
//  *
//  * @example
//  * const x = scaleLinear().domain([-100, 100]).range([0, 10]);
//  * x(35); // 6.75
//  * x(-80); // 1
//  */

// // do your magic here 👇
// app.get('/ascii', (req, res) => res.send('hello world'));
