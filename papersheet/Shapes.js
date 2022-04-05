export default class Shape {
    static rect(x, y, width, height) {
        return {
            'x': x,
            'y': y,
            'width': width,
            'height': height,
            'name': 'rect'
        };
    }

    static circle(x, y, radius) {
        return {
            'x': x,
            'y': y,
            'radius': radius,
            'name': 'circle'
        };
    }
}
