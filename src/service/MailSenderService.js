const nodeMailer = require('nodemailer');
const { config } = require('../utils/constant');

class MailSenderService {
  constructor() {
    this.transporter = nodeMailer.createTransport({
      host: config.mailer.SMTP_HOST,
      port: config.mailer.SMTP_PORT,
      auth: {
        user: config.mailer.SMTP_USER,
        pass: config.mailer.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(targetEmail, content) {
    try {
      const message = {
        from: 'Open Music Apps',
        to: targetEmail,
        subject: 'Ekspor Playlist',
        text: 'Terlampir hasil dari ekspor playlist',
        attachments: [
          {
            filename: 'playlist.json',
            content,
          },
        ],
      };

      const result = await this.transporter.sendMail(message);
      console.log('MailSenderService.sendEmail', result);

      return result;
    } catch (error) {
      console.error({
        error,
        context: 'MailSenderService.sendEmail',
      });
    }
  }
}

module.exports = MailSenderService;
