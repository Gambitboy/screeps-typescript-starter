import {Entity} from "./Entity";
import {SourceEntity} from "./SourceEntity";

export class CreepEntity extends Entity<Creep> {

    public harvest(source: SourceEntity) {
        this.entity.harvest(source.entity)
    }

    public moveTo(pos: Pos) {
        this.entity.moveTo(pos);
    }
}
