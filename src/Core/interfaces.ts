interface Locator {
    pos: RoomPosition;
    move(pos: Pos)
}

type Pos = RoomPosition|{pos: RoomPosition};

interface IData {
    operations: {[operationName: string]: OperationMemory }
}

interface OperationMemory {
}

interface MissionMemory {
}


