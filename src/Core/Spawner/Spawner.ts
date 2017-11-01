import {Role} from "../Role/Role";

export class Spawner {

    private spawning: boolean;

    public update() {
        this.spawning = false;
    }

    public spawn(agent: Role): string {
        let spawn = Game.spawns.Spawn1;
        if (spawn.spawning || this.spawning) { return; }
        let outcome = spawn.spawnCreep(agent.getBody(), agent.name);
        if (outcome === OK) {
            this.spawning = true;
            return agent.name;
        }
    }
}
