import Component from './component.js';

class ChildOf extends Component {
    constructor({parent}) {
        super();
        this.parent = parent;
    }
}

export default ChildOf;
