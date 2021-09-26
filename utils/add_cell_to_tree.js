import entity_factory from '../entities/entity_factory.js';
import updateCellPaths from './update_cell_paths.js';

async function addCellToTree(state, treeId, position) {
    const treeCell = await state.buildEntity(
        'tree_cell',
        {
            position: {
                x: position.x*32,
                y: position.y*32,
            },
            inTree: {
                treeId,
            },
        },
    );
    const tree = state.getEntity(treeId);
    tree.grid.index(treeCell, position);
    await Promise.all(
        tree.grid.neighborPositions(position).map(async(neighborPosition) => {
        if (tree.grid.degree(neighborPosition) == 1 && neighborPosition.y != 0) {
            const potentialTreeCell = await state.buildEntity(
                'potential_tree_cell',
                {
                    position: {
                        x: neighborPosition.x*32,
                        y: neighborPosition.y*32,
                    },
                    inTree: {
                        treeId,
                    },
                },
            );
            tree.shadowEntity.entity.grid.index(potentialTreeCell, neighborPosition);
            potentialTreeCell.clickable.callback = () => {
                const prices = potentialTreeCell.price.prices;
                if (state.resources.energy.resourceMeter.resource < prices.energy || state.resources.water.resourceMeter.resource < prices.water) {
                    return;
                }
                state.resources.energy.resourceMeter.resource -= prices.energy;
                state.resources.water.resourceMeter.resource -= prices.water;
                state.removeEntity(potentialTreeCell.id);
                tree.shadowEntity.entity.grid.remove(neighborPosition);
                tree.shadowEntity.entity.grid.neighbors(neighborPosition).forEach((entity) => {
                    state.removeEntity(entity.id);
                });
                addCellToTree(state, treeId, neighborPosition);
            };
        }
        })
    );
    updateCellPaths(state, treeId);

    return treeCell;
}

export default addCellToTree;
