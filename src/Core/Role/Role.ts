import {Operation} from "../Operation/Operation";
import {core} from "../Core";
import {PriorityType} from "../../PriorityType";
import {ZoneSource} from "../Zone/ZoneSource";

export abstract class Role {

    public creep: Creep;
    public memory: AgentMemory;

    public abstract priority: PriorityType;
    public abstract roleName: string;
    public abstract defaultState: string;

    public readonly operation: Operation;
    public readonly id: string;
    public get name() { return `${this.operation.name}_${this.roleName}_${this.id}`}

    constructor(operation: Operation, id: string) {
        this.operation = operation;
        this.id = id;
    }

    public init() {
        core.linker.addLink(`${this.roleName}_${this.id}`, this, this.operation);
        core.updater.addItem(this);
    }

    public update() {
        this.creep = Game.creeps[this.memory.creepName];
        if (this.creep) {
            if (this.memory.prep) {
                this.prep();
            } else {
                this.processState()
            }
        } else {
            this.memory.prep = true;
            this.memory.creepName = core.spawner.spawn(this);
        }
    }

    public abstract getBody(): string[];
    protected abstract getBoost(): string[];

    private prep() {
        if (this.creep.spawning) { return; }
        delete this.memory.prep;
        this.switchState(this.defaultState);
    }

    protected switchState(state: string) {
        this.memory.state = state;
        this.creep.say(state, true);
        this.processState();
    }

    private processState() {
        this[this.memory.state]();
    }

    protected harvestSource(source: ZoneSource) {
        this.creep.harvest(source.source);
    }
}
