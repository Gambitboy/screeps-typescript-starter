
export abstract class Entity<T extends IEntity> {

    protected _entity: T;
    public get entity() {
        if (!this._entity) {
            this._entity = Game.getObjectById(this.id);
        }
        return this._entity;
    }

    private id: string;
    constructor(id: string) {
        this.id = id;
    }
}
