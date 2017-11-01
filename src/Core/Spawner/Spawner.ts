import {Bot} from "../Bot/Bot";

export class Spawner {

    private spawning: boolean;

    public update() {
        this.spawning = false;
    }

    public spawn(agent: Bot): string {
        let spawn = Game.spawns.Spawn1;
        if (spawn.spawning || this.spawning) { return; }
        let outcome = spawn.spawnCreep(agent.body, agent.id);
        if (outcome === OK) {
            this.spawning = true;
            return agent.id;
        }
    }
}
