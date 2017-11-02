import {MiningOperation} from "./MiningOperation";
import {core} from "../Core";
import {RoomOperation} from "./RoomOperation";

export class OperationFactory implements ILinkMemory {

    public operations: {[operationId: string]: RoomOperation } = {};

    public memory: {
        nextScan: number;
    };

    private constructors: {
        [operationType: string]: { new (name: string, id: string, flag: Flag, room: Room) }
    } = {
        mining: MiningOperation,
    };
    private scanned: {[flagName: string]: boolean} = {};

    public init() {
        core.linker.addLink("operations", this, core);
    }

    public update() {
        this.scanFlags();
        this.refreshOperations();
    }

    private scanFlags() {
        for (let flagName in Game.flags) {
            if (this.scanned[flagName]) { continue; }
            this.scanned[flagName] = true;

            let type = OperationFactory.getType(flagName);
            let constructor = this.constructors[type];
            if (!constructor) { continue; }
            let flag = Game.flags[flagName];
            let name = OperationFactory.getName(flagName);
            let operation = new constructor(name, flagName, flag, flag.room);
            core.linker.addLink(flagName, operation, this);
            this.operations[flagName] = operation;
            operation.init();
        }
    }

    private refreshOperations() {
        for (let id in this.operations) {
            let flag = Game.flags[id];
            let operation = this.operations[id];
            if (flag) {
                operation.flag = flag;
                operation.room = flag.room;
                flag.room.operations.push(operation);               // note: this is where room.operations gets its values
                for (let bot of operation.bots) {
                    bot.creep = Game.creeps[bot.id];                // note: this is how creeps are associated with bots
                    if (bot.creep) {
                        flag.room.bots.push(bot);                   // note: this is where room.bots gets its values
                        bot.room = bot.creep.room;
                        bot.pos = bot.creep.pos;                    // note: this is how bots are associated with their room/pos
                    }
                }
            } else {
                this.scanned[id] = false;
                operation.destroy();
            }
        }
    }

    private static getType(flagName: string): string {
        return flagName.substring(0, flagName.indexOf("_"));
    }

    private static getName(flagName: string): string {
        return flagName.substring(flagName.indexOf("_") + 1);
    }
}
