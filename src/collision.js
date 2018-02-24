const Vector = require('./vector');

class Collision {
    static rectToRect(rect1, rect2) {
        const halfWidth1 = rect1.width / 2.0;
        const halfHeight1 = rect1.height / 2.0;
        const halfWidth2 = rect2.width / 2.0;
        const halfHeight2 = rect2.height / 2.0;

        let x1 = rect1.center.x;
        let x2 = rect2.center.x;
        if (x1 > x2) {
            const t = x1;
            x1 = x2;
            x2 = t;
        }

        let y1 = rect1.center.y;
        let y2 = rect2.center.y;
        if (y1 > y2) {
            const t = y1;
            y1 = y2;
            y2 = t;
        }

        if (x1 + halfWidth1 + halfWidth2 >= x2 &&
            y1 + halfHeight1 + halfHeight2 >= y2) {
            return true;
        }

        return false;
    }

    static pointToRect(position, rect) {
        const halfWidth = rect.width / 2.0;
        const halfHeight = rect.height / 2.0;

        let x1 = position.x;
        let x2 = rect.center.x;
        if (x1 > x2) {
            const t = x1;
            x1 = x2;
            x2 = t;
        }

        let y1 = position.y;
        let y2 = rect.center.y;
        if (y1 > y2) {
            const t = y1;
            y1 = y2;
            y2 = t;
        }

        if (x1 + halfWidth >= x2 &&
            y1 + halfHeight >= y2) {
            return true;
        }

        return false;
    }

    static circleToCircle(circle1, circle2) {
        const radius0 = circle1.radius * circle1.radius
        const radius1 = circle2.radius * circle2.radius
        if (circle1.center.subtract(circle2.center).lengthSquared() <= (radius0 + radius1)) {
            return true;
        }
        return false;
    }

    static pointToCircle(position, circle) {
        const radius = circle.radius * circle.radius
        if (position.subtract(circle.center).lengthSquared() <= (radius)) {
            return true;
        }
        return false;
    }

    // z component of cross product
    static sideOfVector(position, a, b) {
        return (b.x - a.x) * (position.y - a.y) - (b.y - a.y) * (position.x - a.x);
    }

    static pointToPolygon(point, polygon) {
        if (point.distance(polygon.center) > polygon.radius) {
            return false;
        }

        let lastCross = Math.sign(Collision.sideOfVector(point, polygon.points[polygon.points.length - 1], polygon.points[0]));
        if (lastCross === 0) {
            return true;
        }
    
        for (let i = 0; i < polygon.points.length - 1; ++i) {
            const currentCross = Collision.sideOfVector(point, polygon.points[i], polygon.points[i + 1]);
            if (currentCross === 0) {
                return true;
            }
    
            if (lastCross !== Math.sign(currentCross)) {
                return false;
            }
        }
        return true;
    }

    static circleToPolygon(circle, polygon) {
        if (!Collision.circleToCircle(circle, new Circle(polygon.center, polygon.radius))) {
            return false;
        }

        let lastCross = Math.sign(Collision.sideOfVector(circle.center, polygon.points[polygon.points.length - 1], polygon.points[0]));
        if (lastCross === 0) {
            return true;
        }
    
        for (let i = 0; i < polygon.points.length - 1; ++i) {
            const currentCross = Collision.sideOfVector(circle.center, polygon.points[i], polygon.points[i + 1]);
            if (currentCross === 0) {
                return true;
            }
    
            if (lastCross !== Math.sign(currentCross)) {
                {
                    const S = circle.center.subtract(polygon.points[i]);
                    const U = polygon.points[i + 1].subtract(polygon.points[i]);
                    const projectedVector = U.project(S);
                    const projectedPoint = polygon.points[i].add(projectedVector);
                    const distance = circle.center.distance(projectedPoint);
                    if (distance - circle.radius < 0) {
                        break;
                    }
                }
                {
                    const S = circle.center.subtract(polygon.points[polygon.points.length - 1]);
                    const U = polygon.points[0].subtract(polygon.points[polygon.points.length - 1]);
                    const projectedVector = U.project(S);
                    const projectedPoint = polygon.points[polygon.points.length - 1].add(projectedVector);
                    const distance = circle.center.distance(projectedPoint);
                    if (distance - circle.radius < 0) {
                        break;
                    }
                }
                return false;
            }
        }
    }
}

module.exports = Collision;
