// module.exports = {
//     run: function() {
//         let towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
//         for(let tower of towers){
//           // let tw = <StructureTower>tower;
//             if(tower.energy >= tower.energyCapacity/2){
//                 let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
//                 if(target != undefined){
//                     tower.attack(target);
//                 }
//                 else{
//                     let structures = tower.room.find(FIND_STRUCTURES, {filter: (s) => {return s.hits < s.hitsMax/600 || (s.structureType == STRUCTURE_RAMPART && s.hits < 500000)}});
//                     if(structures.length){
//                         structures.sort(function(a, b){
//                             return a.hits - b.hits
//                         });
//                         tower.repair(structures[0]);
//                     }
//                     else{
//                         let repairTargets = tower.room.find(FIND_STRUCTURES, {filter: (s) => {return s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART}});
//                         if(repairTargets.length){
//                             repairTargets.sort(function(a, b){
//                                 return a.hits - b.hits
//                             });
//                             tower.repair(repairTargets[0])
//                         }
//                     }
//                 }
//             }
//             else{
//                 let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
//                 if(target != undefined){
//                     tower.attack(target);
//                 }
//             }
//         }
//     }
// };
