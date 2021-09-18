import Component from './component.js';

class SpinInCircles extends Component {
    constructor({centerX, centerY, radius, startAngle, anglePerTick}) {
        super();
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
        this.angle = startAngle;
        this.anglePerTick = anglePerTick;
    }
}

export default SpinInCircles;
