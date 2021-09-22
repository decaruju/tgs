export default {
    drawableRect: {
        color: "#905030",
        width: 30,
        height: 30,
    },
    position: {
        z: 1,
    },
    clickable: {
        callback: (entity, state) => {
            const prices = entity.price.prices;
            if (state.resources.energy.resourceMeter.resource < prices.energy || state.resources.water.resourceMeter.resource < prices.water) return;
            state.resources.energy.resourceMeter.resource -= prices.energy;
            state.resources.water.resourceMeter.resource -= prices.water;
            entity.level.level += 1;
            entity.price.prices.water *= 2;
            entity.price.prices.energy *= 2;
        }
    },
    price: {
        prices: {
            water: 50,
            energy: 100,
        },
    },
    level: {},
    tooltipOnHover: {
        tooltipArgs: {
            drawableText: {
                text: (entity, state) => {
                    const parent = state.getEntity(entity.childOf.parent);
                    if (!parent) return '';
                    const prices = parent.price.prices;
                    return `Level ${parent.level.level}, Upgrade for ${prices.water} water\n${prices.energy} energy`;
                }
            }
        }
    }
};
