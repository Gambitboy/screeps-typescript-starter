import {Operation} from "./Operation";
import {Mission} from "../Mission/Mission";
import {Bot} from "../Bot/Bot";

export abstract class RoomOperation extends Operation implements IRoomOperation {


    public pos: RoomPosition;
    public roomName: string;
    public flag: Flag;
    public room: Room;
    public readonly missions: Mission[] = [];
    public readonly bots: Bot[] = [];

    constructor(name: string, id: string, flag: Flag, room: Room) {
        super(name, id);
        this.flag = flag;
        this.pos = flag.pos;
        this.roomName = flag.pos.roomName;
        this.room = room;
    }

    protected addMission(mission: Mission) {
        mission.init();
        this.missions.push(mission);
    }

    public addBot(bot: Bot) {
        bot.init();
        this.bots.push(bot);
    }

    public destroy() {
        for (let mission of this.missions) {
            mission.destroy();
        }
        for (let bot of this.bots) {
            bot.destroy();
        }
    }
}
