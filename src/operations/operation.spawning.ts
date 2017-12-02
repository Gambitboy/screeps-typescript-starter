module.exports = {
    run: function (Game){

        for(let spName in Game.spawns){
            let sp = Game.spawns[spName];
          // let miner = _.filter(Game.creeps, (creep) => );
          let miner = _.filter(Game.creeps, function (creep) {
            let cp =  <Creep>creep;
            return ((cp.memory.role == 'miner') && (cp.memory.base == spName));
          });
            // let harvesters = _.filter(Game.creeps, (creep) => (creep.memory.role == 'harvester') && (creep.memory.base == spName));
            // let haulers = _.filter(Game.creeps, (creep) => (creep.memory.role == 'hauler') && (creep.memory.base == spName));
            // let distributors = _.filter(Game.creeps, (creep) => (creep.memory.role == 'distributor') && (creep.memory.base == spName));
            // let upgraders = _.filter(Game.creeps, (creep) => (creep.memory.role == 'upgrader') && (creep.memory.base == spName));
            // let builders = _.filter(Game.creeps, (creep) => (creep.memory.role == 'builder') && (creep.memory.base == spName));
            // let repairers = _.filter(Game.creeps, (creep) => (creep.memory.role == 'repairer') && (creep.memory.base == spName));
            // let stockPilers = _.filter(Game.creeps, (creep) => (creep.memory.role == 'stockPiler') && (creep.memory.base == spName));
            // let runners = _.filter(Game.creeps, (creep) => (creep.memory.role == 'runner') && (creep.memory.base == spName));
            // let claimers = _.filter(Game.creeps, (creep) => (creep.memory.role == 'claimer') && (creep.memory.base == spName));
            // let distantRepairers = _.filter(Game.creeps, (creep) => (creep.memory.role == 'distantRepairer') && (creep.memory.base == spName));
            // let deliverers = _.filter(Game.creeps, (creep) => (creep.memory.role == 'deliverer') && (creep.memory.base == spName));
            // let distantBuilder = _.filter(Game.creeps, (creep) => (creep.memory.role == 'distantBuilder') && (creep.memory.base == spName));

            if(miner.length < sp.memory.miner){
                removeDeadCreeps();
                sp.createCreep([MOVE,MOVE,WORK,CARRY,CARRY], ('Miner' + Game.time), {role: 'miner', harvesting: 'false', base:spName});
                console.log('Spawning new Miner from: ' + spName);
            }else{
                // if(harvesters.length < sp.memory.harvester){
                //     removeDeadCreeps();
                //     if(sp.createCreep([MOVE,WORK,CARRY,MOVE], ('Harvester'+ Game.time), {role: 'harvester', harvesting: 'false', base:spName}) == -6)
                //         sp.createCreep([MOVE,WORK,WORK], ('Harvester'+ Game.time), {role: 'harvester', harvesting: 'false', base:spName});
                //     console.log('Spawning new Harvester from: ' + spName);
                // }
                // else{
                //     if(haulers.length < sp.memory.hauler){
                //         removeDeadCreeps();
                //         if(sp.createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], ('Hauler' + Game.time), {role: 'hauler', hauling: 'false', base:spName, container:""}) == -6){
                //             sp.createCreep([MOVE,MOVE,CARRY,CARRY], ('Hauler' + Game.time), {role: 'hauler', hauling: 'false', base:spName});
                //         }
                //         console.log('Spawning new Hauler from: ' + spName);
                //     }
                //     else{
                //         if(distributors.length < sp.memory.distributor){
                //             removeDeadCreeps();
                //             if(sp.createCreep([MOVE,MOVE,CARRY,CARRY,CARRY,CARRY], ('Distributor' + Game.time), {role: 'distributor', hauling: 'false', base:spName}) == -6)
                //                 sp.createCreep([MOVE,CARRY], ('Distributor' + Game.time), {role: 'distributor', hauling: 'false', base:spName});
                //             console.log('Spawning new Distributor from: ' + spName);
                //         }
                //         else{
                //             if(upgraders.length < sp.memory.upgrader){//[MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY]
                //                 removeDeadCreeps();//[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
                //                 sp.createCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY], ('Upgrader' + Game.time), {role: 'upgrader', upgrading: 'false', base:spName});
                //                 console.log('Spawning new upgrader from: ' + spName);
                //             }
                //             else{
                //                 if(builders.length < sp.memory.builder && sp.room.find(FIND_CONSTRUCTION_SITES).length > 0){
                //                     removeDeadCreeps();
                //                     sp.createCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY], ('Builder' + Game.time), {role: 'builder', building: 'false', base:spName});
                //                     console.log('Spawning new builder from: ' + spName);
                //                 }
                //                 else{
                //                     if(repairers.length < sp.memory.repairer){
                //                         removeDeadCreeps();
                //                         sp.createCreep([MOVE,MOVE,WORK,CARRY], ('Repairer' + Game.time), {role: 'repairer', repairing: 'false', base:spName});
                //                         console.log('Spawning new repairer from: ' + spName);
                //                     }
                //                     else{
                //                         if(stockPilers.length < sp.memory.stockpiler && sp.room.find(FIND_DROPPED_RESOURCES).length > 0){
                //                             removeDeadCreeps();
                //                             sp.createCreep([MOVE,MOVE,CARRY,CARRY,CARRY,CARRY], ('StockPiler' + Game.time), {role: 'stockPiler', hauling: 'false', base:spName});
                //                             console.log('Spawning new StockPiler from: ' + spName);
                //                         }
                //                         else{
                //                             if(runners.length < sp.memory.runner){
                //                                 removeDeadCreeps();
                //                                 sp.createCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY], ('Runner' + Game.time), {role: 'runner', harvesting: 'false', target: "W12S29", home: "W12S28", base:spName});
                //                                 console.log('Spawning new Runner from: ' + spNAme);
                //                             }
                //                             else{
                //                                 if(claimers.length < sp.memory.claimer && (Game.rooms['W12S29'].controller.ticksToDowngrade <= 200 || Game.rooms['W12S29'].controller.progress == undefined)){
                //                                     removeDeadCreeps();
                //                                     sp.createCreep([MOVE,CLAIM], ('Claimer' + Game.time), {role: 'claimer', target: 'W12S29', base:spName});
                //                                     console.log('Spawning new claimer from: ' + spNAme);
                //                                 }
                //                                 else{
                //                                     if(distantRepairers.length < sp.memory.distantrepairer){
                //                                         removeDeadCreeps();
                //                                         sp.createCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY], ('DistantRepairer' + Game.time), {role: 'distantRepairer', repairing: 'false', target: 'W12S29', home: 'W12S28', base:spName});
                //                                         console.log('Spawning new Distant Repairer: ' + spName);
                //                                     }
                //                                     else{
                //                                         if(deliverers.length < sp.memory.deliverer){
                //                                             removeDeadCreeps();
                //                                             sp.createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], ('Deliverer' + Game.time), {role: 'deliverer', delivering: 'false', target: 'W12S27', home: 'W12S28', base:spName});
                //                                             console.log('Spawning new Deliverer: ' + spName);
                //                                         }
                //                                         else{
                //                                             if(distantBuilder.length < sp.memory.distantBuilder){
                //                                                 removeDeadCreeps();
                //                                                 sp.createCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY], ('distantBuilder' + Game.time), {role: 'distantBuilder', building: 'false', base:spName, target: 'W12S29', home: 'W12S28'});
                //                                                 console.log('Spawning new Distant Builder from: ' + spName);
                //                                             }
                //                                         }
                //                                     }
                //                                 }
                //                             }
                //                         }
                //                     }
                //                 }
                //             }
                //         }
                //     }
                // }
            }
        }
        function removeDeadCreeps(){
            for(let i in Memory.creeps) {
                if(!Game.creeps[i]) {
                    delete Memory.creeps[i];
                }
            }
        }
    }
};
