import Entity from './entity.js';

export default async function(entity_name, args={}) {
    const entity_specs = (await import(`./${entity_name}.js`)).default;

    const entity = new Entity();

    await Promise.all(
        Object.keys(entity_specs).map(async(component_name) => {
            const component_class = (await import(`../components/${component_name}.js`)).default;
            entity[component_name] = new component_class({...entity_specs[component_name], ...args[component_name]});
        })
    );
    return entity;
}
