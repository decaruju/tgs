export default function() {
    this.getEntities(['childOf']).forEach((entity) => {
        if (!this.getEntity(entity.childOf.parent)) {
            this.removeEntity(entity.id);
        }
    });
}
