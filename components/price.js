import Component from './component.js';

class Price extends Component {
    constructor({prices}) {
        super();
        this.prices = { ...prices };
    }
}

export default Price;
