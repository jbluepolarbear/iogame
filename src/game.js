const Message = require('./message');

const ChatMessage = 'chat message';

class Game {
    constructor(io) {
        this.width = 1920;
        this.height = 1080; 
        this.io = io;
        this.running = true;
        this.clients = {};
        this.outMessages = [];
        this.inMessages = [];
        
        this.io.on('connection', (socket) => {
            this.addClient(socket);
            socket.on('disconnect', () => {
                this.removeClient(socket);
            });

            socket.on(ChatMessage, (msg) => {
                this.inMessages.push(new Message(socket, ChatMessage, msg));
            });
        });
    }

    addClient(client) {
        this.clients[client.id] = client;
        console.log(`New Client ${client.id} joined.`);
    }

    removeClient(client) {
        delete this.clients[client.id];
        console.log(`Client ${client.id} left.`);
    }

    processInMessages() {
        for (let message of this.inMessages) {
            if (message.msgType === ChatMessage) {
                console.log(message.msg);
            } else {
                console.log(JSON.stringify({ownerId: message.owner.id, message: message.msg}));
            }
        }
        this.inMessages = [];
    }

    processOutMessages() {
        for (let message of this.outMessages) {
            message.send();
        }
        this.outMessages = [];
    }

    update(dt) {
        this.processInMessages();
        this.deltaTime = dt;
        this.processOutMessages();
    }
}

module.exports = Game;