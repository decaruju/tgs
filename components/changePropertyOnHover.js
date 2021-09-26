import Component from './component.js';

class ChangePropertyOnHover extends Component {
    constructor({property, trueValue, falseValue}) {
        super();
        this.property = property;
        this.trueValue = trueValue;
        this.falseValue = falseValue;
    }
}

export default ChangePropertyOnHover;
