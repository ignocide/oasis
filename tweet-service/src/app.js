// process.env.NTBA_FIX_319 = 1
//
const TelegramBot = require('node-telegram-bot-api')
// const cron = require('node-cron')
// const axios = require('axios')
// const geocoding = require('./geocoding')
// const weather = require('./weather')
// // replace the value below with the Telegram token you receive from @BotFather
// const token = CONFIG.telegram.token
//
// // Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot('611817289:AAFrASHOylcHk8NkK2rderfIDAKKGk0z3Bo', {polling: true})
//
// // Matches "/echo [whatever]"
//
// bot.onText(/\/ping/, (msg, match) => {
//   const chatId = msg.chat.id
//
//   bot.sendMessage(chatId, 'pong')
// })
//
// bot.onText(/\/냥/, (msg, match) => {
//   const chatId = msg.chat.id
//
//   let query = +new Date()
//
//   let url = null
//   // if (query % 3 === 0) {
//     url = `http://thecatapi.com/api/images/get?format=src&type=gif&seed=${query}`
//   // } else {
//     // url = `https://source.unsplash.com/collection/139386?seed=${query}`
//   // }
//   bot.sendMessage(chatId, `[냥](${url})`, {
//     parse_mode: 'Markdown'
//   })
// })
//
// bot.onText(/\/멍/, (msg, match) => {
//   const chatId = msg.chat.id
//
//   let query = +new Date()
//   if (query % 2 === 0) {
//     bot.sendMessage(chatId, `[멍](https://source.unsplash.com/collection/1301659?seed=${query})`, {
//       parse_mode: 'Markdown'
//     })
//   } else {
//     axios.get('https://random.dog/woof.json').then(function (res) {
//       bot.sendMessage(chatId, `[멍](${res.data.url})`, {
//         parse_mode: 'Markdown'
//       })
//     })
//   }
// })
//
// bot.onText(/\/배고파/, (msg, match) => {
//   const chatId = msg.chat.id
//
//   let query = +new Date()
//
//   bot.sendMessage(chatId, `[냠](https://source.unsplash.com/collection/345760?seed=${query})`, {
//     parse_mode: 'Markdown'
//   })
// })
//
// bot.onText(/\/좌표/, (msg, match) => {
//   const chatId = msg.chat.id
//   // geocoding.getLocationFromName()
//   try{
//     const locationName = parsingCmd(msg.text)[0]
//     if(!locationName){
//       throw new Error('잘못된 지역명입니다.')
//     }
//     geocoding.getLocationFromName(locationName,function(err,result){
//       if(err){
//         throw err
//       }
//       const address = result.address
//       const location = result.location
//       bot.sendMessage(chatId,`
//         주소 : ${address}\n좌표 : lat ${location.lat}, lng ${location.lng}
//         `)
//     })
//   }
//   catch(e){
//     bot.sendMessage(chatId,e.message)
//   }
// })
//
// bot.onText(/\/날씨/, (msg, match) => {
//   const chatId = msg.chat.id
//   // geocoding.getLocationFromName()
//   try{
//     const locationName = parsingCmd(msg.text)[0]
//     if(!locationName){
//       throw new Error('잘못된 지역명입니다.')
//     }
//     geocoding.getLocationFromName(locationName,function(err,result){
//       if(err){
//         throw err
//       }
//       const address = result.address
//       const location = result.location
//
//       weather.getWeatherFromCoor(location,function(err,result){
//         if(err){
//           throw err
//         }
//         const message = [
//           `위치 : ${address}`,
//           `날씨 : ${result.weather}`,
//           `가시거리 : ${result.visibility}`,
//           `일출 : ${result.sunrise}`,
//           `위몰 : ${result.sunset}`,
//           `온도 : ${result.temp.current}`,
//           `최저 온도 : ${result.temp.min}`,
//           `최고 온도 : ${result.temp.max}`,
//           `압력 : ${result.pressure}`,
//           `바람 : ${result.wind}`,
//           `측정시간 : ${result.time}`,
//           `측정위치 : ${result.measureLocation}`
//         ]
//         bot.sendMessage(chatId,message.join('\n'))
//       })
//     })
//   }
//   catch(e){
//     bot.sendMessage(chatId,e.message)
//   }
// })
//
// const parsingCmd = function(msg){
//   const args = msg.split(' ')
//   args.shift()
//   return args
// }
// //
// // //한국시간 7시 30분
// // cron.schedule('30 17 * * *', () => {
// //   geocoding.getLocationFromName("의정부",function(err,result){
// //     if(err){
// //       throw err
// //     }
// //     const address = result.address
// //     const location = result.location
// //
// //     weather.getWeatherFromCoor(location,function(err,result){
// //       if(err){
// //         throw err
// //       }
// //       const message = [
// //         `위치 : ${address}`,
// //         `날씨 : ${result.weather}`,
// //         `가시거리 : ${result.visibility}`,
// //         `일출 : ${result.sunrise}`,
// //         `위몰 : ${result.sunset}`,
// //         `온도 : ${result.temp.current}`,
// //         `최저 온도 : ${result.temp.min}`,
// //         `최고 온도 : ${result.temp.max}`,
// //         `압력 : ${result.pressure}`,
// //         `바람 : ${result.wind}`,
// //         `측정시간 : ${result.time}`,
// //         `측정위치 : ${result.measureLocation}`
// //       ]
// //       bot.sendMessage(319080091,message.join('\n'))
// //     })
// //   })
// // });
// //
// // //한국시간 7시 30분
// // cron.schedule('30 17 * * *', () => {
// //   geocoding.getLocationFromName("동대문",function(err,result){
// //     if(err){
// //       throw err
// //     }
// //     const address = result.address
// //     const location = result.location
// //
// //     weather.getWeatherFromCoor(location,function(err,result){
// //       if(err){
// //         throw err
// //       }
// //       const message = [
// //         `위치 : ${address}`,
// //         `날씨 : ${result.weather}`,
// //         `가시거리 : ${result.visibility}`,
// //         `일출 : ${result.sunrise}`,
// //         `위몰 : ${result.sunset}`,
// //         `온도 : ${result.temp.current}`,
// //         `최저 온도 : ${result.temp.min}`,
// //         `최고 온도 : ${result.temp.max}`,
// //         `압력 : ${result.pressure}`,
// //         `바람 : ${result.wind}`,
// //         `측정시간 : ${result.time}`,
// //         `측정위치 : ${result.measureLocation}`
// //       ]
// //       bot.sendMessage(-274219778,message.join('\n'))
// //     })
// //   })
// // });
