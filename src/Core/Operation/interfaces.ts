interface IOperation {
    name: string;
    id: string;
    type: string;
}

interface IRoomOperation {
    flag: Flag;
    pos: RoomPosition;
    roomName: string;
    room: Room;
    missions: IMission[];
}
