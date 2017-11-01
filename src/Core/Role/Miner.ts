import {Role} from "./Role";
import {MiningOperation} from "../Operation/MiningOperation/MiningOperation";
import {PriorityType} from "../../PriorityType";
import {ZoneSource} from "../Zone/ZoneSource";

export class Miner extends Role {

    public roleName = "miner";
    public readonly operation: MiningOperation;
    public readonly priority = PriorityType.Harvest;
    public readonly defaultState = "travel";
    public source: ZoneSource;

    constructor(operation: MiningOperation, id: string, source: ZoneSource) {
        super(operation, id);
        this.source = source;
    }

    public getBody() { return [WORK, CARRY, MOVE] };

    protected getBoost(): string[] { return undefined; }

    protected travel() {
        if (this.creep.pos.isNearTo(this.source)) {
            this.switchState("harvest");
        } else {
            this.creep.moveTo(this.source);
        }
    }

    protected harvest() {
        this.harvestSource(this.source);
    }
}
