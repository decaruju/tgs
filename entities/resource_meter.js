export default {
    drawableText: {
        color: "#FFFFFF",
        prefix: "",
        text: (entity) => Math.floor(entity.resourceMeter.resource/10),
    },
    position: {
        z: 10,
        x: 10,
        y: 30,
        transformed: false,
    },
    resourceMeter: {}
};
