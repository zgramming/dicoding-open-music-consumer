const config = {
  mailer: {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  },
  rabbitmq: {
    RABBITMQ_SERVER: process.env.RABBITMQ_SERVER,
  },
};

const queueName = 'export:playlist';

module.exports = {
  config,
  queueName,
};
