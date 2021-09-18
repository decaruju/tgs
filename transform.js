class Transform {
    constructor() {
        this.center = { x: 0, y: 0 };
    }

    transformPoint(point) {
        return {
            x: point.x-this.center.x,
            y: point.y-this.center.y,
        };
    }
}

export default Transform;
