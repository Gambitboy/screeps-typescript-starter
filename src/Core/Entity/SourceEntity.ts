import {Entity} from "./Entity";

export class SourceEntity extends Entity<Source> {

    public static get(source: Source): SourceEntity {
        if (this.cache[source.id]) { return this.cache[source.id] as SourceEntity; }
        let entity = new SourceEntity((source));
        Entity.cache[source.id] = entity;
        return entity;
    }
}
