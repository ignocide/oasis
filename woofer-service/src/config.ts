import * as fs from 'fs';
import * as path from 'path';

const configFile = path.join(__dirname, '..', 'config.json')

let file: any = {};
try {
  file = fs.readFileSync(configFile, 'utf8');
  console.log(file)
  file = JSON.parse(file)
} catch (e) {
  throw new Error('config file is not exist, need to run yarn fetch:config')
}

export default file

// const getConfig = ():any => {
//   return file;
// };
//
// export default getConfig