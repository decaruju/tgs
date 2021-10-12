import Component from './component.js';

function deepClone(obj) {
    if (obj instanceof Array) {
        return obj.map((elem) => deepClone(elem));
    } else if (obj instanceof Object) {
        const cloned = {};
        Object.entries(obj).forEach(([key, value]) => {
            cloned[key] = deepClone(value);
        });
        return cloned;
    } else {
        return obj;
    }
};

class DrawablePath extends Component {
    constructor({paths={}, color, strokeColor}) {
        super();
        this.paths = deepClone(paths);
        this.color = color;
        this.strokeColor = strokeColor;
    }
}

export default DrawablePath;
