# rgrefer

`rgrefer` is a middleware library for the `grammy` bot library, designed to
facilitate the implementation of a referral system in your bot.

## Installation

You can install `rgrefer` via npm:

```bash
npm install rgrefer
```

## Usage

### JavaScript Example

```javascript
const { Bot } = require("grammy");
const refer = require("rgrefer/cjs"); // Or import("rgrefer")

const bot = new Bot("YOUR_BOT_TOKEN");

// Define your bot's options
const options = {
  referrerBonus: 10,
  referreeBonus: 5,
  startupBonus: 20,
  userExists: async (id) => {
    // Your logic to check if a user exists in the database
  },
  addBalance: async (id, amount) => {
    // Your logic to add balance to a user
  },
  onReferral: async (referrer, referree) => {
    // Your logic to handle referral events
  },
  onStartUp: async (ctx) => {
    // Your logic to handle bot startup events
  },
};

// Use the middleware in your bot
bot.use(refer(options));

// The rest of the code goes here
```

### TypeScript Example

```typescript
import { Bot } from "grammy";
import refer from "rgrefer";

const bot = new Bot("YOUR BOT TOKEN");

// Use the middleware in your bot
bot.use(refer({
  referrerBonus: 10,
  referreeBonus: 5,
  startupBonus: 20,
  userExists: async (id?: number) => {
    // Your logic to check if a user exists in the database
  },
  addBalance: async (id?: number, amount?: number) => {
    // Your logic to add balance to a user
  },
  onReferral: async (referrer: number, referree: Context) => {
    // Your logic to handle referral events
  },
  onStartUp: async (ctx: Context) => {
    // Your logic to handle bot startup events
  },
}));
```

## CommonJS Version

If you need to use the CommonJS version of `rgrefer`, you can find it in the
`rgrefer/cjs` directory.

```javascript
const refer = require("rgrefer/cjs");
// Usage remains the same as shown in the JavaScript example above
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.
