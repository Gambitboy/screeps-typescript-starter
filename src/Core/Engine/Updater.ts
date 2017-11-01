import {PriorityType} from "../../PriorityType";

export class Updater {
    private items: {[processType: number]: IUpdate[] } = {
        [PriorityType.PreOperations]: [],
        [PriorityType.Emergency]: [],
        [PriorityType.Controller]: [],
        [PriorityType.Defense]: [],
        [PriorityType.Raid]: [],
        [PriorityType.Harvest]: [],
        [PriorityType.Secondary]: [],
        [PriorityType.PostOperations]: [],
    };

    public addItem(item: IUpdate) {
        this.items[item.priority].push(item)
    }

    public update() {
        for (let priority in this.items) {
            let items = this.items[priority];
            for (let item of items) {
                item.update();
            }
        }
    }
}
