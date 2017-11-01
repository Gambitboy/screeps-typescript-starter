import {Mission} from "../Mission";
import {Operation} from "../../Operation/Operation";
import {core} from "../../Core";
import {PriorityType} from "../../../PriorityType";
import {ZoneSource} from "../../Entity/ZoneSource";
import {Miner} from "../../Bot/Miner";
import {MinerCart} from "../../Bot/MinerCart";
import {TransportAnalysis} from "Helpers/TransportAnalysis";
import {Traveler} from "../../Traveler/Traveler";
import {ZoneOperation} from "../../Operation/ZoneOperation";

export class MiningMission extends Mission {

    public nextSync: number;
    public syncInterval = 500;
    public analysis: TransportAnalysis;

    public readonly priority = PriorityType.Harvest;
    public readonly source: ZoneSource;
    public readonly order: number;
    public readonly miners: Miner[] = [];
    public readonly carts: MinerCart[] = [];

    public memory: {
        nextSync: number;
    };

    constructor(operation: ZoneOperation, source: ZoneSource, order: number) {
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
        this.addBot(miner);
        this.miners.push(miner);
    }

    private initCarts() {
        let cart = new MinerCart(this, 0);
        this.addBot(cart);
        this.carts.push(cart);
    }

    public sync() {
        let distance = Traveler.findTravelPath(Game.spawns.Spawn1, this.source).path.length;
        this.analysis = TransportAnalysis.run(distance, 10, 300, true);
        this.syncMiners();
        this.syncCarts();
    }

    private syncMiners() {

    }

    private syncCarts() {

    }

    protected findEnergyPerTick() {
        let capacity: number = SOURCE_ENERGY_NEUTRAL_CAPACITY;
        if (this.zone.controller.entity.my || this.zone.controller.entity.reservation) {
            capacity = SOURCE_ENERGY_CAPACITY;
        }
        return Math.ceil(capacity / 300);
    }
}
