import State from './state.js';
import entity_factory from './entities/entity_factory.js';
import displaySquare from './systems/display_square.js';
import spinInCircles from './systems/spin_in_circles.js';
import clearCanvas from './systems/clear_canvas.js';
import addCellToTree from './utils/add_cell_to_tree.js';
import monkeyPatches from './monkey-patches.js';
import ClickObserver from './observers/click_observer.js';

const canvas = document.getElementById("main");
const state = new State(
    canvas,
    [
        clearCanvas,
        displaySquare,
        spinInCircles,
    ],
    [
        ClickObserver,
    ]
);

state.transform.center.y = -400;
state.transform.center.x = -600;

window.state = state;

(
    async () => {
        const ground = await state.buildEntity('ground');
        const sky = await state.buildEntity('sky');
        const sun = await state.buildEntity('sun');
        const potentialTree = await state.buildEntity('tree');
        const tree = await state.buildEntity('tree', { shadowEntity: { entity: potentialTree } });
        addCellToTree(state, tree.id, {x: 0, y: 0});
    }
)().then(() => {
    setInterval(state.tick.bind(state), 15);
});
