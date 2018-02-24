const IComponent = require('../ecs/component');
const Transformation = require('../math/transformation');

class TransformComponent extends IComponent {
    constructor() {
        super('transformComponent');
        this.transform = new Transformation();
    }
}

module.exports = TransformComponent;
