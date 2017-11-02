import {OperationManager} from "./Operation/OperationManager";
import {Synchronizer} from "./Engine/Synchronizer";
import {Updater} from "./Engine/Updater";
import {MemoryLinker} from "./Engine/MemoryLinker";
import {Spawner} from "./Spawner/Spawner";
import {Traveler} from "./Traveler/Traveler";
import {Entity} from "./Entity/Entity";

class Core {
    public readonly synchronizer = new Synchronizer();
    public readonly updater = new Updater();
    public readonly linker = new MemoryLinker();

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

        Entity.refresh();

        this.linker.update();
        this.operation.update();
        this.spawner.update();

        this.synchronizer.update();
        this.updater.update();

        Game.spawns.Spawn1.room
    }
}

export const core = new Core();
