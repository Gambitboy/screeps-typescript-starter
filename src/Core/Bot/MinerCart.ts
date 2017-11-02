import {Cart} from "./Cart";
import {MiningOperation} from "../Operation/MiningOperation";
import {PriorityType} from "../../PriorityType";
import {MiningMission} from "../Mission/MiningMission";
import {SourceEntity} from "../Entity/SourceEntity";
import {BOT_MINERCART} from "./constants";

export class MinerCart extends Cart {

    public readonly operation: MiningOperation;
    public readonly priority = PriorityType.Harvest;
    public readonly source: SourceEntity;
    public readonly mission: MiningMission;

    constructor(mission: MiningMission, id: number) {
        super(mission.operation, BOT_MINERCART, `${mission.order}${id}`);
        this.mission = mission;
        this.source = mission.source;
    }

    protected getPickUp(): IResourceHolder {
        let miner = _.find(this.mission.miners, b => b.creep);
        if (miner) {
            return miner;
        }
    }

    protected getDropOff(): IResourceHolder {
        return this.mission.destination;
    }
}
