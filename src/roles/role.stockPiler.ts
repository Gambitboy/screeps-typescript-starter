module.exports = {
    run: function(creep) {
        if(creep.memory.role == 'stockPiler'){
            if(creep.memory.hauling && creep.carry.energy == 0) {
                creep.memory.hauling = false;
            }
            if(!creep.memory.hauling && creep.carry.energy == creep.carryCapacity) {
                creep.memory.hauling = true;
            }
            if(!creep.memory.hauling) {
                const drops = creep.room.find(FIND_DROPPED_RESOURCES);
                if(drops.length > 0) {
                    creep.moveTo(drops[0]);
                    creep.pickup(drops[0]);
                }
                else{
                    creep.moveTo(creep.room.controller);
                }
            }
            else{
                let targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE);
                    }});
                if(targets.length > 0) {
                    for(let target of targets) {
                        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                    }
                }
            }
        }
    }

};
