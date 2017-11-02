import {PriorityType} from "../../PriorityType";
import {MiningMission} from "../Mission/MiningMission";
import {RoomOperation} from "./RoomOperation";
import {SourceEntity} from "../Entity/SourceEntity";
import {OPERATION_MINING} from "./constants";

export class MiningOperation extends RoomOperation {

    public readonly type = OPERATION_MINING;
    public readonly priority = PriorityType.Harvest;
    public readonly miningMissions: MiningMission[] = [];

    public init() {
        let order = 0;
        for (let source of _.sortBy(this.room.find<Source>(FIND_SOURCES), source => source.id)) {
            let entity = SourceEntity.get(source);
            let mission = new MiningMission(this, entity, order);
            this.addMission(mission);
            this.miningMissions.push(mission);
            order++;
        }
    }
}
