module.exports = {
    run: function(creep) {
        if(creep.memory.role == 'hauler'){
            if(creep.memory.hauling && creep.carry.energy == 0) {
                creep.memory.hauling = false;
            }
            if(!creep.memory.hauling && creep.carry.energy == creep.carryCapacity) {
                creep.memory.hauling = true;
            }
            if(!creep.memory.hauling) {
                let containers = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER});
                if(!creep.memory.container){
                    for(let container in containers){
                        let hauler = _.filter(Game.creeps, (creeps) => (creeps.memory.role == 'hauler') && (creeps.memory.container == container) && (creeps.memory.base == creep.memory.base));
                        if(hauler.length != 1){
                            creep.memory.container = container;
                        }
                    }
                }
                else{
                    if(creep.withdraw(containers[creep.memory.container], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containers[creep.memory.container]);
                    }
                }
            }
            else{
                let storage = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_STORAGE});
                if(storage.length) {
                    for(let target of storage) {
                        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                    }
                }
            }
        }
    }

};
