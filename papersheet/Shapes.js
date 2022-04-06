export default class Shape {
    constructor() {
        this.__proto__.concat = (...strings) => {
            return strings.reduce((result, next) => result + next);
        };
    }

    circleTocircle(shape, otherShape) {
        // make the diference between x0 and x1 then squere it
        const sq = (x0, x1) => (x0 - x1) ** 2;

        const CENTER_DISTANCE = Math.sqrt(
            sq(shape.x, otherShape.x) + sq(shape.y, otherShape.y)
        );
        const SUM_OF_RADIUS = shape.radius + otherShape.radius;

        return CENTER_DISTANCE - SUM_OF_RADIUS <= 0;
    }

    rectTorect(shape, otherShape) {
        // C = collision {R: Right, L: left, U: up, D: down}
        const CR = otherShape.x <= shape.x + shape.width;
        const CL = otherShape.x + otherShape.width >= shape.x;
        const CU = otherShape.y + otherShape.height >= shape.y;
        const CD = otherShape.y < shape.y + shape.height;
        // hasColision = CR && CL && CU && CD
        const hasColision = [CR, CL, CU, CD].reduce(
            (hasColision, next) => hasColision && next
        );
        return hasColision;
    }

    rect(x, y, width, height) {
        return {
            x: x,
            y: y,
            width: width,
            height: height,
            name: 'rect',
        };
    }

    circle(x, y, radius) {
        return {
            x: x,
            y: y,
            radius: radius,
            name: 'circle',
        };
    }

    isColliding(shape, otherShape) {
        if ('name' in shape && 'name' in otherShape) {
            if (this.concat(shape.name, 'To', otherShape.name) in this) {
                return this[this.concat(shape.name, 'To', otherShape.name)](
                    shape,
                    otherShape
                );
            }

            if (this.concat(otherShape.name, 'To', shape.name) in this) {
                return this[this.concat(otherShape.name, 'To', shape.name)](
                    shape,
                    otherShape
                );
            }
        }
    }
}
