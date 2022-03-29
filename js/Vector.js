export default class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.limitMax = 0;
        this.isLimited = false;
    }

    static create(x = 0, y = 0) {
        return new Vector(x, y);
    }

    static toDegree(radian) {
        return (radian * 180) / Math.PI;
    }

    static toRadian(angle) {
        return (angle * Math.PI) / 180;
    }

    static midlePoint(vector) {
        return new Vector(vector.x / 2, vector.y / 2);
    }

    static add(v, v2) {
        let temp = new Vector();
        temp.x = v.x + v2.x;
        temp.y = v.y + v2.y;
        return temp;
    }

    static sub(v, v2) {
        let temp = new Vector();
        temp.x = v.x - v2.x;
        temp.y = v.y - v2.y;
        return temp;
    }

    static mult(vec, num) {
        let temp = new Vector();
        temp.x = vec.x * num;
        temp.y = vec.y * num;
        return temp;
    }

    static normalize(vec) {
        if (vec.mag() > 0) {
            vec.mult(1 / this.mag());
        }
        return vec;
    }

    static setMag(vec, mag) {
        return vec.normalize().mult(mag);
    }

    static reverse(vec) {
        let temp = new Vector();
        temp.x = -vec.x;
        temp.y = -vec.y;

        return temp;
    }

    static createVectorByAngle(radian) {
        const v = new Vector(1, 0);
        v.setHeading(radian);
        return v;
    }

    midlePoint() {
        return new Vector(this.x / 2, this.y / 2);
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;

        this.validation();

        return this;
    }

    sub(vector) {
        this.x -= vector.x;
        this.y -= vector.y;

        this.validation();

        return this;
    }

    mult(escalar) {
        this.x *= escalar;
        this.y *= escalar;

        this.validation();

        return this;
    }

    div(escalar) {
        this.x /= escalar;
        this.y /= escalar;

        this.validation();

        return this;
    }

    mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    magSq() {
        return this.mag() ** 2;
    }

    setMag(value) {
        this.normalize().mult(value);
        return this;
    }

    dot(vector) {
        return vector.x * this.x + vector.y * this.y;
    }

    normalize() {
        let xn = this.x / this.mag();
        let yn = this.y / this.mag();
        this.x = xn;
        this.y = yn;
        return this;
    }

    heading() {
        return Math.atan2(this.y, this.x);
    }

    setHeading(radian) {
        let m = this.mag();
        this.x = m * Math.cos(radian);
        this.y = m * Math.sin(radian);

        this.validation();

        return this;
    }

    setHeadingAngle(angle) {
        return this.setHeading(Vector.toRadian(angle));
    }

    reverse() {
        this.x *= -1;
        this.y *= -1;
        return this;
    }

    rotateAngle(angle) {
        return this.rotate(Vector.toRadian(angle));
    }

    rotate(radian) {
        let newHeading = this.heading() + radian;
        let mag = this.mag();

        this.x = Math.cos(newHeading) * mag;
        this.y = Math.sin(newHeading) * mag;

        return this;
    }

    angleBetween(vector) {
        return Math.acos((this.dot(vector) / this.mag()) * vector.mag());
    }

    limit(limitValue) {
        this.isLimited = true;
        this.limitMax = limitValue;
    }

    unlimit() {
        this.isLimited = false;
        this.limitMax = 0;
    }

    validation() {
        const vali1 = this.isLimited;
        const m = Math.sqrt(this.x ** 2 + this.y ** 2);
        const vali2 = m > this.limitMax;
        if (vali1 && vali2) {
            this.x = (this.x / m) * this.limitMax;
            this.y = (this.y / m) * this.limitMax;
        }
    }
}
