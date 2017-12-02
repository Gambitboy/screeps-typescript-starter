module.exports = {
    run: function (creep) {
        if(creep.memory.role == 'distantRepairer'){
            if(creep.memory.repairing && creep.carry.energy == 0) {
                creep.memory.repairing = false;
            }
            if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
                creep.memory.repairing = true;
            }

            if(!creep.memory.repairing) {
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
                    let structures = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.hits < s.hitsMax && s.structureType == STRUCTURE_CONTAINER}});
                    if(structures.length){
                        if(creep.repair(structures[0]) == ERR_NOT_IN_RANGE){
                            creep.moveTo(structures[0]);
                        }
                    }
                    else{
                        if(creep.room.name == creep.memory.target){
                            let structure = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.hits < s.hitsMax}});
                            if(structure.length){
                                for(let struct of structure){
                                    if(creep.repair(struct) == ERR_NOT_IN_RANGE){
                                        creep.moveTo(struct);
                                    }
                                }

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
