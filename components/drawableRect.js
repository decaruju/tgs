import Component from './component.js';

class DrawableRectangle extends Component {
    constructor({color, width, height}) {
        super();
        this.color = color;
        this.width = width;
        this.height = height;
    }
}

export default DrawableRectangle;
