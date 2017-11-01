import {ZoneSource} from "../Entity/ZoneSource";
import {PriorityType} from "../../PriorityType";
import {core} from "../Core";
import {Bot} from "../Bot/Bot";
import {ZoneController} from "../Entity/ZoneController";

export class Zone {

    public controller: ZoneController;

    public readonly priority = PriorityType.PreOperations;
    public readonly sources: ZoneSource[] = [];
    public readonly roomName: string;
    public readonly id: string;
    public readonly bots: {
        [roleName: string]: {
            [botName: string]: Bot;
        };
    } = {};

    private static zones: {[roomName: string]: Zone } = {};

    constructor(roomName: string) {
        this.roomName = roomName;
        this.id = `zone_${roomName}`;
    }

    public static get(roomName: string) {
        if (!this.zones[roomName]) {
            let zone = new Zone(roomName);
            zone.init();
            this.zones[roomName] = zone;
        }
        return this.zones[roomName];
    }

    private init() {
        core.updater.addItem(this);
        let room = Game.rooms[this.roomName];
        for (let source of _.sortBy(room.find<Source>(FIND_SOURCES), x => x.id)) {
            this.sources.push(new ZoneSource(source, this));
        }
        if (room.controller) {
            this.controller = new ZoneController(room.controller, this);
        }
    }

    public update() {
        this.controller.update();

        for (let source of this.sources) {
            source.update();
        }
    }

    public register(bot: Bot) {
        if (!this.bots[bot.roleName]) { this.bots[bot.roleName] = {}; }
        this.bots[bot.roleName][bot.id] = bot;
    }

    public deregister(bot: Bot) {
        delete this.bots[bot.roleName][bot.id];
    }

    public findBots(roleName: string): Bot[] {
        let bots: Bot[] = [];
        if (this.bots[roleName]) {
            for (let botName in this.bots[roleName]) {
                bots.push(this.bots[roleName][botName]);
            }
        }
        return bots;
    }
}
