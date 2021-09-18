export default function() {
    this.getEntities(['spinInCircles', 'position']).forEach((entity) => {
        entity.spinInCircles.angle += entity.spinInCircles.anglePerTick;
        entity.position.x = Math.cos(entity.spinInCircles.angle)*entity.spinInCircles.radius + entity.spinInCircles.centerX;
        entity.position.y = Math.sin(entity.spinInCircles.angle)*entity.spinInCircles.radius + entity.spinInCircles.centerY;
    });
};
