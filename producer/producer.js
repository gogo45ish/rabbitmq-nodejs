const amqp = require('amqplib');
const config = require("./config")
const crypto = require("crypto");
class Producer {
    channel;

    async createChannel () {
        const connection  = await amqp.connect(config.rabbitMQ.url)
        this.channel = await connection.createChannel()
    }

    

    async publishMessage(message) {
        if (!this.channel) {
            await this.createChannel();
        }
        
        const replyQueue = "replies-" + crypto.randomBytes(5).toString("hex");

        await this.channel.assertQueue(replyQueue, {exclusive: true});

        this.channel.sendToQueue('InfoQueue', Buffer.from(JSON.stringify({
            message,
            replyTo: replyQueue  
        })));

        console.log(`Задания: ${message}, отправлено`);

        this.channel.consume(replyQueue, (msg) => {
            const response = JSON.parse(msg.content);
            console.log("Получен ответ:", response);
        }, {noAck: true});

    }
}

module.exports = Producer;