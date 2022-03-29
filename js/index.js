import DrawWork from './DrawWork.js';
import Vector from './Vector.js';

//initialize DOMS elements
window.addEventListener('load', function load() {
    const $canvasDemostration = document.getElementById('canvas-demostration');

    const engine = DrawWork.createCanvas($canvasDemostration, null, null);
    const { width, height } = engine;
    const circle = {
        pos: new Vector(width / 2, height / 2),
        vel: new Vector(0, 1),
        acc: new Vector(0, 0.1),
        r: 50,
    };

    // cap vel and acc
    circle.acc.limit(4);
    circle.vel.limit(5);

    const gravity = new Vector(0, 0.01);

    // renderize objects using animationFrame
    engine.draw(loop);

    // callback to draw
    function loop() {
        engine.backGround(0, 0, 0);
        render(circle);
        update(circle);
    }

    // movement to object
    function update(circle) {
        circle.acc.add(gravity);
        applyDragForce(circle);
        circle.vel.add(circle.acc);
        circle.pos.add(circle.vel);
        rebound(circle);
    }

    // colision
    function rebound(circle) {
        let {
            r,
            pos: { y },
        } = circle;

        if (y >= height) {
            circle.vel.setMag(0.0001);
            circle.acc.setMag(0.0001);
        } else if (y + r >= height) {
            circle.vel.reverse();
        }
    }

    // appling drag force
    function applyDragForce({ vel, acc }) {
        let drag = vel.copy();
        drag.normalize();
        drag.reverse();

        let c = 0.001;
        let speed = vel.magSq();

        drag.setMag(c * speed);

        acc.add(drag);
    }

    function render({ r, pos: { x, y } }) {
        engine.strokedDot(x, y, r, 'white', 'red');
    }
});
