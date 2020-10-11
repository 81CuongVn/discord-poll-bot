# 🤖 Discord Poll Bot
> Discord poll bot using discord js and mongo db. 
## ⚓ Requirements
1. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
2. MongoDB cluster **[Guild](https://docs.atlas.mongodb.com/getting-started/)**
3. **[NodeJS](https://nodejs.org/en/)** v12.0.0 or higher

## 🚀  Getting Started
```
git clone https://github.com/iColtz/Poll-Bot
cd Poll-Bot
npm install
```

## ⚙️  Configuration
Rename the file `config-example.json` to `config.json` and fill out the values
⚠️  **Note: Never share your tokens publicly**  ⚠️
```json
{
	"token":  "discord bot token",
	"dburl":  "mongo db connection url",
	"prefix":  "?"
}
```

## 📝Features
Create a poll using the command
`?poll {Title} [Option 1] [Option 2] [Option 3]`

You can create a poll with a expiry date and end the poll once over
`?poll {Title} {Time} [Option 1] [Option 2] [Option 3]`

**Note:** Each poll can have up to 20 options.

**Other Commands**  
`help`  `ping`
