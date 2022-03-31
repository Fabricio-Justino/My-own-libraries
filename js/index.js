import DrawWork from './DrawWork.js';
import { Shapes } from './DrawWork.js';
import Vector from './Vector.js';
import Effects from './Effects.js';

//initialize DOMS elements
window.addEventListener('load', function load() {
    canvasAnimation();

    const $nav = Effects.$('nav.navigator');

    //$nav.slideDown();

    setTimeout(() => {
        $nav.slideUp();
    }, 2000);
});

function canvasAnimation() {
    const $canvasDemostration = document.getElementById('canvas-demostration');

    const engine = DrawWork.createCanvas($canvasDemostration, null, null);
   
    const { width, height } = engine;

    // cap vel and acc
    const circle = Shapes.vectorCircle(width / 2, 20, 20);

    const gravity = new Vector(0, 0.1);

    // renderize objects using animationFrame
    engine.draw(loop);

    // callback to draw
    function loop() {
        engine.backGround(0, 0, 0);
        engine.renderVectorCirlce(circle, 'white', 'red');
        update(circle);
    }

    // movement to object
    function update(circle) {
        circle.applyForce(gravity);
        circle.applyForce(dragForce(circle.vel.copy(), 0.001));
        circle.applyForce(windForce(circle));
        circle.update();
        rebound(circle);
    }

    // colision
    function rebound(circle) {
        let {
            radius: r,
            pos: { y, x },
        } = circle;

        if (y + r >= height) {
            circle.pos.y = height - r;
            circle.vel.y *= -1;
        }

        if (y - r <= 0) {
            circle.pos.y = r;
            circle.vel.y *= -1;
        } 

        if(x + r >= width){
            circle.pos.x = width-r;
            circle.vel.x *= -1; 
        }

        if(x - r <= 0) {
            circle.pos.x = r;
            circle.vel.x *= -1;
        }
    }

    // appling drag force
    function dragForce(vectorSpeed, airResistence = 0.1) {
        let drag = vectorSpeed.copy();
        drag.normalize();
        drag.reverse();

        let c = airResistence;
        let speed = vectorSpeed.magSq();

        drag.setMag(c * speed);

        return drag;
    }

    //aplling wind force
    function windForce({pos}) {
        const v = new Vector();
        if(engine.mouseIsPressed) {
            const mousePos = new Vector(engine.mouseX, engine.mouseY);
            const pointer = Vector.sub(mousePos, pos);
            pointer.setMag(1);
            v.add(pointer);
        }

        return v;
    }
}