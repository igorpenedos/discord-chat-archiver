import dotenv from "dotenv";
dotenv.config();
import { Client, GatewayIntentBits, AttachmentBuilder } from "discord.js";
import axios from "axios";

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

    const messages = await message.channel.messages.fetch();
    message.channel.send(`Archiving ${messages.size} messages`);

    let history = [];

    for (const m of messages.values()) {
      let { author, content, createdTimestamp, attachments } = m;

      attachments = await Promise.all(
        attachments.map(async (attachment) => {
          const res = await axios.get(attachment.url, {
            responseType: "arraybuffer",
          });
          console.log(res);
          if (res && res.status == 200) {
            const contentType = res.headers["content-type"];
            const base64 = Buffer.from(res.data, "binary").toString("base64");

            return { ...attachment, contentType, base64 };
          }
        })
      );

      if (author.id !== "1229268973032312883") {
        history.unshift({
          author: author.username,
          message: content,
          timestamp: createdTimestamp,
          attachments,
        });
      }
    }

    const historyJSON = JSON.stringify(history);

    const file = new AttachmentBuilder(Buffer.from(historyJSON), {
      name: message.channel.name + ".json",
    });

    message.reply({ content: "Archived Chats:", files: [file] });
  }
});

client.login(process.env.KEY);
