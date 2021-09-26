export default function (object, property) {
    return property.split('.').reduce((target, key) => target[key], object);
}
