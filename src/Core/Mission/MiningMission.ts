import {Mission} from "./Mission";
import {core} from "../Core";
import {PriorityType} from "../../PriorityType";
import {SourceEntity} from "../Entity/SourceEntity";
import {Miner} from "../Bot/Miner";
import {MinerCart} from "../Bot/MinerCart";
import {TransportAnalysis} from "Helpers/TransportAnalysis";
import {Traveler} from "../Traveler/Traveler";
import {SpawnEntity} from "../Entity/SpawnEntity";
import {BodyGlue} from "../../Helpers/BodyGlue";
import {RoomOperation} from "../Operation/RoomOperation";

export class MiningMission extends Mission implements ISync {

    public nextSync: number;
    public syncInterval = 500;
    public analysis: TransportAnalysis;
    public destination: IResourceHolder;

    public readonly priority = PriorityType.Harvest;
    public readonly source: SourceEntity;
    public readonly order: number;
    public readonly miners: Miner[] = [];
    public readonly carts: MinerCart[] = [];

    public memory: {
        nextSync: number;
    };

    constructor(operation: RoomOperation, source: SourceEntity, order: number) {
        super(operation, `mining${order}`);
        this.source = source;
        this.order = order;
    }

    public init() {
        core.linker.addLink(this.name, this, this.operation);
        core.synchronizer.addItem(this);

        this.initMiners();
        this.initCarts();
    }

    private initMiners() {
        let miner = new Miner(this, 0);
        this.operation.addBot(miner);
        this.miners.push(miner);
    }

    private initCarts() {
        let cart = new MinerCart(this, 0);
        this.operation.addBot(cart);
        this.carts.push(cart);
    }

    public sync() {
        this.destination = SpawnEntity.get(this.operation.room.findStructures<StructureSpawn>(STRUCTURE_SPAWN)[0]);
        let distance = Traveler.findTravelPath(this.destination, this.source).path.length;
        this.analysis = TransportAnalysis.run(distance, 10, 300, true);
        this.syncMiners();
        this.syncCarts();
    }

    private syncMiners() {
        let workCount = this.findWorkCount();
        let moveCount = this.findMoveCount(workCount);
        let minerBody = BodyGlue.workerBody(1, 1, 1);
        this.miners[0].adjust(minerBody);
    }

    private syncCarts() {
        let cartBody = BodyGlue.workerBody(0, this.analysis.carryCount, this.analysis.moveCount);
        this.carts[0].adjust(cartBody);
    }

    protected findEnergyPerTick() {
        let capacity: number = SOURCE_ENERGY_NEUTRAL_CAPACITY;
        if (this.operation.room.controller.my || this.operation.room.controller.reservation) {
            capacity = SOURCE_ENERGY_CAPACITY;
        }
        return Math.ceil(capacity / 300);
    }

    protected findWorkCount() {
        return Math.ceil(this.findEnergyPerTick() / 2) + 1;
    }

    private findMoveCount(workCount: number) {
        return Math.ceil(workCount / 2);
    }
}
