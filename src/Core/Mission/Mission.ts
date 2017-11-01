import {Bot} from "../Bot/Bot";
import {ZoneOperation} from "../Operation/ZoneOperation";
import {Zone} from "../Zone/Zone";

export abstract class Mission {


    public readonly zone: Zone;
    public readonly operation: ZoneOperation;
    public readonly name: string;
    public readonly bots: Bot[] = [];

    constructor(operation: ZoneOperation, name: string) {
        this.operation = operation;
        this.name = name;
        this.zone = operation.zone;
    }

    public abstract init();

    protected addBot(bot: Bot) {
        bot.init();
        this.bots.push(bot);
    }

    public destroy() {
        for (let bot of this.bots) {
            bot.destroy();
        }
    }
}
