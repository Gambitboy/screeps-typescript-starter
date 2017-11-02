import {EnergyStructure} from "./EnergyEntity";
import {Entity} from "./Entity";

export class SpawnEntity extends EnergyStructure<StructureSpawn> {

    public static get(spawn: StructureSpawn): SpawnEntity {
        if (this.cache[spawn.id]) { return this.cache[spawn.id] as SpawnEntity; }
        let entity = new SpawnEntity(spawn);
        Entity.cache[spawn.id] = entity;
        return entity;
    }
}
