import State from './state.js';
import entity_factory from './entities/entity_factory.js';
import displaySquare from './systems/display_square.js';
import spinInCircles from './systems/spin_in_circles.js';
import calculateResource from './systems/calculate_resource.js';
import clearCanvas from './systems/clear_canvas.js';
import addCellToTree from './utils/add_cell_to_tree.js';
import monkeyPatches from './monkey-patches.js';
import callbackOnClick from './observers/callback_on_click.js';
import addTooltipOnHover from './observers/add_tooltip_on_hover.js';
import changePropertyOnHover from './observers/change_property_on_hover.js';
import removeOrphans from './systems/remove_orphans.js';
import destroyCells from './systems/destroy_cells.js';
import tickAnimations from './systems/tick_animations.js';

const canvas = document.getElementById("main");
const state = new State(
    canvas,
    [
        clearCanvas,
        displaySquare,
        spinInCircles,
        destroyCells,
        calculateResource,
        tickAnimations,
        removeOrphans,
    ],
    {
        click: [
            callbackOnClick,
        ],
        hover: [
            addTooltipOnHover,
            changePropertyOnHover
        ],
    }
);

state.transform.center.y = -400;
state.transform.center.x = -600;

function energyEarnPredicate(cell, tree) {
    const degree = tree.grid.degree(cell.position.gridPosition);
    if (degree > 1) return 0;

    return Math.pow(2, cell.level.level-1)/10.;
}
function energySpendPredicate(cell, tree) {
    if (cell.position.gridPosition().y == 0) return 0;
    return Math.pow(2, cell.level.level-1)/20;
}

function waterEarnPredicate(cell, tree) {
    if (cell.position.gridPosition().y < 0) return 0;
    return Math.pow(2, cell.level.level-1)/20;
}

function waterSpendPredicate(cell, tree) {
    if (cell.position.gridPosition().y == 0) return 0;
    return Math.pow(2, cell.level.level-1)/50;
}

window.state = state;

(
    async () => {
        const ground = await state.buildEntity('ground');
        const sky = await state.buildEntity('sky');
        const sun = await state.buildEntity('sun');
        const energy = await state.buildEntity('resource_meter', {
            resourceMeter: {
                earnPredicate: energyEarnPredicate,
                spendPredicate: energySpendPredicate,
                resource: 2500,
            },
            drawableText: {
                prefix: 'Energy: ',
            },
        });
        const water = await state.buildEntity('resource_meter', {
            resourceMeter: {
                earnPredicate: waterEarnPredicate,
                spendPredicate: waterSpendPredicate,
                resource: 250,
            },
            position: {
                x: 300,
            },
            drawableText: {
                prefix: 'Water: ',
            },
        });
        state.resources = { energy, water };
        const potentialTree = await state.buildEntity('tree');
        const tree = await state.buildEntity('tree', { shadowEntity: { entity: potentialTree } });
        state.trees = [tree];
        const cell = await addCellToTree(state, tree.id, {x: 0, y: 0}, {x: 0, y: 0});
        delete cell.changePropertyOnHover;
        delete cell.clickable;
        delete cell.tooltipOnHover;
    }
)().then(() => {
    setInterval(state.tick.bind(state), 15);
});
