module.exports = {
    run: function (creep) {
        if(creep.memory.role == 'runner'){
            if(!creep.memory.harvesting && creep.carry.energy == 0) {
                creep.memory.harvesting = true;
            }
            if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
                creep.memory.harvesting = false;
            }
            if(!creep.memory.harvesting) {
                if(creep.room.name == creep.memory.home){
                    let targets = creep.room.find(FIND_STRUCTURES, {filter: (s) => { return (s.structureType == STRUCTURE_CONTAINER)}});
                    if(targets.length > 0){
                        for(let target of targets) {
                            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
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
            else{
                if(creep.room.name == creep.memory.target){
                    let sources = creep.pos.findClosestByRange(FIND_SOURCES);
                    if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources);
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
