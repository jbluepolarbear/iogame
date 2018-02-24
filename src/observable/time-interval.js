class TimeInterval {
    constructor(interval, func) {
        this.interval = interval;
        this.func = func;
        this.canCall = true;
    }

    get func() {
        return (data) => {
            if (this.canCall) {
                this.canCall = false;
                this.func(data);
                setTimeout(function() {
                    this.canCall = true;
                }.bind(this), this.interval * 1000);
            }
        }
    }
}

module.exports = TimeInterval;