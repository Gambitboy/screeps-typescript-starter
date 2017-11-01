import {OperationFactory} from "./OperationFactory";

export class OperationManager {

    private factory = new OperationFactory();

    public init() {
        this.factory.init();
    }

    public update() {
        this.factory.update();
    }
}
