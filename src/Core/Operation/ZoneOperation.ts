import {Operation} from "./Operation";
import {core} from "../Core";
import {Role} from "../Role/Role";
import {Zone} from "../Zone/Zone";

export abstract class ZoneOperation extends Operation {

    public readonly locator: Locator;

    public pos: RoomPosition;
    public roomName: string;
    public zone: Zone;

    constructor(name: string, locator: Locator, zone: Zone) {
        super(name);
        this.locator = locator;
        this.pos = locator.pos;
        this.roomName = this.locator.pos.roomName;
        this.zone = zone;
    }
}
