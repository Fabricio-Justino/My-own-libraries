/*import {
    Vector
} from "./Vector.js";*/

export class DrawWork {

    constructor(width = 600, height = 400, id) {
        this.width = width;
        this.height = height;
        this.canClearScreen = true;
        this.isStopped = false;
        this.canvas = null;
        this.context = null;
        this.callback = null;
        this.animationId = null;


        let c = null;
        if (id) {
            c = document.getElementById(id);
        } else {
            c = document.querySelector('canvas');
        }
        this.canvas = c;
        this.context = c.getContext('2d');
        c.width = this.width;
        c.height = this.height;
        c.style.maxWidth = this.width;
        c.style.maxHeight = this.height;
    }

    draw(callback) {
        this.callback = callback;
        this.loop();
    }

    loop() {
        const auxLoop = () => {
            if (auxLoop.__proto__.dIstance.canClearScreen) {
                auxLoop.__proto__.dIstance.clearScreen();
            }

            auxLoop.__proto__.dIstance.callback();

            if (!auxLoop.__proto__.dIstance.isStopped) {
                window.requestAnimationFrame(auxLoop);
            }
        };

        auxLoop.__proto__.dIstance = this;
        auxLoop();
    }

    stop() {
        this.isStopped = true;
        window.cancelAnimationFrame(this.animationId);
    }

    run() {
        this.isStopped = false;
        this.loop();
    }

    stopToClearScreen() {
        this.canClearScreen = false;
    }

    continueCleaningScreen() {
        this.canClearScreen = true;
    }

    fillTriangle(x0, y0, x1, y1, x2, y2, color = 'black') {
        const ctx = this.context;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x0, y0);
        this.setColor(color);
        ctx.fill();
        ctx.closePath();
    }

    triangle(x0, y0, x1, y1, x2, y2, strokeColor = 'black') {
        const ctx = this.context;

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x0, y0);
        this.strokeColor(strokeColor);
        ctx.stroke();
        ctx.closePath();
    }

    strokedTriangle(x0, y0, x1, y1, x2, y2, strokeColor = 'black', color = 'lightgrey') {
        this.triangle(x0, y0, x1, y1, x2, y2, strokeColor);
        this.fillTriangle(x0, y0, x1, y1, x2, y2, color);
    }

    fillRect(x, y, width, height, color = 'white') {
        this.setColor(color);
        this.context.fillRect(x, y, width, height);
    }

    rect(x, y, width, height, strokeColor = 'black') {
        this.context.strokeStyle = strokeColor;
        this.context.strokeRect(x, y, width, height);
    }

    strokedRect(x, y, width, height, color = 'white', strokeColor = 'black') {
        this.fillRect(x, y, width, height, color);
        this.rect(x, y, width, height, strokeColor);
    }

    dot(x, y, radius, color = 'white') {
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.closePath();
    }

    circle(x, y, radius, color = 'white') {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.closePath();
    }

    strokedDot(x, y, radius, color = 'white', strokeColor = 'black') {
        this.dot(x, y, radius, color);
        this.circle(x, y, radius, strokeColor);
    }

    backGround(red = 255, blue = 255, green = 255, alpha = 1.0) {
        alpha = (alpha < 0 || alpha > 1) ? 1.0 : alpha;
        const color = `rgba(${red},${green},${blue},${alpha})`;
        this.context.fillStyle = color;
        this.fillRect(0, 0, this.canvas.width, this.canvas.height, color);
    }

    clearScreen(bgColor = null) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = bgColor;
        if (bgColor)
            this.fillRect(0, 0, this.canvas.width, this.canvas.height, bgColor);
    }

    line(x0, y0, x1, y1) {
        this.context.beginPath();
        this.context.moveTo(x0, y0);
        this.context.lineTo(x1, y1);
        this.context.stroke();
        this.context.closePath();
    }

    filledLines(strokeColor = 'black', color = 'lightgrey', ...dots) {
        const ctx = this.context;
        ctx.beginPath();
        ctx.moveTo(dots[0].x, dots[0].y);
        dots.forEach(dot => ctx.lineTo(dot.x, dot.y));
        ctx.lineTo(dots[0].x, dots[0].y);
        this.setColor(color);
        this.strokeColor(strokeColor);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    lines(strokeColor = 'black', ...dots) {
        const ctx = this.context;
        ctx.beginPath();
        ctx.moveTo(dots[0].x, dots[0].y);
        dots.forEach(dot => ctx.lineTo(dot.x, dot.y));
        ctx.lineTo(dots[0].x, dots[0].y);
        this.strokeColor(strokeColor);
        ctx.stroke();
        ctx.closePath();
    }

    arrow(x0, y0, x1, y1, arrowWidth = 4, color = 'black') {
        const headlen = 10;
        const angle = Math.atan2(y1 - y0, x1 - x0);

        this.context.beginPath();
        this.strokeColor(color);
        this.strokeWeight(arrowWidth);

        this.context.beginPath();
        this.context.moveTo(x0, y0);
        this.context.lineTo(x1, y1);
        this.context.stroke();

        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x1 - headlen * Math.cos(angle - Math.PI / 7),
            y1 - headlen * Math.sin(angle - Math.PI / 7));

        this.context.lineTo(x1 - headlen * Math.cos(angle + Math.PI / 7),
            y1 - headlen * Math.sin(angle + Math.PI / 7));

        this.context.lineTo(x1, y1);
        this.context.lineTo(x1 - headlen * Math.cos(angle - Math.PI / 7),
            y1 - headlen * Math.sin(angle - Math.PI / 7));

        this.context.stroke();
        this.context.closePath();


    }

    setWidth(width) {
        this.width = width;
        this.canvas.width = width;
    }

    setHeight(height) {
        this.height = height;
        this.canvas.height = height;
    }

    setDimension(width, height) {
        this.setWidth(width);
        this.setHeight(height);
    }

    strokeWeight(weight) {
        this.context.lineWidth = weight;
    }

    strokeColor(color) {
        this.context.strokeStyle = color;
    }

    setColor(color) {
        this.context.fillStyle = color;
    }

    getContext() {
        return this.context;
    }

    getMidleOfScreen() {
        return {
            'x': this.width / 2,
            'y': this.height / 2
        };
    }

    getCanvas() {
        return this.canvas;
    }

    startRotate(x, y, width, height, radian) {
        const centerX = x + (width / 2);
        const centerY = y + (height / 2);
        this.context.translate(centerX, centerY);
        this.context.rotate(radian);
        this.context.translate(-centerX, -centerY);
    }

    startRotateAngle(x, y, width, height, angle) {
        angle = (angle * Math.PI) / 180;
        this.startRotate(x, y, width, height, angle);
    }

    endRotate() {
        this.context.resetTransform();
    }

    startScale(xScale, yScale) {
        this.context.scale(xScale, yScale);
    }

    endScale() {
        this.context.resetTransform();
    }

    // statics methods

    static pickSmoothRandom(valueMax, valueMin = 0, interval = 3) {
        const width = Math.floor(valueMin + (Math.random() * (valueMax - valueMin)));
        return {

            next() {
                const n = Math.floor((width - interval) + (Math.random() * ((width + interval) - (width - interval))));
                return n;
            }
        };
    }

    static random(minValue, MaxValue) {
        return Math.floor(minValue + Math.random() * (MaxValue - minValue));
    }
}
