const CELL_SIZE = 32;
const LEAF = {
    SW: [
        {x: 12, y: 32},
        {x: 8, y: 20},
        {x: 0, y: 16},
    ],
    NW: [
        {x: 0, y: 16},
        {x: 12, y: 12},
        {x: 16, y: 0},
    ],
    NE: [
        {x: 16, y: 0},
        {x: 20, y: 12},
        {x: 32, y: 16},
    ],
    SE: [
        {x: 32, y: 16},
        {x: 24, y: 20},
        {x: 20, y: 32},
    ],
};
const PIPE = {
    SW: [
        {x: 12, y: 32},
        {x: 10, y: 20},
        {x: 8, y: 16},
    ],
    NW: [
        {x: 8, y: 16},
        {x: 10, y: 12},
        {x: 12, y: 0},
    ],
    NE: [
        {x: 20, y: 0},
        {x: 22, y: 12},
        {x: 24, y: 16},
    ],
    SE: [
        {x: 24, y: 16},
        {x: 22, y: 20},
        {x: 20, y: 32},
    ],
};
const CORNER = {
    SW: [
        {x: 12, y: 32},
        {x: 10, y: 20},
        {x: 8, y: 16},
    ],
    NW: [
        {x: 8, y: 16},
        {x: 12, y: 12},
        {x: 16, y: 8},
    ],
    NE: [
        {x: 16, y: 8},
        {x: 22, y: 10},
        {x: 32, y: 12},
    ],
    SE: [
        {x: 32, y: 20},
        {x: 24, y: 24},
        {x: 20, y: 32},
    ],
};
const TEE = {
    SW: [
        {x: 12, y: 32},
        {x: 8, y: 24},
        {x: 0, y: 20},
    ],
    NW: [
        {x: 0, y: 12},
        {x: 12, y: 8},
        {x: 16, y: 4},
    ],
    NE: [
        {x: 16, y: 4},
        {x: 20, y: 8},
        {x: 32, y: 12},
    ],
    SE: [
        {x: 32, y: 20},
        {x: 24, y: 24},
        {x: 20, y: 32},
    ],
};
const EMPTY = {
    SW: [
        {x: 16, y: 32},
        {x: 14, y: 20},
        {x: 12, y: 16},
    ],
    NW: [
        {x: 12, y: 16},
        {x: 14, y: 12},
        {x: 16, y: 0},
    ],
    NE: [
        {x: 16, y: 0},
        {x: 18, y: 12},
        {x: 20, y: 16},
    ],
    SE: [
        {x: 20, y: 16},
        {x: 18, y: 20},
        {x: 16, y: 32},
    ],
};
const CROSS = {
    SW: [
        {x: 12, y: 32},
        {x: 8, y: 24},
        {x: 0, y: 20},
    ],
    NW: [
        {x: 0, y: 12},
        {x: 8, y: 8},
        {x: 12, y: 0},
    ],
    NE: [
        {x: 20, y: 0},
        {x: 24, y: 8},
        {x: 32, y: 12},
    ],
    SE: [
        {x: 32, y: 20},
        {x: 24, y: 24},
        {x: 20, y: 32},
    ],
};

function rotateCell(cell, degrees) {
    const radians = Math.PI * degrees / 180;
    const translatedX = cell.x - CELL_SIZE/2;
    const translatedY = cell.y - CELL_SIZE/2;
    return {
        x: (translatedX * Math.cos(radians) - translatedY * Math.sin(radians)) + CELL_SIZE/2,
        y: (translatedY * Math.cos(radians) + translatedX * Math.sin(radians)) + CELL_SIZE/2,
    };
}

const ROTATIONS = {
    'NW': 'NE',
    'NE': 'SE',
    'SE': 'SW',
    'SW': 'NW',
};

function rotatePathName(name, degrees) {
    if (degrees == 0) return name;
    return rotatePathName(ROTATIONS[name], degrees - 90);
}

function rotate(cells, degrees) {
    const rotatedPath = {};
    Object.keys(cells).forEach((pathName) => {
        rotatedPath[rotatePathName(pathName, degrees)] = cells[pathName].map((path) => rotateCell(path, degrees));
    });
    return rotatedPath;
}

export default {
    '0000': rotate(EMPTY, 0),
    '0001': rotate(LEAF, 90),
    '0010': rotate(LEAF, 270),
    '0100': rotate(LEAF, 180),
    '1000': rotate(LEAF, 0),
    '0011': rotate(PIPE, 90),
    '1100': rotate(PIPE, 0),
    '0110': rotate(CORNER, 270),
    '1001': rotate(CORNER, 90),
    '1010': rotate(CORNER, 0),
    '0101': rotate(CORNER, 180),
    '0111': rotate(TEE, 180),
    '1011': rotate(TEE, 0),
    '1101': rotate(TEE, 90),
    '1110': rotate(TEE, 270),
    '1111': rotate(CROSS, 0),
};
