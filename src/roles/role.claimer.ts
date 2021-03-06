module.exports = {
    run: function(creep) {
        if(creep.memory.role == 'claimer') {
            if(creep.room.name != creep.memory.target){
                let exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
            else{
                if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
};
