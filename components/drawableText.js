import Component from './component.js';

class DrawableText extends Component {
    constructor({color, prefix="", text=""}) {
        super();
        this.color = color;
        this.prefix = prefix;
        this.text = text;
    }
}

export default DrawableText;
