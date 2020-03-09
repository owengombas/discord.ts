import {
  Discord,
  On,
  Client // Use the Client that are provided by @typeit/discord
} from "../../src";
// You must import the types from @types/discord.js
import {
  Message, MessageEmbed
} from "discord.js";

// Decorate the class with the @Discord decorator
@Discord
export class AppDiscord {
  private static _client: Client;
  private _prefix: string = "!";
  private _sayHelloMessage: string = "hello !";
  private _restrictionMessage: string = "You can make seperate functions for each command thanks to restrictions!";
  private _hashtagMessage: string = "Restrictions work!";

  static start() {
    this._client = new Client();
    // In the login method, you must specify the glob string to load your classes (for the framework).
    // In this case that's not necessary because the entry point of your application is this file.
    this._client.login(
      "YOUR_TOKEN",
      `${__dirname}/*Discord.ts` // glob string to load the classes
    );
  }

  // When the "message" event is triggered, this method is called with a specific payload (related to the event)
  @On("message")
  async onMessage(message: Message, client: Client) {
    // Your logic...
    if (AppDiscord._client.user.id !== message.author.id) {
      if (message.content[0] === this._prefix) {
        const cmd = message.content.replace(this._prefix, "").toLowerCase();
        if (cmd === "hello") {
          message.reply(this._sayHelloMessage);
        }
      }
    }
  }

  // When the "message" event is triggered, and it passes your restriction, this method gets called.
  @On("message", [String.prototype.startsWith, "!restriction"])
  async onRestrictionCommand(message: Message, client: Client) {
    message.reply(this._restrictionMessage);
  }

  @On("message", [String.prototype.endsWith, "#works"])
  async onWorksHashtag(message: Message, client: Client) {
    message.channel.send(this._hashtagMessage);
  }
}

// Start your app
AppDiscord.start();
