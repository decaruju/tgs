export default function(event) {
    this.getEntities(['clickable', 'position', 'drawableRect']).forEach((entity) => {
        if (
            event.y > entity.position.y
                && event.y < entity.position.y + entity.drawableRect.height
                && event.x > entity.position.x
                && event.x < entity.position.x + entity.drawableRect.width
        ) {
            entity.clickable.callback(entity, this);
        }
    });
};
