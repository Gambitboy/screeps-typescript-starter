import {Bot} from "./Bot";

export abstract class Cart extends Bot {

    public readonly defaultState = "pickUp";

    public getBody(): string[] { return [CARRY, MOVE]; }

    protected getBoost(): string[] { return undefined; }

    protected abstract getPickUp(): IResourceHolder;

    protected abstract getDropOff(): IResourceHolder;

    protected pickUp() {
        if (this.currentAmount === this.creep.carryCapacity) {
            this.switchState("dropOff");
            return;
        }

        let origin = this.getPickUp();
        if (!origin) {
            console.log("no pickUp");
            return;
        }

        if (this.creep.pos.isNearTo(origin)) {
            let outcome = this.withdraw(origin, RESOURCE_ENERGY);
            if (outcome === OK && this.fullWithdraw(origin)) {
                this.travelTo(this.getDropOff());
            }
        } else {
            this.travelTo(origin);
        }
    }

    protected dropOff() {
        if (this.currentAmount === 0) {
            this.switchState("pickUp");
            return;
        }

        let destination = this.getDropOff();
        if (!destination) {
            console.log("no dropOff");
            return;
        }

        if (this.creep.pos.isNearTo(destination)) {
            let outcome = this.transfer(destination, RESOURCE_ENERGY);
            if (outcome === OK && this.fullTransfer(destination)) {
                this.travelTo(this.getPickUp());
            }
        } else {
            this.travelTo(destination);
        }
    }

    protected fullWithdraw(target: IResourceHolder): boolean {
        return target.currentAmount >= this.spaceRemaining;
    }

    protected fullTransfer(target: IResourceHolder): boolean {
        return target.spaceRemaining >= this.currentAmount;
    }
}
