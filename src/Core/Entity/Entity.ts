export class Entity<T extends IEntityObject> {

    public object: T;

    public readonly id: string;
    public readonly pos: RoomPosition;

    constructor(entity: T) {
        this.object = entity;
        this.id = entity.id;
        this.pos = entity.pos;
    }

    protected static cache: {[id: string]: Entity<IEntityObject>} = {};

    /*public static get<T extends IEntityObject>(obj: T): Entity<T> {
        if (this.cache[obj.id]) { return this.cache[obj.id] as any; }
        let entity = new Entity<T>(obj);
        this.cache[obj.id] = entity;
        return entity;
    }*/

    public static refresh() {
        for (let id in this.cache) {
            let entity = this.cache[id];
            entity.object = Game.getObjectById(id);
        }
    }
}
