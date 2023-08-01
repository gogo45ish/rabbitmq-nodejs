const amqp = require("amqplib");

async function consumeMessages(){
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel();

    await channel.assertExchange('logExchange', 'direct')

    const q = await channel.assertQueue("InfoQueue");

    await channel.bindQueue(q.queue, "logExchange", "Info")

    channel.consume("InfoQueue", async (msg) => {
        const data = JSON.parse(msg.content);

        const response = await processMessage(data.message);

        channel.sendToQueue(
            data.replyTo,
            Buffer.from(JSON.stringify(response))
        );

        channel.ack(msg);
    });

    
}

async function processMessage(message) {
  // Simulate processing
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    response: "Message processed",
  };
}

consumeMessages();