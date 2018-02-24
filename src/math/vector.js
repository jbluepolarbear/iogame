class Vector {
    constructor(x = 0.0, y = 0.0) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    subtract(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    addValue(value) {
        return new Vector(this.x + value, this.y + value);
    }

    subtractValue(value) {
        return new Vector(this.x - value, this.y - value);
    }

    multiplyValue(value) {
        return new Vector(this.x * value, this.y * value);
    }

    divideValue(value) {
        return new Vector(this.x / value, this.y / value);
    }

    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    normalized() {
        const magnitude = Math.sqrt(this.dot(this));
        return new Vector(this.x / magnitude, this.y / magnitude);
    }

    length() {
        return Math.sqrt(this.lengthSquared());
    }

    lengthSquared() {
        return this.dot(this);
    }

    distance(vector) {
        return Math.sqrt(this.distanceSquared(vector));
    }

    distanceSquared(vector) {
        const diff = this.subtract(vector);
        return diff.dot(diff);
    }

    project(vector) {
        return this.multiplyValue(vector.dot(this) / this.dot(this));
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    equals(vector) {
        return this.x === vector.x && this.y === vector.y;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    multiplyMatrix(matrix) {
        return new Vector(
            this.x * matrix.m11 + this.y * matrix.m12 + 1 * matrix.m13,
            this.x * matrix.m21 + this.y * matrix.m22 + 1 * matrix.m23
        );
    }
}

module.exports = Vector;
