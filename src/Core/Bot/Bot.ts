import {Operation} from "../Operation/Operation";
import {core} from "../Core";
import {PriorityType} from "../../PriorityType";
import {Traveler} from "../Traveler/Traveler";
import {SourceEntity} from "../Entity/SourceEntity";

export abstract class Bot implements IResourceHolder {

    public creep: Creep;
    public memory: BotMemory;
    public pos: RoomPosition;
    public body: string[];
    public boost: string[];
    public room: Room;

    public abstract priority: PriorityType;
    public abstract defaultState: string;

    public readonly operation: Operation;
    public readonly roleName: string;
    public readonly id: string;

    public get holder(): Creep { return this.creep; }
    public get spaceRemaining(): number { return this.creep.carryCapacity - _.sum(this.creep.carry); }
    public get currentAmount(): number { return _.sum(this.creep.carry); }
    public get resources(): StoreDefinition { return this.creep.carry; }
    public get capacity(): number { return this.creep.carryCapacity; }

    constructor(operation: Operation, roleName: string, idSnippet: string) {
        this.operation = operation;
        this.roleName = roleName;
        this.id = `${operation.name}_${roleName}_${idSnippet}`;
    }

    public init() {
        core.linker.addLink(`${this.roleName}_${this.id}`, this, this.operation);
        core.updater.addItem(this);
    }

    public adjust(body: string[], boost?: string[]) {
        this.body = body;
        this.boost = boost;
    }

    public update() {
        if (this.creep) {
            this.processState();
        } else {
            this.spawn();
        }
    }

    public destroy() {
        core.updater.removeItem(this);
    }

    private prep() {
        if (this.creep.spawning) { return; }
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

    protected harvestSource(source: SourceEntity) {
        this.creep.harvest(source.object);
    }

    protected travelTo(destination: IPosition, options?: TravelToOptions) {
        Traveler.travelTo(this.creep, destination, options);
    }

    protected withdraw(target: IResourceHolder, resourceType: string): number {
        let holder = target.holder;
        if (holder instanceof Creep) {
            return holder.transfer(this.creep, resourceType);
        } else {
            return this.creep.withdraw(holder, resourceType);
        }
    }

    protected transfer(target: IResourceHolder, resourceType: string): number {
        return this.creep.transfer(target.holder, resourceType);
    }

    private spawn() {
        if (this.body) {
            this.memory.state = "prep";
            core.spawner.spawn(this);
        }
    }
}
