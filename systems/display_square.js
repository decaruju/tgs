export default function() {
    const context = this.canvas.getContext("2d");
    this.getEntities(['drawableRect', 'position']).sort((e1, e2) => e1.position.z-e2.position.z).forEach((entity) => {
        context.fillStyle = entity.drawableRect.color;
        const {x, y} = this.transform.transformPoint(entity.position);
        context.fillRect(
            x,
            y,
            entity.drawableRect.width,
            entity.drawableRect.height,
        );
    });
}
