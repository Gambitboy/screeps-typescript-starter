import {ZoneOperation} from "../ZoneOperation";
import {Miner} from "../../Role/Miner";
import {MinerCart} from "../../Role/MinerCart";
import {core} from "../../Core";
import {PriorityType} from "../../../PriorityType";

interface MiningOperationMemory extends OperationMemory {
    nextSync: number;
    nextRun: number;
}

export class MiningOperation extends ZoneOperation {

    public readonly type = "mining";
    public readonly priority = PriorityType.Harvest;

    public nextSync: number;
    public syncInterval = 100;

    public readonly miners: Miner[] = [];
    public readonly carts: MinerCart[] = [];

    public memory: MiningOperationMemory;

    public init() {
        core.synchronizer.addItem(this);
    }

    public sync() {
        this.syncMiners();
    }

    private syncMiners() {
        let order = 0;
        for (let source of this.zone.sources) {
            let miner = new Miner(this, `${order}`, source);
            miner.init();
            this.miners.push(miner);
            let cart = new MinerCart(this, `${order}`, source);
            cart.init();
            this.carts.push(cart);
            order++;
        }
    }
}
