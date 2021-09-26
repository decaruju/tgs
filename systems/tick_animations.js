import setDeepProperty from '../utils/set_deep_property.js';
import getDeepProperty from '../utils/get_deep_property.js';

export default function() {
    this.getEntities(['animation']).forEach((entity) => {
        entity.animation.animations.forEach((animation) => {
            const currentValue = getDeepProperty(entity, animation.property);
            const nextValue = currentValue + (animation.targetValue - currentValue)/animation.remainingTicks;
            setDeepProperty(entity, animation.property, nextValue);
            animation.remainingTicks--;
        });

        entity.animation.animations = entity.animation.animations.filter((animation) => animation.remainingTicks > 0);
    });
};
