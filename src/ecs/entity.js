class Entity {
    constructor(id = undefined) {
        if (!id) {
            // Generate a pseudo random ID
            this.id = (+new Date()).toString(16) + 
            (Math.random() * 100000000 | 0).toString(16) +
            Entity.count;
            Entity.count++;
        } else {
            this.id = id;
        }

        this.active = true;

        this.components = {};
    }

    addComponent(component) {
        this.components[component.name] = component;
        return this;
    }

    removeComponent(componentName) {
        delete this.components[componentName];
        return this;
    }

    clearComponents() {
        this.components = {};
    }
}

Entity.count = 0;

module.exports = Entity;