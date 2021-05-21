# Client
It manage all the operations between you Discord and event discord.js

## Setup and start your application

In order to start your application, you must use the discord.**ts**'s Client (not the client that is provided by discord.**js**!).  
It works the same as the discord.**js**'s Client (same methods, properties, ...).

- **`classes` (required)**:  
  Indicate the class jacket of your classes containing the `@Discord` decorator. It accepts a list of classes or of (glob) paths

- **`silent` (`false` by default)**:  
  Allows you to disable your event information at startup

- **`guards` (`[]` by default)**:  
  Global guards, it's an array of functions

- **`slashGuilds`**:  
  The slash commands are executed only on this list of guilds by default

- **`requiredByDefault`**:  
  The `@Option` are required by default 

**You must specify the glob path(s) where your decorated classes are**

```typescript
// Use the Client that are provided by @typeit/discord NOT discord.js
import { Client } from "@typeit/discord";

async function start() {
  const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
    ],
    classes: [
      `${__dirname}/*Discord.ts`, // glob string to load the classes
      `${__dirname}/*Discord.js`, // If you compile using "tsc" the file extension change to .js
    ],
    silent: false,
  });

  await client.login("YOUR_TOKEN");
}

start();
```

## Slashes API
It also implements an [API for your @Slash](http://localhost:8080/decorators/slash.html#slash-api)
