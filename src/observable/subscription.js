class Subscription {
    constructor(observable, subscriptionId) {
        this.obersvable = observable;
        this.subscriptionId = subscriptionId;
    }

    unsubscribe() {
        this.obersvable.unsubscribe(this.subscriptionId);
    }
}

module.exports = Subscription;
