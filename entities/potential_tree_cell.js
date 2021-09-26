export default {
    drawableRect: {
        color: "#005030",
        width: 30,
        height: 30,
        filled: false,
    },
    position: {
        z: 1,
    },
    inTree: {},
    clickable: {},
    price: {
        prices: {
            water: 50,
            energy: 100,
        },
    },
    changePropertyOnHover: {
        property: 'drawableRect.color',
        falseValue: "#005030",
        trueValue: "#00F0A0",
    },
    tooltipOnHover: {
        tooltipArgs: {
            drawableText: {
                text: (entity, state) => {
                    const parent = state.getEntity(entity.childOf.parent);
                    if (!parent) return '';
                    const prices = parent.price.prices;
                    return `Buy new cell for ${prices.water} water\n${prices.energy} energy`;
                }
            }
        }
    }
};
