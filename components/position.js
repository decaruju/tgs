import Component from './component.js';

class Position extends Component {
    constructor({x, y, z=0}) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

export default Position;
