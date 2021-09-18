import Component from './component.js';

class Position extends Component {
    constructor({x=0, y=0, z=0, transformed=true}) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
        this.transformed = transformed;
    }

    gridPosition() {
        return {
            x: this.x/32,
            y: this.y/32,
        };
    }
}

export default Position;
