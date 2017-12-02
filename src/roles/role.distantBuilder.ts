module.exports = {
    run: function (creep) {
        if(creep.memory.role == 'distantBuilder'){
            if(creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
            }
            if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                creep.memory.building = true;
            }

            if(!creep.memory.building) {
                if(creep.room.name == creep.memory.home){
                    let storage = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_STORAGE});
                    if(storage.length){
                        for(let target of storage){
                            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(target);
                            }
                        }
                    }
                }
                else{
                    let homeExit = creep.room.findExitTo(creep.memory.home);
                    creep.moveTo(creep.pos.findClosestByPath(homeExit));
                }
            }
            else {
                if(creep.room.name == creep.memory.target){
                    let homeTar = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if(homeTar.length){
                        if(creep.build(homeTar[0]) == ERR_NOT_IN_RANGE){
                            creep.moveTo(homeTar[0]);
                        }
                    }
                }
                else{
                    let targetExit = creep.room.findExitTo(creep.memory.target);
                    creep.moveTo(creep.pos.findClosestByPath(targetExit));
                }
            }
        }
    }
};
