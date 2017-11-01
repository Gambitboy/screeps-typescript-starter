import {Cart} from "./Cart";
import {MiningOperation} from "../Operation/MiningOperation/MiningOperation";
import {PriorityType} from "../../PriorityType";
import {ZoneSource} from "../Entity/ZoneSource";
import {MiningMission} from "../Mission/MiningMission/MiningMission";

export class MinerCart extends Cart {

    public readonly operation: MiningOperation;
    public readonly priority = PriorityType.Harvest;
    public readonly source: ZoneSource;
    public readonly mission: MiningMission;

    constructor(mission: MiningMission, id: number) {
        super(mission.operation, "minerCart", `${mission.order}${id}`);
        this.mission = mission;
        this.source = mission.source;
    }

    protected getOrigin(): Creep | Structure {
        let miner = _.find(this.mission.miners, b => b.creep);
        if (miner) {
            return miner.creep;
        }
    }

    protected getDestination(): Creep | Structure {
        return Game.spawns.Spawn1;
    }
}
