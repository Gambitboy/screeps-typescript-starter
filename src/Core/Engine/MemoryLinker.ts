export class MemoryLinker {

    private links: {memoryId: string, child: ILinkMemory, parent: ILinkMemory}[] = [];

    public addLink(memoryId: string, child: ILinkMemory, parent: ILinkMemory) {
        if (!parent.memory[memoryId]) { parent.memory[memoryId] = {}; }
        this.links.push({memoryId: memoryId, child: child, parent: parent});
        child.memory = parent.memory[memoryId];
    }

    public update() {
        for (let link of this.links) {
            link.child.memory = link.parent.memory[link.memoryId]
        }
    }
}
