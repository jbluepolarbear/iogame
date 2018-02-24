const Vector = require('./vector');

class Polygon {
    constructor(points = []) {
        this.points = points;
        this.center = new Vector();
        this.radius = 0;
        this.calculateCenter();
        this.calculateRadius();
    }

    getPoints() { return this.points; }
    setPoints(value) {
        this.points = value;
        this.calculateCenter();
        this.calculateRadius();
    }

    calculateRadius() {
        let radius = 0;
        for (let point of this.points) {
            const distance = point.distance(this.center);
            if (distance > radius) {
                radius = distance;
            }
        }
        this.radius = radius;
    }

    calculateCenter() {
        let center = new Vector();
        for (let point of this.points) {
            center = center.add(point);
        }

        if (this.points.length > 0) {
            this.center = center.divideValue(this.points.length);
        }
    }
}

module.exports = Polygon;
