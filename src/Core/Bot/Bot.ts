import {Operation} from "../Operation/Operation";
import {core} from "../Core";
import {PriorityType} from "../../PriorityType";
import {ZoneSource} from "../Entity/ZoneSource";
import {Traveler} from "../Traveler/Traveler";
import {Zone} from "../Zone/Zone";

export abstract class Bot {

    public creep: Creep;
    public memory: BotMemory;
    public zone: Zone;
    public pos: RoomPosition;
    public body: string[];
    public boost: string[];

    public abstract priority: PriorityType;
    public abstract defaultState: string;

    public readonly operation: Operation;
    public readonly roleName: string;
    public readonly id: string;

    public get load(): number { return _.sum(this.creep.carry); }


    constructor(operation: Operation, roleName: string, id: string) {
        this.operation = operation;
        this.roleName = roleName;
        this.id = `${operation.name}_${roleName}_${id}`;
    }

    public init() {
        core.linker.addLink(`${this.roleName}_${this.id}`, this, this.operation);
        core.census.add(this);
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
            this.memory.state = "prep";
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

    protected harvestSource(source: ZoneSource) {
        this.creep.harvest(source.entity);
    }

    protected travelTo(destination: IPosition, options?: TravelToOptions) {
        Traveler.travelTo(this.creep, destination, options);
    }

    protected withdraw(target: Creep|Structure, resourceType: string): number {
        if (target instanceof Creep) {
            return target.transfer(this.creep, resourceType);
        } else {
            return this.creep.withdraw(target, resourceType);
        }
    }

    protected transfer(target: Creep|Structure, resourceType: string): number {
        return this.creep.transfer(target, resourceType);
    }

    private spawn() {
        if (this.body) {
            core.spawner.spawn(this);
        }
    }
}
