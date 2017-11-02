import {Entity} from "./Entity";

export abstract class StoreStructure<T extends IStoreEntity> extends Entity<T> implements IResourceHolder {

    public get holder(): Structure { return this.object; }
    public get spaceRemaining(): number { return this.capacity - _.sum(this.object.store); }
    public get currentAmount(): number { return _.sum(this.object.store); }
    public get resources(): StoreDefinition {
        return this.object.store;
    }

    public readonly capacity: number;

    constructor(entity: T) {
        super(entity);
        this.capacity = entity.storeCapacity;
    }
}
