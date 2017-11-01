import {ZoneOperation} from "../ZoneOperation";
import {PriorityType} from "../../../PriorityType";
import {MiningMission} from "../../Mission/MiningMission/MiningMission";

export class MiningOperation extends ZoneOperation {

    public readonly type = "mining";
    public readonly priority = PriorityType.Harvest;
    public readonly miningMissions: MiningMission[] = [];

    public init() {
        let order = 0;
        for (let source of this.zone.sources) {
            let mission = new MiningMission(this, source, order);
            this.addMission(mission);
            this.miningMissions.push(mission);
        }
    }
}
