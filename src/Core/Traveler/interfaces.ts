interface TravelToReturnData {
    nextPos?: RoomPosition;
    pathfinderReturn?: PathFinderPath;
    state?: TravelState;
    path?: string;
}

interface TravelToOptions {
    ignoreRoads?: boolean;
    ignoreCreeps?: boolean;
    ignoreStructures?: boolean;
    preferHighway?: boolean;
    highwayBias?: number;
    allowHostile?: boolean;
    allowSK?: boolean;
    range?: number;
    obstacles?: {pos: RoomPosition}[];
    roomCallback?: (roomName: string, matrix: CostMatrix) => CostMatrix | boolean;
    routeCallback?: (roomName: string) => number;
    returnData?: TravelToReturnData;
    restrictDistance?: number;
    useFindRoute?: boolean;
    maxOps?: number;
    movingTarget?: boolean;
    freshMatrix?: boolean;
    offRoad?: boolean;
    stuckValue?: number;
    maxRooms?: number;
    repath?: number;
    route?: {[roomName: string]: boolean};
    ensurePath?: boolean;
    pushy?: boolean;
}

interface TravelData {
    state: any[];
    path: string;
    delay: number;
}

interface TravelState {
    stuckCount: number;
    lastCoord: Coord;
    destination: RoomPosition;
    cpu: number;
}

type Coord = {x: number, y: number};
type IPosition = RoomPosition|{pos: RoomPosition};

interface RoomCoord {
    x: number,
    y: number,
    xDir: string,
    yDir: string,
}