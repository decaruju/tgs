import Component from './component.js';

class DrawableText extends Component {
    constructor({color, prefix="", text="", offset={x: 0, y: 0}}) {
        super();
        this.color = color;
        this.prefix = prefix;
        this.offset = offset;
        this.text = text;
    }
}

export default DrawableText;
