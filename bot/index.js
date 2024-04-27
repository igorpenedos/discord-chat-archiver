import dotenv from "dotenv";
dotenv.config();
import { Client, GatewayIntentBits, AttachmentBuilder } from "discord.js";
import fs from "fs";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once("ready", () => {
  console.log("Ready to Archive");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content.toLowerCase() === "!chatarchive") {
    message.channel.send("Archiving...");

    message.channel.messages.fetch().then((messages) => {
      message.channel.send(`Archiving ${messages.size} messages`);

      let history = [];

      messages.forEach((m) => {
        console.log(m);
        const { author, content, createdTimestamp, attachments } = m;
        if (author.id !== "1229268973032312883") {
          history.unshift({
            author: author.username,
            message: content,
            timestamp: createdTimestamp,
            attachments,
          });
        }
      });

      const historyJSON = JSON.stringify(history);

      const file = new AttachmentBuilder(Buffer.from(historyJSON), {
        name: message.channel.name + ".json",
      });

      message.reply({ content: "Archived Chats:", files: [file] });
    });
  }
});

client.login(process.env.KEY);
