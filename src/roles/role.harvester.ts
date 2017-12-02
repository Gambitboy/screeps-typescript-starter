module.exports = {
    run: function (creep) {
            if(creep.memory.role == 'harvester'){
            if(!creep.memory.harvesting && creep.carry.energy == 0) {
                creep.memory.harvesting = true;
            }
            if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
                creep.memory.harvesting = false;
            }
            if(!creep.memory.harvesting) {
                let sources = creep.room.find(FIND_SOURCES);
                if(!creep.memory.source){
                    for(let source in sources){
                        let harvesters = _.filter(Game.creeps, (creeps) => (creeps.memory.role == 'harvester') && (creeps.memory.source == source) && (creeps.memory.base == creep.memory.base));
                        if(harvesters.length != 1){
                            creep.memory.source = source;
                        }
                    }
                }
                else{
                    if (creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[creep.memory.source]);
                    }
                }
            }
            else{
                let targets = creep.room.find(FIND_STRUCTURES, {filter: (s) => { return (s.structureType == STRUCTURE_SPAWN) && s.energy < s.energyCapacity}});
                if(targets.length > 0){
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
