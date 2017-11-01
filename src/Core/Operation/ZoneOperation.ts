import {Operation} from "./Operation";
import {core} from "../Core";
import {Bot} from "../Bot/Bot";
import {Zone} from "../Zone/Zone";
import {Mission} from "../Mission/Mission";

export abstract class ZoneOperation extends Operation {

    public readonly flag: Flag;

    public pos: RoomPosition;
    public roomName: string;
    public zone: Zone;
    public missions: Mission[] = [];

    constructor(name: string, id: string, flag: Flag, zone: Zone) {
        super(name, id);
        this.flag = flag;
        this.pos = flag.pos;
        this.roomName = flag.pos.roomName;
        this.zone = zone;
    }

    public addMission(mission: Mission) {
        mission.init();
        this.missions.push(mission);
    }

    public destroy() {
        for (let mission of this.missions) {
            mission.destroy();
        }
    }
}
