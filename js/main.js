import Effects from '../domquery/Effects.js';
import PaperSheet from '../papersheet/PaperSheet.js';

//initialize DOMS elements
window.addEventListener('load', function load() {
    const $itens = Effects.$('.slide-accordion-item');
    Effects.$('.slide-accordion').click((e) => {
        const node = e.target.parentNode;
        $itens.getNodeList().forEach((el, index) => {
            if (node === el.parentNode) {
                $itens.get(index).slideToggle();
            }
        });
    }, true);

    Effects.$('#fade-test').click(() => {
        Effects.$('.fadeIn-image').fadeToggle();
    }, true);

    const $dinamic = Effects.$('.dinamic-style');
    $dinamic
        .getChildren()
        .getList()
        .forEach((el) => {
            el.css({
                backgroundColor: el.attr('color'),
                paddingTop: '15px',
                paddingBottom: '15px',
                textAlign: 'center',
                color: 'white',
                width: '50%',
                position: 'relative',
                left: '50%',
                transform: 'translateX(-50%)',
                border: '1px dashed black',
                marginTop: '5px',
                textTransform: 'capitalize',
            });
        });

    const $dragZones = Effects.$('.drag-zone');
    const $dragItens = Effects.$('.drag-item');

    const cssAvaliableDragsZones = {
        backgroundColor: 'rgb(142, 138, 106)',
        transition: '0.5s'
    };

    const cssEndDrag ={
        backgroundColor: 'rgb(142, 128, 106)',
    };
    const cssStyleEnter = {
        backgroundColor: 'rgba(0, 200, 0, 0.4)'
    };

    $dragItens.drag($dragZones, cssAvaliableDragsZones, cssEndDrag, cssStyleEnter, cssAvaliableDragsZones);

    try {
        canvasAnimation();
    } catch (e) {
        console.error(e);
    }
});

function canvasAnimation() {
    const $canvasDemostration = document.getElementById('canvas-demostration');

    const paper = PaperSheet.createCanvas($canvasDemostration, null, null);

    const engine = paper.pencil;
    const { width, height } = engine;

    const circle = PaperSheet.VectorShapes.circle(width / 2, 20, 20);

    const gravity = PaperSheet.createVector(0, 0.9);

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

        if (x + r >= width) {
            circle.pos.x = width - r;
            circle.vel.x *= -1;
        }

        if (x - r <= 0) {
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
    function windForce({ pos }) {
        const v = PaperSheet.createVector();
        if (engine.mouseIsPressed) {
            const mousePos = PaperSheet.createVector(
                engine.mouseX,
                engine.mouseY
            );
            const pointer = PaperSheet.Vector.sub(mousePos, pos);
            const mag = pointer.mag();
            pointer.normalize().mult(mag * 0.009);
            v.add(pointer);
        }

        return v;
    }
}
