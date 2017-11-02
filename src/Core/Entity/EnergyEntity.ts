import {Entity} from "./Entity";

export abstract class EnergyStructure<T extends IEnergyEntity> extends Entity<T> implements IResourceHolder {

    public get holder(): Structure { return this.object; }
    public get spaceRemaining(): number { return this.capacity - this.object.energy; }
    public get currentAmount(): number { return this.object.energy; }
    public get resources(): StoreDefinition {
        return {[RESOURCE_ENERGY]: this.object.energy };
    }

    public readonly capacity: number;

    constructor(entity: T) {
        super(entity);
        this.capacity = entity.energyCapacity;
    }
}
