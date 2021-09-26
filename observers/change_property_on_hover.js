import setDeepProperty from '../utils/set_deep_property.js';

export default function(event) {
    this.getEntities(['changePropertyOnHover', 'position']).forEach(async (entity) => {
        if (
            event.y > entity.position.y
                && event.y < entity.position.y + entity.drawableRect.height
                && event.x > entity.position.x
                && event.x < entity.position.x + entity.drawableRect.width
        ) {
            setDeepProperty(entity, entity.changePropertyOnHover.property, entity.changePropertyOnHover.trueValue);
        } else {
            setDeepProperty(entity, entity.changePropertyOnHover.property, entity.changePropertyOnHover.falseValue);
        }
    });
};
