import Component from './component.js';

class Clickable extends Component {
    constructor({callback}) {
        super();
        this.callback = callback;
    }
}

export default Clickable;
