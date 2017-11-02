export class ModifyRoom {
    public static run() {
        Room.prototype.findStructures = function<T extends Structure>(structureType: string): T[] {
            if (!this._structureGroups) {
                this._structureGroups = _.groupBy(this.structures, (s: Structure) => s.structureType);
            }
            return this._structureGroups[structureType] || [] as any;
        };

        Room.prototype.findBots = function<T extends IBot>(roleName: string): T[] {
            if (!this._botGroups) {
                this._botGroups = _.groupBy(this.bots, (bot: IBot) => bot.roleName);
            }
            return this._botGroups[roleName] || [] as any;
        };

        Room.prototype.findOperations = function<T extends IOperation>(operationType: string): T[] {
            if (!this._operationGroups) {
                this._operationGroups = _.groupBy(this.operations, (operation: IOperation) => operation.type);
            }
            return this._operationGroups[operationType] || [] as any;
        };

        Object.defineProperty(Room.prototype, "structures", {
            get: function myProperty() {
                if (!this._structures) {
                    this._structures = this.find(FIND_STRUCTURES);
                }
                return this._structures;
            },
            configurable: true,
        });

        Object.defineProperty(Room.prototype, "operations", {
            get: function myProperty() {
                if (!this._operations) {
                    this._operations = [];
                }
                return this._operations;
            },
            configurable: true,
        });

        Object.defineProperty(Room.prototype, "bots", {
            get: function myProperty() {
                if (!this._bots) {
                    this._bots = [];
                }
                return this._bots;
            },
            configurable: true,
        });
    }
}
