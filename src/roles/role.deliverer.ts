module.exports = {
    run: function (creep) {
        if(creep.memory.role == 'deliverer'){
            if(creep.memory.delivering && creep.carry.energy == 0) {
                creep.memory.delivering = false;
            }
            if(!creep.memory.delivering && creep.carry.energy == creep.carryCapacity) {
                creep.memory.delivering = true;
            }

            if(!creep.memory.delivering) {
                if(creep.room.name == creep.memory.home){
                    let storageH = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_STORAGE});
                    if(storageH.length){
                        for(let target of storageH){
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
                    let storageT = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_STORAGE});
                    if(storageT.length) {
                        for(let target of storageT) {
                            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(target);
                            }
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
