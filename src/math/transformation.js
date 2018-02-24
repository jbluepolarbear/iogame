const Vector = require('./vector');
const Matrix = require('./matrix');

class Transformation {
    constructor(width = 0.0, height = 0.0) {
        this.__rotation = 0.0;
        this.__position = new Vector(0.0, 0.0);
        this.__scale = new Vector(1.0, 1.0);
        this.__anchor = new Vector(0.5, 0.5);
        this.__width = width;
        this.__height = height;
    }

    get rotation() { return this.__rotation; }
    set rotation(value) {
        const pi2 = Math.PI * 2.0;
        if (value > pi2) {
            value = value - pi2;
        } else if (value < -pi2) {
            value = -pi2 - value;
        }
        this.__rotation = value;
    }

    get position() { return this.__position; }
    set position(value) {
        this.__position = value;
    }

    get scale() { return this.__scale; }
    set scale(value) {
        this.__scale = value;
    }

    get anchor() { return this.__anchor; }
    set anchor(value) {
        this.__anchor = value;
    }

    get width() { return this.__width; }
    set width(value) {
        this.__width = value;
    }

    get height() { return this.__height; }
    set height(value) {
        this.__height = value;
    }

    build() {
        const rot = Matrix.rotate(this.__rotation);
        const scl = Matrix.scale(this.__scale.x, this.__scale.y);
        const pos = Matrix.translate(this.__position.x, this.__position.y);
        const ctr = Matrix.translate(-this.__width * this.__anchor.x, -this.__height * this.__anchor.y);
        
        return pos.multiply(rot).multiply(scl).multiply(ctr);
    }
}

module.exports = Transformation;
