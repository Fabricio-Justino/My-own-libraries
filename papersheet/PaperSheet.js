import Pencil from './Pencil.js';
import Vector from './Vector.js';
import Shapes from './Shapes.js';
import VectorShapes from './VectorShapes.js';

export default class PaperSheet {
    static Vector = Vector;
    static Shapes = Shapes;
    static VectorShapes = new VectorShapes(Vector);
    constructor(width = 600, height = 400, canvasId) {
        this.pencil = new Pencil(width, height, canvasId);
    }

    // statics methods

    static pickSmoothRandom(valueMax, valueMin = 0, interval = 3) {
        const width = Math.floor(
            valueMin + Math.random() * (valueMax - valueMin)
        );
        return function next() {
            const n = Math.floor(
                width -
                    interval +
                    Math.random() * (width + interval - (width - interval))
            );
            return n;
        };
    }

    static random(minValue, MaxValue) {
        return Math.floor(minValue + Math.random() * (MaxValue - minValue));
    }

    static createPencil(width = 600, height = 400, id) {
        return new PaperSheet(width, height, id);
    }

    static createCanvas(DOMElementFather, width, height, id = 'canvas') {
        if (!DOMElementFather) {
            DOMElementFather = document.querySelector('body');
        }

        if (!width && !height) {
            width = DOMElementFather.clientWidth;
            height = DOMElementFather.clientHeight;
        }

        const canvas = document.createElement('canvas');
        DOMElementFather.appendChild(canvas);
        canvas.id = id;
        return new PaperSheet(width, height, id);
    }

    static createVector(x = 0, y = 0) {
        return new Vector(x, y);
    }
}
