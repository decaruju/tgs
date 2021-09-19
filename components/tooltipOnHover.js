import Component from './component.js';

class TooltipOnHover extends Component {
    constructor({tooltipArgs, offset}) {
        super();
        this.tooltipArgs = tooltipArgs;
        this.offset = {x:0, y:-50};
        this.tooltip = null;
    }
}

export default TooltipOnHover;
