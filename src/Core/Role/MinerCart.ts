import {Cart} from "./Cart";
import {MiningOperation} from "../Operation/MiningOperation/MiningOperation";
import {PriorityType} from "../../PriorityType";
import {ZoneSource} from "../Zone/ZoneSource";

export class MinerCart extends Cart {

    public roleName = "minerCart";
    public operation: MiningOperation;
    public priority = PriorityType.Harvest;
    public source: ZoneSource;

    constructor(operation: MiningOperation, id: string, source: ZoneSource) {
        super(operation, id);
        this.source = source;
    }

    protected getOrigin(): Creep | Structure {
        let miner = _.find(this.operation.miners, r => r.source === this.source);
        return miner.creep;
    }

    protected getDestination(): Creep | Structure {
        return Game.spawns.Spawn1;
    }
}
