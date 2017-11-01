import {Zone} from "../Zone/Zone";

export abstract class Entity<T extends IEntity> {

    public entity: T;

    public readonly id: string;
    public readonly zone: Zone;
    public readonly pos: RoomPosition;

    constructor(entity: T, zone: Zone) {
        this.entity = entity;
        this.id = entity.id;
        this.pos = entity.pos;
        this.zone = zone;
    }

    public update() {
        this.entity = Game.getObjectById<T>(this.id);
    }
}
