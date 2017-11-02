import {Bot} from "./Bot";
import {PriorityType} from "../../PriorityType";
import {MiningMission} from "../Mission/MiningMission";
import {BOT_MINER} from "./constants";

export class Miner extends Bot {

    public readonly priority = PriorityType.Harvest;
    public readonly defaultState = "travel";
    public readonly mission: MiningMission;

    constructor(mission: MiningMission, order: number) {
        super(mission.operation, BOT_MINER, `${mission.order}${order}`);
        this.mission = mission;
    }

    protected travel() {
        if (this.creep.pos.isNearTo(this.mission.source)) {
            this.switchState("harvest");
        } else {
            this.travelTo(this.mission.source);
        }
    }

    protected harvest() {
        this.harvestSource(this.mission.source);
    }
}
