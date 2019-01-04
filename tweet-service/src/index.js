"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spring_cloud_client_1 = require("./lib/spring-cloud-client");
var Geocoding_1 = require("./lib/Geocoding");
var configClient = new spring_cloud_client_1.default({
    configServerUrl: '',
    username: '',
    password: '',
});
// configClient.fetch({
//   name:"",
//   profile: "",
// })
//   .then((result) => {
//   console.log(result)
// })
// .catch(console.error)
var geocoding = new Geocoding_1.default({
    apiKey: ''
});
geocoding.locationNameToPoint('의정부').catch(console.error);
