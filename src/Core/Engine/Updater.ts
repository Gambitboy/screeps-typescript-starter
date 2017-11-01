import {PriorityType} from "../../PriorityType";

export class Updater {
    private items: {
        [processType: number]: {
            [itemId: string]: IUpdate;
        }
    } = {
        [PriorityType.PreOperations]: {},
        [PriorityType.Emergency]: {},
        [PriorityType.Controller]: {},
        [PriorityType.Defense]: {},
        [PriorityType.Raid]: {},
        [PriorityType.Harvest]: {},
        [PriorityType.Secondary]: {},
        [PriorityType.PostOperations]: {},
    };

    public addItem(item: IUpdate) {
        this.items[item.priority][item.id] = item;
    }

    public removeItem(item: IUpdate) {
        delete this.items[item.priority][item.id];
    }

    public update() {
        for (let priority in this.items) {
            let items = this.items[priority];
            for (let id in items) {
                let item = items[id];
                item.update();
            }
        }
    }
}
