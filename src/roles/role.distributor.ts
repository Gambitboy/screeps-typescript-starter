module.exports = {
    run: function(_creep) {
        if(_creep.memory.role == 'distributor'){
            // if(_creep.ticksToLive <= 10){
            //     global.nextHauler = _creep.memory.id;
            // }
            if(_creep.memory.hauling && _creep.carry.energy == 0) {
                _creep.memory.hauling = false;
            }
            if(!_creep.memory.hauling && _creep.carry.energy == _creep.carryCapacity) {
                _creep.memory.hauling = true;
            }
            if(!_creep.memory.hauling) {
                let storage = _creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_STORAGE});
                if(storage.length){
                    if(_creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        _creep.moveTo(storage[0]);
                    }
                }
            }
            else{
                let targets = _creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (((structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity));
                    }});
                if(targets.length > 0) {
                    for(let target of targets) {
                        if (_creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            _creep.moveTo(target);
                        }
                    }
                }
                else{
                    let tower = _creep.room.find(FIND_STRUCTURES, {filter: (s) => { return s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity }});
                    if(tower.length > 0){
                        for(let t of tower) {
                            if (_creep.transfer(t, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                _creep.moveTo(t);
                            }
                        }
                    }
                }
            }
        }
    }
};
