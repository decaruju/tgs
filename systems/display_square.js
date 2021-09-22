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
    let text = ((typeof entity.drawableText.text) == "string") ? entity.drawableText.text : entity.drawableText.text(entity, state);
    text = entity.drawableText.prefix + text;
    context.font = "30px Arial";
    context.fillStyle = entity.drawableText.color;
    const {x, y} = entity.position.transformed ? state.transform.transformPoint(entity.position) : entity.position;
    context.fillText(text, x, y);
}
