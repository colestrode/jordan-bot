const request = require('request')

require('skellington')({
  slackToken: process.env.SLACK_TOKEN,
  plugins: [{
    init: jordanize
  }]
})

function jordanize(controller) {
  controller.hears('rick', ['ambient', 'direct_message'], (bot, message) => {
    request({
      uri: 'http://rickandmortyquotes.eu-central-1.elasticbeanstalk.com',
      method: 'GET',
      json: true
    }, (err, res, body) => {
      if (res.statusCode === 200) {
        bot.reply(message, body.what)
      }
    })
  })
}