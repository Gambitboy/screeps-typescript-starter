import {OperationManager} from "./Operation/OperationManager";
import {Synchronizer} from "./Engine/Synchronizer";
import {Updater} from "./Engine/Updater";
import {MemoryLinker} from "./Engine/MemoryLinker";
import {Spawner} from "./Spawner/Spawner";
import {Traveler} from "./Traveler/Traveler";
import {BotCensus} from "./Bot/BotCensus";

class Core {
    public readonly synchronizer = new Synchronizer();
    public readonly updater = new Updater();
    public readonly linker = new MemoryLinker();

    public readonly census = new BotCensus();
    public readonly spawner = new Spawner();
    public readonly traveler = new Traveler();
    public readonly operation = new OperationManager();
    public memory: {[propertyName: string]: any};

    public init() {
        // Memory Management -- should always come first
        if (!Memory.bonzAI) { Memory.bonzAI = {}; }
        this.memory = Memory.bonzAI;

        this.operation.init();
    }

    public update() {
        this.memory = Memory.bonzAI;

        this.linker.update();
        this.operation.update();
        this.spawner.update();
        this.census.update();

        this.synchronizer.update();
        this.updater.update();
    }
}

export const core = new Core();
