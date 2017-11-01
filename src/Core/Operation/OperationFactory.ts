import {MiningOperation} from "./MiningOperation/MiningOperation";
import {core} from "../Core";
import {ZoneOperation} from "./ZoneOperation";
import {Zone} from "../Zone/Zone";

export class OperationFactory implements ILinkMemory {

    public operations: {[operationId: string]: ZoneOperation } = {};

    public memory: {
        nextScan: number;
    };

    private constructors: {
        [operationType: string]: any
    } = {
        mining: MiningOperation,
    };
    private scanned: {[flagName: string]: boolean} = {};

    public init() {
        core.linker.addLink("operations", this, core);
    }

    public update() {
        this.scanFlags();
        this.checkFlag();
    }

    private scanFlags() {
        for (let flagName in Game.flags) {
            if (this.scanned[flagName]) { continue; }
            this.scanned[flagName] = true;

            let type = OperationFactory.getType(flagName);
            let constructor = this.constructors[type];
            if (!constructor) { continue; }
            let flag = Game.flags[flagName];
            let zone = Zone.get(flag.pos.roomName);
            let name = OperationFactory.getName(flagName);
            let operation = new constructor(name, flagName, flag, zone);
            core.linker.addLink(flagName, operation, this);
            this.operations[flagName] = operation;
            operation.init();
        }
    }

    private checkFlag() {
        for (let id in this.operations) {
            let flag = Game.flags[id];
            if (flag) { continue; }
            let operation = this.operations[id];
            this.scanned[id] = false;
            operation.destroy();
        }
    }

    private static getType(flagName: string): string {
        return flagName.substring(0, flagName.indexOf("_"));
    }

    private static getName(flagName: string): string {
        return flagName.substring(flagName.indexOf("_") + 1);
    }
}
