import Component from './component.js';

class ResourceMeter extends Component {
    constructor({earnPredicate, spendPredicate, resource=0}) {
        super();
        this.earnPredicate = earnPredicate;
        this.spendPredicate = spendPredicate;
        this.resource = resource;
        this.delta = 0;
    }

    applyDelta(delta) {
        this.delta = delta;
        this.resource += delta;
    }
}

export default ResourceMeter;
