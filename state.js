import Transform from './transform.js';
import entityFactory from '../entities/entity_factory.js';

class State {
    constructor(canvas, systems, observers) {
        this.canvas = canvas;
        this.systems = systems;
        this.entities = {};
        this.events = {};
        this.currentId = 1;
        this.transform = new Transform();
        this.attachObservers(observers);
    }

    tick() {
        this.systems.forEach((system) => {
            system.call(this);
        });
    }

    attachObservers(observers) {
        this.attachClickObservers(observers.click || []);
        this.attachHoverObservers(observers.hover || []);
    }

    canvasCoordinates(event) {
        const elemLeft = this.canvas.offsetLeft + this.canvas.clientLeft;
        const elemTop = this.canvas.offsetTop + this.canvas.clientTop;
        const x = event.pageX - elemLeft + this.transform.center.x;
        const y = event.pageY - elemTop + this.transform.center.y;
        return {x, y};
    }

    attachClickObservers(observers) {
        this.canvas.addEventListener('click', (event) => {
            observers.forEach((observer) => {
                observer.call(this, this.canvasCoordinates(event));
            });
        }, this);
    }

    attachHoverObservers(observers) {
        this.canvas.onmousemove = (event) => {
            observers.forEach((observer) => {
                observer.call(this, this.canvasCoordinates(event));
            });
        };
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
            return this.hasComponents(entity, components);
        });
    }

    hasComponents(entity, components=[]) {
        return components.every((component) => {
            return !!entity[component];
        });
    }
}

export default State;
