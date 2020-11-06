const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
require('./dataProvider');

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
  });

} else {
  require('./index');
}
