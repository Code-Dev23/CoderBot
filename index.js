const { 
    Client, 
    GatewayIntentBits, 
    Partials
} = require('discord.js');
const client = new Client({
    intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
    partials: [
        [Partials.Message, Partials.Channel, Partials.Reaction]
    ]
})

const fs = require('node:fs');
const path = require('node:path');

const { token } = require('./config/config.json');

const functions = fs.readdirSync("./functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(token).then(() => {
        console.log("Bot Online")
    })
})();