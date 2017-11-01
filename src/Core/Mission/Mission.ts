import {Operation} from "../Operation/Operation";
import {Role} from "../Role/Role";

export abstract class Mission {

    public readonly operation: Operation;
    public readonly name: string;
    public memory: MissionMemory;

    public agents: {
        [roleName: string]: Role[];
    };

    constructor(operation: Operation, name: string) {
        this.operation = operation;
        this.name = name;
    }

    public abstract init();

    public addAgent(agent: Role) {
        //this.agents[agent.roleName].push(agent);
    }
}
