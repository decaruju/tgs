import Component from './component.js';

class DrawablePath extends Component {
    constructor({paths=[], color}) {
        super();
        this.paths = paths.map((path) => path.map((node) => ({...node})));
        this.color = color;
    }
}

export default DrawablePath;
