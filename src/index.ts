import * as Discord from 'discord.js';
import * as randomInt from 'random-int';
import * as times from 'lodash.times';

require('dotenv').config();

const FART_REGEX = /\b(((bu(tt|m)|arse|poo(p((er)|y)?)?|shite?|booty)(hole|head)?|buttock|fart|crap|parp|rectum|derriere|sphincter|bottom|rear|rump|behind|dung|excre(te|ment))s?|(ass|gas|anus|tush)(es)?|assholes?|anal|glute(s|us maximus))\b/i;
const CLOUD_REGEX = /cloud/i;
const WHATWHAT_REGEX = /(i s(ai|e)d )?(w(ha|a|ah|u)t ?){2}/i;
const HELP_REGEX = /wh(at|o|y)( the (hell|fuck|heck|))?('?s| is)( that)? butt( doing( here)?)?(\?*)/i;
const FART_CHARS = ['P', 'F', 'T', 'H'];
const FART_CHAR_LENGTH = 7;

class Butt {
  client: Discord.Client;
  didReply: boolean;

  constructor() {
    this.client = new Discord.Client();
    this.didReply = false;
  }

  /**
   * Fart at people
   */
  fart(message: Discord.Message) {
    if (message.content.match(FART_REGEX)) {
      let response = '';
      FART_CHARS.forEach((char) => {
        times(randomInt(FART_CHAR_LENGTH) + 1, () => {
          response += char;
        });
      });
      this.reply(message, response);
    }
  }

  /**
   * Correct people
   */
  cloudToButt(message: Discord.Message) {
    if (message.content.match(CLOUD_REGEX)) {
      const response = message.content
        .replace(/the cloud/gi, 'my butt')
        .replace(/Cloud/g, 'Butt')
        .replace(/cloud/gi, 'butt');
      this.reply(message, `I think you mean to say "${response}"`);
    }
  }
  
  /**
   * Quote everyone's favourite song
   */
  samwell(message: Discord.Message) {
    if (message.content.match(WHATWHAT_REGEX)) {
      this.reply(message, 'https://gph.is/15SrabT');
    }
  }

  /**
   * Help people
   */
  help(message: Discord.Message) {
    if (message.content.match(HELP_REGEX)) {
      this.reply(
        message,
        'I just fart at people, what do you expect? https://github.com/niksudan/butt',
      );
    }
  }

  /**
   * Reply to people
   */
  reply(message: Discord.Message, text: string) {
    if (!this.didReply) {
      message.reply(text);
      this.didReply = true;
    }
  }

  /**
   * React to the best emoji
   */
  react(message: Discord.Message) {
    if (message.content.includes(':poop:') || message.content.includes('💩')) {
      message.react('💩');
    }
    if (message.content.includes(':peach:') || message.content.includes('🍑')) {
      message.react('🍑');
    }
  }

  /**
   * Be a butt to people
   */
  poop() {
    this.client.login(process.env.TOKEN);
    this.client.on('ready', () => {
      console.log("it's butt time");
    });
    this.client.on('message', (message) => {
      if (!message.author.bot) {
        this.didReply = false;
        this.help(message);
        this.samwell(message);
        this.cloudToButt(message);
        this.fart(message);
        this.react(message);
      }
    });
  }
}

new Butt().poop();
