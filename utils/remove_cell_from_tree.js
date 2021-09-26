import entity_factory from '../entities/entity_factory.js';
import addCellToTree from './add_cell_to_tree.js';
import updateCellPaths from './update_cell_paths.js';

async function removeCellFromTree(cell, state) {
    const position = cell.position.gridPosition();
    const tree = state.getEntity(cell.inTree.treeId);
    tree.grid.remove(position);
    state.removeEntity(cell.id);
    tree.grid.neighborPositions(position).forEach((neighborPosition) => {
        const entity = tree.shadowEntity.entity.grid.remove(neighborPosition);
        if (entity) state.removeEntity(entity.id);
    });
    const potentialTreeCell = await state.buildEntity(
        'potential_tree_cell',
        {
            position: {
                x: position.x*32,
                y: position.y*32,
            },
            inTree: {
                treeId: tree.id,
            },
        },
    );
    tree.shadowEntity.entity.grid.index(potentialTreeCell, position);
    potentialTreeCell.clickable.callback = () => {
        const prices = potentialTreeCell.price.prices;
        if (state.resources.energy.resourceMeter.resource < prices.energy || state.resources.water.resourceMeter.resource < prices.water) {
            return;
        }
        state.resources.energy.resourceMeter.resource -= prices.energy;
        state.resources.water.resourceMeter.resource -= prices.water;
        state.removeEntity(potentialTreeCell.id);
        tree.shadowEntity.entity.grid.remove(position);
        tree.shadowEntity.entity.grid.neighbors(position).forEach((entity) => {
            state.removeEntity(entity.id);
        });
        addCellToTree(state, tree.id, position);
    };
    updateCellPaths(state, tree.id);
}

export default removeCellFromTree;
