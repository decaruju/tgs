export default function (object, property, value) {
    const properties = property.split('.');
    properties.slice(0, -1).reduce((target, key) => target[key], object)[properties[properties.length - 1]] = value;
}
