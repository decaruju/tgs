import Component from './component.js';

class Grid extends Component {
    constructor({}) {
        super();
        this.grid = {};
    }

    index(entity, position) {
        this.grid[this.key(position)] = entity;
    }

    hasCell(position) {
        return !!this.getCell(position);
    }

    getCell(position) {
        return this.grid[this.key(position)];
    }

    key(position) {
        return `${position.x},${position.y}`;
    }

    remove(position) {
        const entity = this.getCell(position);
        if (entity) delete this.grid[this.key(position)];
        return entity;
    }

    map(predicate) {
        return Object.values(this.grid).map(predicate);
    }

    neighborPositions(position) {
        const {x, y} = position;
        return [
            {x, y: y+1},
            {x, y: y-1},
            {x: x+1, y},
            {x: x-1, y},
        ];
    }

    neighbors(position) {
        return this.neighborPositions(position).map((neighborPosition) => this.getCell(neighborPosition)).filter((e) => e);
    }

    degree(position) {
        return this.neighborPositions(position).map((position) => this.hasCell(position)).sum();
    }
}

export default Grid;
