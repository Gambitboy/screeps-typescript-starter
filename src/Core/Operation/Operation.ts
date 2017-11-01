import {PriorityType} from "../../PriorityType";

export abstract class Operation implements ILinkMemory {
    public readonly name: string;
    public abstract type: string;
    public abstract priority: PriorityType;

    public memory: OperationMemory;

    constructor(name: string) {
        this.name = name;
    }

    public abstract init();
}
