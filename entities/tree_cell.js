export default {
    animation: {},
    drawableRect: {
        width: 32,
        height: 32,
        color: "#00000000"
    },
    drawablePath: {
        color: "#905030",
        strokeColor: "#703010",
        paths: {
            SW: [
                {x: 16, y: 32},
                {x: 16, y: 32},
                {x: 16, y: 32},
            ],
            NW: [
                {x: 16, y: 32},
                {x: 16, y: 32},
                {x: 16, y: 32},
            ],
            NE: [
                {x: 16, y: 32},
                {x: 16, y: 32},
                {x: 16, y: 32},
            ],
            SE: [
                {x: 16, y: 32},
                {x: 16, y: 32},
                {x: 16, y: 32},
            ],
        },
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
    changePropertyOnHover: {
        property: 'drawablePath.color',
        falseValue: "#905030",
        trueValue: "#A09050",
    },
    level: {},
    inTree: {},
    // drawableText: {
    //     color: "#FFFFFF",
    //     prefix: "",
    //     offset: { x: 0, y: 30 },
    //     text: (entity) => entity.level.level,
    // },
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
