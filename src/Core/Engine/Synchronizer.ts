import {PriorityType} from "../../PriorityType";

export class Synchronizer {
    private items: {[processType: number]: ISync[] } = {
        [PriorityType.PreOperations]: [],
        [PriorityType.Emergency]: [],
        [PriorityType.Controller]: [],
        [PriorityType.Defense]: [],
        [PriorityType.Raid]: [],
        [PriorityType.Harvest]: [],
        [PriorityType.Secondary]: [],
        [PriorityType.PostOperations]: [],
    };

    public addItem(item: ISync) {
        this.items[item.priority].push(item);
        if (!item.memory.nextSync) { item.memory.nextSync = Game.time; }
    }

    public update() {
        for (let priority in this.items) {
            let items = this.items[priority];
            for (let item of items) {
                this.syncItem(item);
            }
        }
    }

    private syncItem(item: ISync) {
        if (Game.time >= item.memory.nextSync) {
            item.memory.nextSync = Game.time + item.syncInterval;
        }
        if (item.nextSync !== item.memory.nextSync) {
            item.nextSync = item.memory.nextSync;
            item.sync();
            return;
        }
    }
}
