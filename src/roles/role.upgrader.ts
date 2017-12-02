module.exports = {
    run: function(creep) {
        if(creep.memory.role == 'upgrader'){
            if(creep.memory.upgrading && creep.carry.energy == 0) {
                creep.memory.upgrading = false;
            }
            if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
                creep.memory.upgrading = true;
            }

            if(creep.memory.upgrading) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            else {
                let storage = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_STORAGE});
                if(storage.length){
                    for(let target of storage){
                        if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(target);
                        }
                    }
                }
                else{
                    const targets = creep.room.find(FIND_DROPPED_RESOURCES);
                    if(targets.length) {
                        creep.moveTo(targets[0]);
                        creep.pickup(targets[0]);
                    }
                }
            }
        }
    }
};
