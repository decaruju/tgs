import Transform from './transform.js';
import entityFactory from '../entities/entity_factory.js';

class State {
    constructor(canvas, systems, observers) {
        this.canvas = canvas;
        this.systems = systems;
        this.observerInstances = observers.map((observer) => {
            const observerInstance = new observer();
            observerInstance.attach(this);
            return observerInstance;
        });
        this.entities = {};
        this.currentId = 1;
        this.transform = new Transform();
    }

    tick() {
        this.systems.forEach((system) => {
            system.call(this);
        });
    }

    async buildEntity(entity_name, args) {
        const entity = await entityFactory(
            entity_name,
            args,
        );

        this.addEntity(entity);

        return entity;
    }

    addEntity(entity) {
        entity.id = this.currentId;
        this.entities[this.currentId++] = entity;
    }

    removeEntity(id) {
        delete this.entities[id];
    }

    getEntity(id) {
        return this.entities[id];
    }

    getEntities(components=[]) {
        return Object.values(this.entities).filter((entity) => {
            return components.every((component) => {
                return !!entity[component];
            });
        });
    }
}

export default State;
