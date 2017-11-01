import {MiningOperation} from "./MiningOperation/MiningOperation";
import {core} from "../Core";
import {ZoneOperation} from "./ZoneOperation";
import {Zone} from "../Zone/Zone";

export class OperationFactory implements ILinkMemory {

    public operations: {[operationName: string]: ZoneOperation } = {};

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
    }

    private scanFlags() {
        for (let flagName in Game.flags) {
            if (this.scanned[flagName]) { continue; }
            this.scanned[flagName] = true;

            let type = OperationFactory.getType(flagName);
            let constructor = this.constructors[type];
            if (!constructor) { continue; }
            let locator = Game.flags[flagName];
            let zone = Zone.get(locator.pos.roomName);
            let operation = new constructor(flagName, locator, zone);
            core.linker.addLink(flagName, operation, this);
            this.operations[flagName] = operation;
            operation.init();
        }
    }

    private static getType(flagName: string): string {
        return flagName.substring(0, flagName.indexOf("_"));
    }
}
