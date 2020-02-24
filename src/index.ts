import * as Discord from 'discord.js';
import * as randomInt from 'random-int';
import * as times from 'lodash.times';

const info = require('../package.json');

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
      FART_CHARS.forEach(char => {
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
   * Poop out stats
   */
  stats(message: Discord.Message) {
    if (
      message.author.id === process.env.AUTHOR_ID &&
      message.content === 'buttstats'
    ) {
      const allGuilds = this.client.guilds.filter(guild => guild.available);

      message.reply(
        `:peach: **butt v${info.version}**\nMember of ${
          allGuilds.size
        } servers\nFarting at ${allGuilds
          .map(guild => guild.memberCount)
          .reduce((total, value) => value + total, 0)} members\n\n`,
      );

      const getServerInfo = (
        guilds: Discord.Collection<string, Discord.Guild>,
      ) => {
        let text = '';
        for (let i = 0; i < 5; i += 1) {
          text += this.guildToString(guilds.array()[i]);
        }
        return text;
      };

      message.reply(
        `\n:trophy: **Top Servers**\n${getServerInfo(
          allGuilds.sort((a, b) => b.memberCount - a.memberCount),
        )}`,
      );

      message.reply(
        `\n:baby: **Recent Servers**\n${getServerInfo(
          allGuilds.sort((a, b) => b.joinedTimestamp - a.joinedTimestamp),
        )}`,
      );
    }
  }

  /**
   * Convert a guild into a readable format
   */
  guildToString(guild: Discord.Guild) {
    let text = '';
    text += `__${guild.name}__ (${guild.memberCount} members)\n`;
    text += `Based in ${guild.region}\n`;
    text += `Member since ${guild.joinedAt.getDate()}/${guild.joinedAt.getMonth() +
      1}/${guild.joinedAt.getFullYear()}\n`;
    return text;
  }

  /**
   * Be a butt to people
   */
  poop() {
    this.client.login(process.env.TOKEN);
    this.client.on('ready', () => {
      console.log("it's butt time");
    });

    this.client.on('message', message => {
      if (!message.author.bot) {
        this.didReply = false;
        this.stats(message);
        this.help(message);
        this.samwell(message);
        this.cloudToButt(message);
        this.fart(message);
        this.react(message);
      }
    });

    // Log invites
    this.client.on('guildCreate', guild => {
      this.client.fetchUser(process.env.AUTHOR_ID).then(author => {
        author.sendMessage(
          `:peach: **Added To Server!**\nIt's about to get smelly\n${this.guildToString(
            guild,
          )}`,
        );
      });
    });

    // Log removals/bans
    this.client.on('guildDelete', guild => {
      this.client.fetchUser(process.env.AUTHOR_ID).then(author => {
        author.sendMessage(
          `:cry: **Removed From Server**\nI've been relieved of gas... permanently\n${this.guildToString(
            guild,
          )}`,
        );
      });
    });
  }
}

new Butt().poop();
