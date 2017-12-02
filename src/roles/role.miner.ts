module.exports = {
  run(creep){
    if(creep.memory.role == 'miner'){
      if(!creep.memory.harvesting && creep.carry.energy == 0) {
        creep.memory.harvesting = true;
      }
      if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
        creep.memory.harvesting = false;
      }
      if(creep.memory.harvesting) {
        let sources = creep.room.find(FIND_SOURCES);
        if(!creep.memory.source){
          for(let source in sources){
            let harvesters = _.filter(Game.creeps, (creeps) => (creeps.memory.role == 'miner') && (creeps.memory.source == source) && (creeps.memory.base == creep.memory.base));
            if(harvesters.length != 2){
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
        let targets = creep.room.find(FIND_STRUCTURES, {filter: (s) => { return (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) && s.energy < s.energyCapacity}});
        if(targets.length > 0){
          for(let target of targets) {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(target);
            }
          }
        }
        else{
          if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
          }
        }
      }
    }
  }
};
