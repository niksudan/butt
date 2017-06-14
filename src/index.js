const Discord = require('discord.js');
const randomInt = require('random-int');
const _ = require('lodash');

require('dotenv').config();

const FART_REGEX = /\b(((bu(tt|m)|arse|poop?|shite?|booty)(hole|head)?|buttock|fart|crap|parp|rectum|derriere|sphincter|bottom|rear|rump|behind|excre(te|ment))s?|(ass|gas|anus|tush)(es)?|assholes?|anal|glute(s|us maximus))\b/i;
const CLOUD_REGEX = /cloud/i;
const HELP_REGEX = /wh(at|o|y)( the (hell|fuck|heck|))?('?s| is)( that)? butt( doing( here)?)?(\?*)/i;
const FART_CHARS = ['P', 'F', 'T', 'H'];
const FART_CHAR_LENGTH = 7;

class Butt {
  constructor(token) {
    this.client = new Discord.Client();
  }

  fart(message) {
    if (message.content.match(FART_REGEX)) {
      let response;
      FART_CHARS.forEach((char) => {
        _.times(randomInt(FART_CHAR_LENGTH) + 1, () => {
          response += char;
        })
      });
      message.reply(response);
    }
  }

  cloudToButt(message) {
    if (message.content.match(CLOUD_REGEX)) {
      const response = message.replace(/the cloud/gi, "my butt").replace(/Cloud/g, "Butt").replace(/cloud/gi, "butt");
      message.reply(`I think you mean to say "${response}"`);
    }
  }

  help(message) {
    if (message.content.match(HELP_REGEX)) {
      message.reply('I just fart at people, what do you expect? http://github.com/niksudan/butt');
    }
  }

  start() {
    this.client.login(process.env.TOKEN);
    this.client.on('ready', () => {
      console.log('it\'s butt time');
    });
    this.client.on('message', (message) => {
      this.fart(message);
      this.cloudToButt(message);
      this.help(message);
    });
  }
}

new Butt().start();
