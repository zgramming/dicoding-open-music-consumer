require('dotenv').config();
const amqp = require('amqplib');
const PlaylistService = require('./service/PlaylistService');
const MailSenderService = require('./service/MailSenderService');
const ListenerService = require('./service/ListenerService');

const { config, queueName } = require('./utils/constant');

const init = async () => {
  const playlistService = new PlaylistService();
  const mailSenderService = new MailSenderService();
  const listenerService = new ListenerService({
    mailSenderService,
    playlistService,
  });

  const connection = await amqp.connect(config.rabbitmq.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, {
    durable: true,
  });

  channel.consume(queueName, listenerService.listen, {
    noAck: true,
  });

  channel.on('close', () => {
    console.log('Consumer ditutup');
  });

  channel.on('error', (error) => {
    console.error({
      error,
      context: 'Error On Channel RabbitMQ Consumer',
    });
  });

  console.log(`Consumer berjalan pada ${queueName}`);
};

init();
