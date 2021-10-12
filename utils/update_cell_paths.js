import PATHS from './cell_paths.js';

export default function(state, treeId) {
    const tree = state.getEntity(treeId);
    tree.grid.map((cell) => {
        const descriptor = tree.grid.neighborPositions(cell.position.gridPosition()).map((neighborPosition) => +tree.grid.hasCell(neighborPosition)).join('');
        cell.pathType = descriptor;
        Object.entries(PATHS[descriptor]).forEach(([pathName, path]) => {
            path.forEach((node, nodeIndex) => {
                cell.animation.animations.push({
                    property: `drawablePath.paths.${pathName}.${nodeIndex}.x`,
                    targetValue: node.x,
                    remainingTicks: 100,
                });
                cell.animation.animations.push({
                    property: `drawablePath.paths.${pathName}.${nodeIndex}.y`,
                    targetValue: node.y,
                    remainingTicks: 100,
                });
            });
        });
    });
}

