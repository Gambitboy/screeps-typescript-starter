export class DataManager {
    public parseCost: number;
    public init() {
        this.assign();
        this.defaults();
    }

    public update() {
        this.assign();
    }

    public assign() {
        let cpu = Game.cpu.getUsed();
        if (!Memory.bonzAI) { Memory.bonzAI = {}; }
        this.parseCost = Game.cpu.getUsed() - cpu;
        Data = Memory.bonzAI as any;
    }

    private defaults() {
        _.defaultsDeep(Data, {
        });
    }
}

export let Data: IData;
