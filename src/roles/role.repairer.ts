module.exports = {
    run: function (creep) {
        if(creep.memory.role == 'repairer'){
            if(creep.memory.repairing && creep.carry.energy == 0) {
                creep.memory.repairing = false;
            }
            if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
                creep.memory.repairing = true;
            }

            if(creep.memory.repairing == true){
                let structures = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType !=STRUCTURE_RAMPART && s.structureType !=STRUCTURE_CONTAINER}});
                if(structures.length > 0){
                    if(creep.repair(structures[0]) == ERR_NOT_IN_RANGE){
                        creep.moveTo(structures[0]);
                    }
                }
            }
            else{
                let storage = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_STORAGE});
                if(storage.length){
                    for(let target of storage){
                        if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                    }
                }
            }
        }
    }
};
