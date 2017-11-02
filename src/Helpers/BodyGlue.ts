export class BodyGlue {

    /**
     * Returns creep body array with desired number of parts in this order: WORK → CARRY → MOVE
     * @param workCount
     * @param carryCount
     * @param movecount
     * @returns {string[]}
     */
    public static workerBody(workCount: number, carryCount: number, movecount: number): string[] {
        let body: string [] = [];
        for (let i = 0; i < workCount; i++) {
            body.push(WORK);
        }
        for (let i = 0; i < carryCount; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < movecount; i++) {
            body.push(MOVE);
        }
        return body;
    }

    public static configBody(config: {[partType: string]: number}, moveLast = false, potency = 1): string[] {
        let body: string[] = [];

        if (moveLast) {
            for (let partType in config) {
                let amount = config[partType] * potency;
                if (partType === MOVE) {
                    amount--;
                }
                for (let i = 0; i < amount; i++) {
                    body.push(partType);
                }

            }
            body.push(MOVE);
        } else {
            for (let partType in config) {
                let amount = config[partType] * potency;
                for (let i = 0; i < amount; i++) {
                    body.push(partType);
                }
            }
        }
        return body;
    }

    public static configBody2(config: {part: string, count: number}[]): string[] {
        let body: string[] = [];
        for (let value of config) {
            let amount = value.count;
            for (let i = 0; i < amount; i++) {
                body.push(value.part);
            }
        }
        return body;
    }

    public static unitBody(unit: {[partType: string]: number}, maxSpawnEnergy: number, options: UnitBodyOptions = {}): string[] {
        let additionalCost = 0;
        let additionalPartCount = 0;
        if (options.additionalParts) {
            additionalCost = this.calculateBodyCost(options.additionalParts);
            additionalPartCount = options.additionalParts.length;
        }
        options.potency = this.maxUnits(this.configBody(unit), maxSpawnEnergy, options.limit, additionalCost, additionalPartCount);
        if (options.potency === 0) {
            return;
        }

        let body = this.configBody(unit, options.moveLast, options.potency);
        if (options.additionalParts) {
            body = body.concat(options.additionalParts);
        }

        return body;
    }

    public static segmentBody(segments: string[], maxSpawnEnergy: number, limit?: number): string[] {
        let potency = this.maxUnits(segments, maxSpawnEnergy, limit);
        if (potency <= 0) {
            return;
        }
        let body: string[] = [];
        let lastMove;
        for (let segment of segments) {
            let max = potency;
            if (segment === MOVE && !lastMove) {
                lastMove = MOVE;
                max--;
            }
            for (let i = 0; i < max; i++) {
                body.push(segment);
            }
        }
        if (lastMove) {
            body.push(lastMove);
        }

        return body;
    }

    /**
     * Returns creep body array with desired number of parts per unit in this order: WORK → CARRY → MOVE. Max units
     * automatically determined by available spawn energy up to limit
     * @param workCount
     * @param carryCount
     * @param moveCount
     * @param maxSpawnEnergy
     * @param limit
     * @returns {string[]}
     */

    public static workerUnitBody(workCount: number, carryCount: number, moveCount: number, maxSpawnEnergy: number,
                                 limit?: number) {
        return this.unitBody({[WORK]: workCount, [CARRY]: carryCount, [MOVE]: moveCount}, maxSpawnEnergy,
            { limit: limit } );
    }

    public static maxUnitsPerCost(unitCost: number, maxSpawnEnergy: number, limit = 50, additionalCost = 0): number {
        limit = Math.max(limit, 1);
        return Math.min(Math.floor((maxSpawnEnergy - additionalCost) / unitCost), limit);
    }

    public static maxUnits(body: string[], maxSpawnEnergy: number, limit?: number, additionalCost?: number, additionalPartCount = 0) {
        let cost = this.calculateBodyCost(body);
        return Math.min(this.maxUnitsPerCost(cost, maxSpawnEnergy, limit, additionalCost), Math.floor((50 - additionalPartCount) / body.length));
    }

    public static calculateBodyCost(body: string[]): number {
        let sum = 0;
        for (let part of body) {
            sum += BODYPART_COST[part];
        }
        return sum;
    }
}

export interface UnitBodyOptions {
    additionalParts?: string[];
    moveLast?: boolean;
    limit?: number;
    potency?: number;
}
