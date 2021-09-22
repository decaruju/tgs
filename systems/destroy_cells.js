import removeCellFromTree from '../utils/remove_cell_from_tree.js';

export default function() {
    this.getEntities(["resourceMeter"]).forEach((resourceMeter) => {
        if (resourceMeter.resourceMeter.resource < 0) {
            const cellToRemove = Object.values(this.trees[0].grid.grid).filter((cell) => {
                const tree = this.getEntity(cell.inTree.treeId);
                return tree.grid.degree(cell.position.gridPosition()) == 1 && cell.position.gridPosition().y !=0;
            })[0];
            removeCellFromTree(cellToRemove, this);
            this.resources.water.resourceMeter.resource += cellToRemove.price.prices.water;
            this.resources.energy.resourceMeter.resource += cellToRemove.price.prices.energy;
        }
    });
}
