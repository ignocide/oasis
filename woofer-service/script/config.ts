import ConfigClient from 'spring-cloud-config-client-js'
import * as path from 'path'

const env = process.env.NODE_ENV === 'production' ? 'production' : 'dev'
const config = require('../configServerConfig.json');
const configClient = new ConfigClient(config)

const isProduction = process.env.NODE_ENV === 'production' ? true : false

const fetchConfig = async () => {
  console.log('start fetching config env: ', env);

  const fileName = isProduction ? 'config.prov.json' : 'config.json'
  const filePath = path.join(__dirname, '..', fileName)

  try {
    await configClient.write(filePath, {
      name: "woofer-service",
      profile: env,
    })
    console.log("fetching config is done");
  } catch (e) {
    console.error('fetching config is fail')
    console.error(e)
  }
  
}


fetchConfig();