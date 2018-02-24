class Message {
    constructor(owner, msgType, msg) {
        this.owner = owner;
        this.msgType = msgType;
        this.msg = msg;
    }

    send() {
        this.owner.emit(this.msgType, this.msg);
    }
}

module.exports = Message;
