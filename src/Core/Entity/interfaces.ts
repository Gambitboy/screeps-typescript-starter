interface IEntityObject {
    pos: RoomPosition;
    id: string;
}

interface IStoreEntity extends Structure {
    store: StoreDefinition
    storeCapacity: number;
}

interface IEnergyEntity extends Structure {
    energy: number;
    energyCapacity: number;
}

interface IResourceHolder {
    pos: RoomPosition;
    holder: Creep|Structure;
    spaceRemaining: number;
    currentAmount: number;
    resources: StoreDefinition;
    capacity: number;
}
