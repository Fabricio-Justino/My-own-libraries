export default class VectorShapes {
    constructor(vector) {
        this.vector = vector;
    }

    rect(x, y, width, height) {
        return {
            pos: new this.vector(x, y),
            acc: new this.vector(0, 0),
            vel: new this.vector(0, 0),
            width: width,
            height: height,
            name: 'rect',

            applyForce(vectorForce) {
                this.acc.add(vectorForce);
            },

            update() {
                this.vel.add(this.acc);
                this.pos.add(this.vel);
                this.acc.set(0, 0);
            },
        };
    }

    circle(x, y, radius) {
        return {
            pos: new this.vector(x, y),
            acc: new this.vector(0, 0),
            vel: new this.vector(0, 0),
            radius: radius,
            name: 'circle',

            applyForce(vectorForce) {
                this.acc.add(vectorForce);
            },

            update() {
                this.vel.add(this.acc);
                this.pos.add(this.vel);
                this.acc.set(0, 0);
            },
        };
    }
}
