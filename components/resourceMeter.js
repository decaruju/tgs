import Component from './component.js';

class ResourceMeter extends Component {
    constructor({earnPredicate, spendPredicate, resource=0}) {
        super();
        this.earnPredicate = earnPredicate;
        this.spendPredicate = spendPredicate;
        this.resource = resource;
    }
}

export default ResourceMeter;
