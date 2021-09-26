export default function() {
    const context = this.canvas.getContext("2d");
    this.getEntities(['drawableRect', 'position']).sort((e1, e2) => e1.position.z-e2.position.z).forEach((entity) => {
        drawRectangle(this, entity, context);
    });
    this.getEntities(['drawablePath', 'position']).sort((e1, e2) => e1.position.z-e2.position.z).forEach((entity) => {
        drawPath(this, entity, context);
    });
    this.getEntities(['drawableText', 'position']).sort((e1, e2) => e1.position.z-e2.position.z).forEach((entity) => {
        drawText(this, entity, context);
    });
}

function drawRectangle(state, entity, context) {
    const {x, y} = state.transform.transformPoint(entity.position);
    if (entity.drawableRect.filled) {
        context.fillStyle = entity.drawableRect.color;
        context.fillRect(
            x,
            y,
            entity.drawableRect.width,
            entity.drawableRect.height,
        );
    } else {
        context.strokeStyle = entity.drawableRect.color;
        context.beginPath();
        context.rect(
            x,
            y,
            entity.drawableRect.width,
            entity.drawableRect.height,
);
        context.stroke();
    }
}

function drawText(state, entity, context) {
    let text = ((typeof entity.drawableText.text) == "string") ? entity.drawableText.text : entity.drawableText.text(entity, state);
    text = entity.drawableText.prefix + text;
    context.font = "30px Arial";
    context.fillStyle = entity.drawableText.color;
    const {x, y} = entity.position.transformed ? state.transform.transformPoint(entity.position) : entity.position;
    context.fillText(text, x + entity.drawableText.offset.x, y + entity.drawableText.offset.y);
}

function drawPath(state, entity, context) {
    context.strokeStyle = entity.drawablePath.color;
    entity.drawablePath.paths.forEach((path) => {
        context.beginPath();
        const {x, y} = state.transform.transformPoint(path[0]);
        context.moveTo(x+entity.position.x, y+entity.position.y);
        path.slice(1).forEach((node) => {
            const {x, y} = state.transform.transformPoint(node);
            context.lineTo(x+entity.position.x, y+entity.position.y);
        });
        context.stroke();
    });
}
