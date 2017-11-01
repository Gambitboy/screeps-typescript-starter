export class TransportAnalysis {
    public static run(distance: number, load: number, maxSpawnEnergy: number, offRoad = false): TransportAnalysis {
        // cargo units are just 2 CARRY, 1 MOVE, which has a capacity of 100 and costs 150
        distance = Math.max(distance, 1);
        let maxUnitsPossible = Math.min(Math.floor(maxSpawnEnergy /
            ((BODYPART_COST[CARRY] * 2) + BODYPART_COST[MOVE])), 16);
        let bandwidthNeeded = distance * load * 2.1;
        let cargoPartsPerUnit = 2;

        if (offRoad) {
            maxUnitsPossible = Math.min(Math.floor(maxSpawnEnergy /
                ((BODYPART_COST[CARRY]) + BODYPART_COST[MOVE])), 25);
            cargoPartsPerUnit = 1;
        }

        let cargoUnitsNeeded = Math.ceil(bandwidthNeeded / (CARRY_CAPACITY * cargoPartsPerUnit));
        let cartsNeeded = Math.ceil(cargoUnitsNeeded / maxUnitsPossible);
        let cargoUnitsPerCart = Math.floor(cargoUnitsNeeded / cartsNeeded);
        return {
            load: load,
            distance: distance,
            cartsNeeded: cartsNeeded,
            carryCount: cargoUnitsPerCart * cargoPartsPerUnit,
            moveCount: cargoUnitsPerCart,
            maxSpawnEnergy: maxSpawnEnergy,
        };
    }
}

export interface TransportAnalysis {
    load: number;
    distance: number;
    cartsNeeded: number;
    carryCount: number;
    moveCount: number;
    maxSpawnEnergy: number;
}
