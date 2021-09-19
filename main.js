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
import removeOrphans from './systems/remove_orphans.js';

const canvas = document.getElementById("main");
const state = new State(
    canvas,
    [
        clearCanvas,
        displaySquare,
        spinInCircles,
        calculateResource,
        removeOrphans,
    ],
    {
        click: [
            callbackOnClick,
        ],
        hover: [
            addTooltipOnHover,
        ],
    }
);

state.transform.center.y = -400;
state.transform.center.x = -600;

window.state = state;

(
    async () => {
        const ground = await state.buildEntity('ground');
        const sky = await state.buildEntity('sky');
        const sun = await state.buildEntity('sun');
        const energy = await state.buildEntity('resource_meter', {
            resourceMeter: {
                earnPredicate: (cell, tree) => +(tree.grid.degree(cell.position.gridPosition()) <= 1 && cell.position.y <= 0),
                spendPredicate: (cell, tree) => (cell.position.y != 0)/5,
                resource: 2500,
            },
            drawableText: {
                prefix: 'Energy: ',
            },
        });
        const water = await state.buildEntity('resource_meter', {
            resourceMeter: {
                earnPredicate: (cell, tree) => +(cell.position.y >= 0)/2,
                spendPredicate: (cell, tree) => (cell.position.y != 0)/5,
                resource: 2500,
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
        addCellToTree(state, tree.id, {x: 0, y: 0});
    }
)().then(() => {
    setInterval(state.tick.bind(state), 15);
});
