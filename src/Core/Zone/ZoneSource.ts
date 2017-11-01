export class ZoneSource {

    public source: Source;

    public readonly id: string;
    public readonly pos: RoomPosition;

    constructor(source: Source) {
        this.id = source.id;
        this.source = source;
        this.pos = source.pos;
    }

    public update() {
        this.source = Game.getObjectById(this.id);
    }
}
