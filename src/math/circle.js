const Vector = require('./vector');

class Circle {
    constructor(center = new Vector(), radius = 0) {
        this.center = center;
        this.radius = radius;
    }
}

module.exports = Circle;
