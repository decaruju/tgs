import Component from './component.js';

class DrawableRectangle extends Component {
    constructor({color, width, height, filled=true}) {
        super();
        this.color = color;
        this.width = width;
        this.height = height;
        this.filled = filled;
    }
}

export default DrawableRectangle;
