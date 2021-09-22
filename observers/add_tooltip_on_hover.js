export default function(event) {
    this.getEntities(['tooltipOnHover', 'position']).forEach(async (entity) => {
        if (
            event.y > entity.position.y
                && event.y < entity.position.y + entity.drawableRect.height
                && event.x > entity.position.x
                && event.x < entity.position.x + entity.drawableRect.width
        ) {
            if (!entity.tooltipOnHover.tooltip) {
                entity.tooltipOnHover.tooltip = {};
                const tooltip = await this.buildEntity('tooltip', entity.tooltipOnHover.tooltipArgs);
                tooltip.childOf.parent = entity.id;
                entity.tooltipOnHover.tooltip = tooltip;
            }
            if (entity.tooltipOnHover.tooltip?.id) {
                entity.tooltipOnHover.tooltip.position.x = event.x + entity.tooltipOnHover.offset.x;
                entity.tooltipOnHover.tooltip.position.y = event.y + entity.tooltipOnHover.offset.y;
            }
        } else {
            if (entity.tooltipOnHover.tooltip?.id) {
                this.removeEntity(entity.tooltipOnHover.tooltip.id);
                entity.tooltipOnHover.tooltip = null;
            }
        }
    });
};
