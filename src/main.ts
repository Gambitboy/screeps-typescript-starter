/*
BACKUP CODE FOR EMERGENCIES:
creep.moveTo(Game.spawns['Spawn1']);    -- FLEE BACK TO BASE
*/
let roleManager = require('./managers/roleManager');
let spawning = require('./operations/operation.spawning');

module.exports.loop = function () {
  spawning.run(Game);
  roleManager.run(Game);
};
