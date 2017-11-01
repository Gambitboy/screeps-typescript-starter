import {PriorityType} from "../../PriorityType";

export abstract class Operation implements ILinkMemory {
    public readonly name: string;
    public readonly id: string;

    public abstract type: string;
    public abstract priority: PriorityType;

    public memory: any;

    constructor(name: string, id: string) {
        this.name = name;
        this.id = id;
    }

    public abstract init();
}
