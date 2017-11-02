interface Room {
    findStructures<T extends Structure>(structureType: string): T[];
    findBots<T extends IBot>(roleName: string): T[];
    findOperations<T extends IOperation>(operationType: string): T[];
    structures: Structure[];
    bots: IBot[];
    operations: IRoomOperation[];
}
