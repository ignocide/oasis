import SpringCloudConfigClient from './lib/spring-cloud-client';
import Geocoding from './lib/Geocoding';

const configClient = new SpringCloudConfigClient({
  configServerUrl: '',
  username: '',
  password: '',
})

// configClient.fetch({
//   name:"",
//   profile: "",
// })
//   .then((result) => {
//   console.log(result)
// })
// .catch(console.error)

const geocoding = new Geocoding({
  apiKey: ''
})


geocoding.locationNameToPoint('의정부')  .catch(console.error)
