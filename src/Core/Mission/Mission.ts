import {RoomOperation} from "../Operation/RoomOperation";

export abstract class Mission {

    public readonly operation: RoomOperation;
    public readonly name: string;

    constructor(operation: RoomOperation, name: string) {
        this.operation = operation;
        this.name = name;
    }

    public abstract init();

    public destroy() {
    }
}
