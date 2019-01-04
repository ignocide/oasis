'use strict';

var apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
var axios = require('axios');

var KEYS = require('../keys.json');

var weatherKey = KEYS.weather;

var getWeatherFromCoor = function getWeatherFromCoor(location, cb) {
  axios.get(apiUrl, {
    params: {
      lat: location.lat,
      lon: location.lng,
      appid: weatherKey,
      units: "metric"
    }
  }).then(function (result) {
    cb(null, parseResult(result.data));
  }).catch(function (err) {
    cb(new Error('날씨정보를 찾을 수 없습니다.'));
  });
};

var getKoWeather = function getKoWeather(weather) {
  weather = weather[0];
  if (!weather) {
    return '???';
  }
  var weatherKo = null;
  if (weather.main === 'Thunderstorm') {
    weatherKo = '천둥번개';
  } else if (weather.main === 'Drizzle') {
    weatherKo = '이슬비';
  } else if (weather.main === 'Rain') {
    weatherKo = '비';
  } else if (weather.main === 'Snow') {
    weatherKo = '흐림';
  } else if (weather.main === 'Clear') {
    weatherKo = '맑음';
  } else if (weather.main === 'Clouds') {
    weatherKo = '구름';
  } else {
    weatherKo = weather;
  }

  weatherKo += '(' + weather.description + ')';

  return weatherKo;
};

var getKoWindDeg = function getKoWindDeg(wind) {
  var ko = '';

  if (wind.deg <= 22.5) {
    ko = '북';
  } else if (wind.deg <= 67.5) {
    ko = '북동';
  } else if (wind.deg <= 112.5) {
    ko = '동';
  } else if (wind.deg <= 157.5) {
    ko = '남동';
  } else if (wind.deg <= 202.5) {
    ko = '남';
  } else if (wind.deg <= 247.5) {
    ko = '남서';
  } else if (wind.deg <= 292.5) {
    ko = '서';
  } else if (wind.deg <= 337.5) {
    ko = '북서';
  } else {
    ko = '북';
  }

  ko += '(' + wind.speed + 'mps)';

  return ko;
};
var parseResult = function parseResult(json) {
  return {
    weather: getKoWeather(json.weather),
    time: new Date(json.dt * 1000),
    visibility: json.visibility + 'm',
    sunrise: new Date(json.sys.sunrise * 1000),
    sunset: new Date(json.sys.sunset * 1000),
    measureLocation: json.name,
    temp: {
      current: json.main.temp,
      min: json.main.temp_min,
      max: json.main.temp_max
    },
    pressure: json.main.pressure,
    wind: getKoWindDeg(json.wind)
  };
};

module.exports = {
  getWeatherFromCoor: getWeatherFromCoor
};