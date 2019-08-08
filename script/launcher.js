const docker = require('docker-compose');

const options = {
  cwd: '../'
}

const preLaunchServices = [
  ['mysql', 'discovery-service'],
]


const launch = async function () {
  try {
    for (let preLaunchService of preLaunchServices) {
      await docker.upMany(preLaunchService);
      console.info(`${preLaunchService.join(' ')} services is up`)
    }
    await docker.upAll();

    console.log('extra services is up')

  } catch (e) {
    console.error(e);
  }
}

launch();