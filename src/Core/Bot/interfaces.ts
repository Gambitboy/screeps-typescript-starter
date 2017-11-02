interface BotMemory {
    state: string;
}

interface IBot {
    creep: Creep;
    memory: BotMemory;
    pos: RoomPosition;
    roleName: string;
    id: string;
    operation: IOperation;
}
