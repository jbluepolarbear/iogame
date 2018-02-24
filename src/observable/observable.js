const Subscription = require('./subscription');

class Observable {
    constructor() {
        this.functionMap = new Map();
        this.subscriptionId = 0;
    }

    subscribe(func) {
        const subscriptionId = ++this.subscriptionId;
        this.functionMap.set(subscriptionId, func);
        return new Subscription(this, subscriptionId);
    }

    unsubscribe(subscriptionId) {
        this.functionMap.remove(subscriptionId);
    }

    next(value) {
        for (let func of this.functionMap.values()) {
            func(value);
        }
    }
}

module.exports = Observable;
