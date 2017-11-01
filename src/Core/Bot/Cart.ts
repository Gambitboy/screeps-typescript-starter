import {Bot} from "./Bot";

export abstract class Cart extends Bot {

    public readonly defaultState = "pickUp";

    public getBody(): string[] { return [CARRY, MOVE]; }

    protected getBoost(): string[] { return undefined; }

    protected abstract getOrigin(): Creep|Structure;

    protected abstract getDestination(): Creep|Structure;

    protected pickUp() {
        if (this.load === this.creep.carryCapacity) {
            this.switchState("dropOff");
            return;
        }

        let origin = this.getOrigin();
        if (this.creep.pos.isNearTo(origin)) {
            let outcome = this.withdraw(origin, RESOURCE_ENERGY);
            if (outcome === OK && this.fullWithdraw(origin)) {
                this.travelTo(this.getDestination());
            }
        } else {
            this.travelTo(origin);
        }
    }

    protected dropOff() {
        if (this.load === 0) {
            this.switchState("pickUp");
            return;
        }

        let destination = this.getDestination();
        if (this.creep.pos.isNearTo(destination)) {
            let outcome = this.creep.transfer(destination, RESOURCE_ENERGY);
            if (outcome === OK && this.fullTransfer(destination)) {
                this.travelTo(this.getOrigin());
            }
        } else {
            this.travelTo(destination);
        }
    }

    protected fullWithdraw(target: Creep|Structure): boolean {
        return this.spaceRemaining(this.creep) >= this.storedAmount(target);
    }

    protected fullTransfer(target: Creep|Structure): boolean {
        return this.storedAmount(this.creep) <= this.spaceRemaining(target);
    }

    protected storedAmount(target: Creep|Structure): number {
        if (target instanceof Creep) {
            return _.sum(target.carry);
        } else {
            if (target.hasOwnProperty("energy")) {
                return (target as any).energy;
            } else if (target.hasOwnProperty("store")) {
                return _.sum((target as any).store);
            } else {
                return 0;
            }
        }
    }

    protected storeCapacity(target: Creep|Structure): number {
        if (target instanceof Creep) {
            return target.carryCapacity;
        } else {
            if (target.hasOwnProperty("storeCapacity")) {
                return _.sum((target as any).storeCapacity);
            } else if (target.hasOwnProperty("energyCapacity")) {
                return (target as any).energyCapacity;
            } else {
                return 0;
            }
        }
    }

    protected spaceRemaining(target: Creep|Structure): number {
        return this.storeCapacity(target) - this.storedAmount(target);
    }
}
