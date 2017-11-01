interface ISync {
    priority: number;
    nextSync: number;
    syncInterval: number;
    memory: {
        nextSync: number;
    }
    sync(): void;
}

interface IUpdate {
    priority: number;
    update(): void;
}

interface IRoutine {
    priority: number;
    memory: {
        nextRun: number;
    }
    routine(): void;
}

interface ILinkMemory {
    memory: {
        [propertyName: string]: any;
    }
}
