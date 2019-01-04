'use strict';

var url = 'https://maps.googleapis.com/maps/api/geocode/json';
var axios = require('axios');
var KEYS = require('../keys.json');

var googleKey = KEYS.google;

var getLocationFromName = function getLocationFromName(locationName, cb) {
  axios.get(url, {
    params: {
      address: locationName,
      key: googleKey,
      language: 'ko'
    }
  }).then(function (result) {
    cb(null, parseResult(result.data));
  }).catch(function (err) {
    cb(new Error('지역명을 찾을 수 없습니다.'));
  });
};
// {
//     "results": [
//         {
//             "address_components": [
//                 {
//                     "long_name": "２８８",
//                     "short_name": "２８８",
//                     "types": [
//                         "premise"
//                     ]
//                 },
//                 {
//                     "long_name": "종로",
//                     "short_name": "종로",
//                     "types": [
//                         "political",
//                         "sublocality",
//                         "sublocality_level_4"
//                     ]
//                 },
//                 {
//                     "long_name": "종로6가",
//                     "short_name": "종로6가",
//                     "types": [
//                         "political",
//                         "sublocality",
//                         "sublocality_level_2"
//                     ]
//                 },
//                 {
//                     "long_name": "종로구",
//                     "short_name": "종로구",
//                     "types": [
//                         "political",
//                         "sublocality",
//                         "sublocality_level_1"
//                     ]
//                 },
//                 {
//                     "long_name": "서울특별시",
//                     "short_name": "서울특별시",
//                     "types": [
//                         "administrative_area_level_1",
//                         "political"
//                     ]
//                 },
//                 {
//                     "long_name": "대한민국",
//                     "short_name": "KR",
//                     "types": [
//                         "country",
//                         "political"
//                     ]
//                 },
//                 {
//                     "long_name": "110-126",
//                     "short_name": "110-126",
//                     "types": [
//                         "postal_code"
//                     ]
//                 }
//             ],
//             "formatted_address": "대한민국 서울특별시 종로구 종로6가 종로 288",
//             "geometry": {
//                 "location": {
//                     "lat": 37.5711389,
//                     "lng": 127.0095452
//                 },
//                 "location_type": "ROOFTOP",
//                 "viewport": {
//                     "northeast": {
//                         "lat": 37.5724878802915,
//                         "lng": 127.0108941802915
//                     },
//                     "southwest": {
//                         "lat": 37.5697899197085,
//                         "lng": 127.0081962197085
//                     }
//                 }
//             },
//             "place_id": "ChIJm6x0HTujfDURbf9iX8DtJ2A",
//             "plus_code": {
//                 "compound_code": "H2C5+FR 대한민국 서울특별시",
//                 "global_code": "8Q99H2C5+FR"
//             },
//             "types": [
//                 "establishment",
//                 "point_of_interest"
//             ]
//         }
//     ],
//     "status": "OK"
// }
var parseResult = function parseResult(response) {
  var locationJson = null;
  try {
    locationJson = response.results[0];
    if (!locationJson) {
      throw new Error();
    }
  } catch (e) {
    throw new Error();
  }

  var address = locationJson.formatted_address;
  var location = locationJson.geometry.location;
  return {
    address: address, location: location
  };
};

module.exports = {
  getLocationFromName: getLocationFromName
};