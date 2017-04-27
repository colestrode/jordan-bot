const request = require('request')

require('skellington')({
  // slackToken: process.env.SLACK_TOKEN,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  port: process.env.PORT,
  botkit: {
    json_file_store: './db/'
  },
  plugins: [{
    init: jordanize,
    scopes: ['bot', 'channels:history', 'groups:history', 'im:history', 'mpim:history'],
    help: {
      command: 'jordan',
      text: `I listen for people talking about Rick and Morty. Just say Rick, and I'll come running`
    }
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