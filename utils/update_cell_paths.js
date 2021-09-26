const PATHS = {
    '0000': [
        [
            {x: 4, y: 0},
            {x: 4, y: 16},
            {x: 4, y: 32},
        ],
        [
            {x: 28, y: 0},
            {x: 28, y: 16},
            {x: 28, y: 32},
        ],
    ],
    '0001': [
        [
            {x: 0, y: 4},
            {x: 14, y: 10},
            {x: 28, y: 16},
        ],
        [
            {x: 0, y: 28},
            {x: 14, y: 22},
            {x: 28, y: 16},
        ],
    ],
    '0010': [
        [
            {x: 0, y: 16},
            {x: 14, y: 10},
            {x: 28, y: 4},
        ],
        [
            {x: 0, y: 16},
            {x: 14, y: 10},
            {x: 28, y: 28},
        ],
    ],
    '0100': [
        [
            {x: 4, y: 0},
            {x: 10, y: 16},
            {x: 16, y: 32},
        ],
        [
            {x: 28, y: 0},
            {x: 22, y: 16},
            {x: 16, y: 32},
        ],
    ],
    '1000': [
        [
            {x: 16, y: 0},
            {x: 10, y: 16},
            {x: 4, y: 32},
        ],
        [
            {x: 16, y: 0},
            {x: 22, y: 16},
            {x: 28, y: 32},
        ],
    ],
    '1010': [
        [
            {x: 32, y: 4},
            {x: 4, y: 4},
            {x: 4, y: 28},
        ],
        [
            {x: 28, y: 32},
            {x: 28, y: 28},
            {x: 32, y: 28},
        ],
    ],
    '1100' : [
        [
            {x: 4, y: 0},
            {x: 4, y: 16},
            {x: 4, y: 32},
        ],
        [
            {x: 28, y: 0},
            {x: 28, y: 16},
            {x: 28, y: 32},
        ],
    ]
};
export default function(state, treeId) {
    const tree = state.getEntity(treeId);
    tree.grid.map((cell) => {
        const descriptor = tree.grid.neighborPositions(cell.position.gridPosition()).map((neighborPosition) => +tree.grid.hasCell(neighborPosition)).join('');
        (PATHS[descriptor] || []).forEach((path, pathIndex) => {
            path.forEach((node, nodeIndex) => {
                cell.animation.animations.push({
                    property: `drawablePath.paths.${pathIndex}.${nodeIndex}.x`,
                    targetValue: node.x,
                    remainingTicks: 100,
                });
                cell.animation.animations.push({
                    property: `drawablePath.paths.${pathIndex}.${nodeIndex}.y`,
                    targetValue: node.y,
                    remainingTicks: 100,
                });
            });
        });
    });
}

