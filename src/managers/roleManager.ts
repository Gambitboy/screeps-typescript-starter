let roleMiner = require('../roles/role.miner');
let roleHarvester = require('../roles/role.harvester');
let roleRunner = require('../roles/role.runner');
let roleUpgrader = require('../roles/role.upgrader');
let roleHauler = require('../roles/role.hauler');
let roleDistributor = require('../roles/role.distributor');
let roleStockPiler = require('../roles/role.stockPiler');
let roleBuilder = require('../roles/role.builder');
let roleRepairer = require('../roles/role.repairer');
let roleDistantRepairer = require('../roles/role.distantRepairer');
let roleDistantBuilder = require('../roles/role.distantBuilder');
let roleDeliverer = require('../roles/role.deliverer');
let roleClaimer = require('../roles/role.claimer');

module.exports = {
  run(_Game){
    for(let name in _Game.creeps) {
      let creep = _Game.creeps[name];
      switch (creep.memory.role){
        case 'miner': roleMiner.run(creep); break;

        case 'harvester': roleHarvester.run(creep); break;

        case 'hauler': roleHauler.run(creep); break;

        case 'distributor': roleDistributor.run(creep); break;

        case 'upgrader': roleUpgrader.run(creep); break;

        case 'builder': roleBuilder.run(creep); break;

        case 'repairer': roleRepairer.run(creep); break;

        case 'stockPiler': roleStockPiler.run(creep); break;

        case 'runner': roleRunner.run(creep); break;

        case 'claimer': roleClaimer.run(creep); break;

        case 'distantRepairer': roleDistantRepairer.run(creep); break;

        case 'distantBuilder': roleDistantBuilder.run(creep); break;

        case 'deliverer': roleDeliverer.run(creep); break;
      }
    }
  }
};
