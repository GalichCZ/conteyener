const dotenv = require("dotenv");
const { Telegraf } = require("telegraf");
dotenv.config();

const bot = new Telegraf(process.env.BOT_KEY);

class BotService {
  async SendBotMessage(message) {
    try {
      await bot.telegram.sendMessage("892514772", message);
    } catch (error) {
      console.log("ERROR", error);
    }
  }
}

bot.launch();

module.exports = new BotService();
