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
    this.didReply = false;
  }

  /**
   * Fart at people
   */
  fart(message) {
    if (message.content.match(FART_REGEX)) {
      let response = '';
      FART_CHARS.forEach((char) => {
        _.times(randomInt(FART_CHAR_LENGTH) + 1, () => {
          response += char;
        })
      });
      this.reply(message, response);
    }
  }

  /**
   * Correct people
   */
  cloudToButt(message) {
    if (message.content.match(CLOUD_REGEX)) {
      const response = message.content.replace(/the cloud/gi, "my butt").replace(/Cloud/g, "Butt").replace(/cloud/gi, "butt");
      this.reply(message, `I think you mean to say "${response}"`);
    }
  }

  /**
   * Help people
   */
  help(message) {
    if (message.content.match(HELP_REGEX)) {
      this.reply(message, 'I just fart at people, what do you expect? http://github.com/niksudan/butt');
    }
  }

  /**
   * Reply to people
   * @param {Object} message 
   * @param {String} text 
   */
  reply(message, text) {
    if (!this.didReply) {
      message.reply(text);
      this.didReply = true;
    }
  }

  /**
   * Be a butt to people
   */
  poop() {
    this.client.login(process.env.TOKEN);
    this.client.on('ready', () => {
      console.log('it\'s butt time');
    });
    this.client.on('message', (message) => {
      if (!message.author.bot) {
        this.didReply = false;
        this.help(message);
        this.cloudToButt(message);
        this.fart(message);
      }
    });
  }
}

new Butt().poop();
