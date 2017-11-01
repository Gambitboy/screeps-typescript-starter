import {Role} from "./Role";

export abstract class Cart extends Role {

    public readonly defaultState = "pickUp";

    public getBody(): string[] { return [CARRY, MOVE]; }

    protected getBoost(): string[] { return undefined; }

    protected abstract getOrigin(): Creep|Structure;

    protected abstract getDestination(): Creep|Structure;

    protected pickUp() {
        if (_.sum(this.creep.carry) === this.creep.carryCapacity) {
            this.switchState("dropOff");
            return;
        }

        let origin = this.getOrigin();
        if (this.creep.pos.isNearTo(origin)) {
            if (origin instanceof Creep) {
                origin.transfer(this.creep, RESOURCE_ENERGY);
            } else {
                this.creep.withdraw(origin, RESOURCE_ENERGY);
            }
        } else {
            this.creep.moveTo(origin);
        }
    }

    protected dropOff() {
        if (_.sum(this.creep.carry) === 0) {
            this.switchState("pickUp");
            return;
        }

        let destination = this.getDestination();
        if (this.creep.pos.isNearTo(destination)) {
            this.creep.transfer(destination, RESOURCE_ENERGY);
        } else {
            this.creep.moveTo(destination);
        }
    }
}
