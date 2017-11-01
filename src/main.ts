import {core} from "./Core/Core";

let cpu = Game.cpu.getUsed();
core.init();
cpu = Game.cpu.getUsed() - cpu;
// console.log("init cpu:", cpu);
console.log("refresh");
export const loop = () => {

    cpu = Game.cpu.getUsed();
    core.update();
    cpu = Game.cpu.getUsed() - cpu;
    // console.log("update cpu:", cpu);
};
