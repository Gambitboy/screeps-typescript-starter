import {Mission} from "../Mission";
import {Operation} from "../../Operation/Operation";
import {core} from "../../Core";
import {PriorityType} from "../../../PriorityType";

interface MiningMissionMemory extends MissionMemory {
    containerId: string;
}

export class MiningMission extends Mission {
    public readonly priority = PriorityType.Harvest;

    public agents = {
        miner: [],
    };

    public memory: MiningMissionMemory;
    public source: Source;

    private sourceId: string;

    constructor(operation: Operation, source: Source, order: number) {
        super(operation, `mining${order}`);
        this.sourceId = source.id;
    }

    public init() {
        core.updater.addItem(this);
        // this.addAgent(new Miner(this))
    }

    public update() {
        this.source = Game.getObjectById<Source>(this.sourceId);
    }
}
