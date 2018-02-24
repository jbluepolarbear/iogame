class Matrix {
    constructor(m11 = 1, m12 = 0, m13 = 0,
                m21 = 0, m22 = 1, m23 = 0,
                m31 = 0, m32 = 0, m33 = 1) {
        this.m11 = m11;
        this.m12 = m12;
        this.m13 = m13;
        this.m21 = m21;
        this.m22 = m22;
        this.m23 = m23;
        this.m31 = m31;
        this.m32 = m32;
        this.m33 = m33;
    }

    multiply(matrix) {
        return new Matrix(
            this.m11  * matrix.m11 + this.m12  * matrix.m21 + this.m13  * matrix.m31,
            this.m11  * matrix.m12 + this.m12  * matrix.m22 + this.m13  * matrix.m32,
            this.m11  * matrix.m13 + this.m12  * matrix.m23 + this.m13  * matrix.m33,
            this.m21  * matrix.m11 + this.m22  * matrix.m21 + this.m23  * matrix.m31,
            this.m21  * matrix.m12 + this.m22  * matrix.m22 + this.m23  * matrix.m32,
            this.m21  * matrix.m13 + this.m22  * matrix.m23 + this.m23  * matrix.m33,
            this.m31  * matrix.m11 + this.m32  * matrix.m21 + this.m33  * matrix.m31,
            this.m31  * matrix.m12 + this.m32  * matrix.m22 + this.m33  * matrix.m32,
            this.m31  * matrix.m13 + this.m32  * matrix.m23 + this.m33  * matrix.m33
        );
    }

    add(matrix) {
        return new Matrix(
            this.m11 + matrix.m11, this.m12 + matrix.m12, this.m13 + matrix.m13,
            this.m21 + matrix.m21, this.m22 + matrix.m22, this.m23 + matrix.m23,
            this.m31 + matrix.m31, this.m32 + matrix.m32, this.m33 + matrix.m33
        );
    }

    set(matrix) {
        this.m11 = matrix.m11;
        this.m12 = matrix.m12;
        this.m13 = matrix.m13;
        this.m21 = matrix.m21;
        this.m22 = matrix.m22;
        this.m23 = matrix.m23;
        this.m31 = matrix.m31;
        this.m32 = matrix.m32;
        this.m33 = matrix.m33;
    }

    setIdentity(matrix) {
        this.m11 = 1;
        this.m12 = 0;
        this.m13 = 0;
        this.m21 = 0;
        this.m22 = 1;
        this.m23 = 0;
        this.m31 = 0;
        this.m32 = 0;
        this.m33 = 1;
    }

    transpose() {
        return new Matrix(
            this.m11, this.m21, this.m31,
            this.m12, this.m22, this.m32,
            this.m13, this.m23, this.m33
        );
    }

    static identity() {
        return new Matrix(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        );
    }

    static translate(x, y) {
        return new Matrix(
            1, 0, x,
            0, 1, y,
            0, 0, 1
        );
    }

    static scale(x, y) {
        return new Matrix(
            x, 0, 0,
            0, y, 0,
            0, 0, 1
        );
    }

    static rotate(radians) {
        return new Matrix(
            Math.cos(radians), -Math.sin(radians), 0.0,
            Math.sin(radians), Math.cos(radians), 0.0,
            0, 0, 1
        );
    }
}

module.exports = Matrix;
