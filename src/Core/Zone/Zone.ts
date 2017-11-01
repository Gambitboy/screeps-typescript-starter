import {ZoneSource} from "./ZoneSource";
import {PriorityType} from "../../PriorityType";
import {core} from "../Core";

export class Zone {

    public readonly priority = PriorityType.PreOperations;
    public readonly sources: ZoneSource[] = [];
    public readonly roomName: string;

    private static zones: {[roomName: string]: Zone } = {};

    constructor(roomName: string) {
        this.roomName = roomName;
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
            this.sources.push(new ZoneSource(source));
        }
    }

    public update() {
        for (let source of this.sources) {
            source.update();
        }
    }
}
