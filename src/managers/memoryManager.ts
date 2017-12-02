module.exports = {
  run: function () {
    if(!Memory.stats){ Memory.stats = {} }
    if(Game.spawns['Spawn1'].memory.harvester == undefined){
      Game.spawns['Spawn1'].memory.harvester = 2;
      Game.spawns['Spawn1'].memory.hauler = 2;
      Game.spawns['Spawn1'].memory.distributor = 1;
      Game.spawns['Spawn1'].memory.upgrader = 2;
      Game.spawns['Spawn1'].memory.builder = 1;
      Game.spawns['Spawn1'].memory.repairer = 1;
      Game.spawns['Spawn1'].memory.stockpiler = 1;
      Game.spawns['Spawn1'].memory.runner = 0;
      Game.spawns['Spawn1'].memory.claimer = 0;
      Game.spawns['Spawn1'].memory.distantrepairer = 0;
      Game.spawns['Spawn1'].memory.deliverer = 1;
      Game.spawns['Spawn1'].memory.distantBuilder = 1;
      Game.spawns['Spawn1'].memory.miner = 1;
    }
    // if(Game.spawns['Spawn2'].memory.harvester == undefined){
    //     Game.spawns['Spawn2'].memory.harvester = 2;
    //     Game.spawns['Spawn2'].memory.hauler = 2;
    //     Game.spawns['Spawn2'].memory.distributor = 1;
    //     Game.spawns['Spawn2'].memory.upgrader = 2;
    //     Game.spawns['Spawn2'].memory.builder = 1;
    //     Game.spawns['Spawn2'].memory.repairer = 1;
    //     Game.spawns['Spawn2'].memory.stockpiler = 1;
    //     Game.spawns['Spawn2'].memory.runner = 0;
    //     Game.spawns['Spawn2'].memory.claimer = 0;
    //     Game.spawns['Spawn2'].memory.distantrepairer = 0;
    // }
    // if(Game.spawns['Spawn3'] != undefined){
    //     if(Game.spawns['Spawn3'].memory.harvester == undefined){
    //         Game.spawns['Spawn3'].memory.warrior = 0;
    //         Game.spawns['Spawn3'].memory.healer = 0;
    //         Game.spawns['Spawn3'].memory.archer = 0;
    //     }
    // }
    // if(Game.spawns['Spawn4'] != undefined){
    //     if(Game.spawns['Spawn4'].memory.harvester == undefined){
    //         Game.spawns['Spawn4'].memory.warrior = 0;
    //         Game.spawns['Spawn4'].memory.healer = 0;
    //         Game.spawns['Spawn4'].memory.archer = 0;
    //     }
    // }
// Memory.stats['cpu.getUsed'] = Game.cpu.getUsed();
    // Memory.stats['cpu.limit'] = Game.cpu.limit;
    // Memory.stats['cpu.bucket'] = Game.cpu.bucket;
    // Memory.stats['gcl.progress'] = Game.gcl.progress;
    // Memory.stats['gcl.progressTotal'] = Game.gcl.progressTotal;
    // Memory.stats['gcl.level'] = Game.gcl.level;
  }
};
