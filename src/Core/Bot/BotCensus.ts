import {Bot} from "./Bot";
import {Zone} from "../Zone/Zone";

export class BotCensus {

    private bots: {[botName: string]: Bot} = {};

    public add(bot: Bot) {
        this.bots[bot.id] = bot;
    }

    public update() {
        for (let botName in this.bots) {
            let creep = Game.creeps[botName];
            let bot = this.bots[botName];
            if (creep) {
                bot.creep = creep;
                bot.pos = creep.pos;
                let zone = Zone.get(bot.pos.roomName);
                if (zone !== bot.zone) {
                    if (bot.zone) { bot.zone.deregister(bot); }
                    bot.zone = zone;
                    bot.zone.register(bot)
                }
            } else {
                if (bot.creep) {
                    if (bot.zone) { bot.zone.deregister(bot); }
                    bot.creep = undefined;
                }
            }
        }
    }
}
