export default function() {
    const context = this.canvas.getContext("2d");
    this.getEntities(['position']).sort((e1, e2) => e1.position.z-e2.position.z).forEach((entity) => {
        if (this.hasComponents(entity, ['drawableRect'])) {
            drawRectangle(this, entity, context);
        }
        if (this.hasComponents(entity, ['drawableText'])) {
            drawText(this, entity, context);
        }
    });
}

function drawRectangle(state, entity, context) {
    context.fillStyle = entity.drawableRect.color;
    const {x, y} = state.transform.transformPoint(entity.position);
    context.fillRect(
        x,
        y,
        entity.drawableRect.width,
        entity.drawableRect.height,
    );
}

function drawText(state, entity, context) {
    const text = entity.drawableText.prefix + entity.drawableText.text(entity);
    context.font = "30px Arial";
    context.fillStyle = entity.drawableText.color;
    const {x, y} = entity.position.transformed ? state.transform.transformPoint(entity.position) : entity.position;
    context.fillText(text, x, y);
}
