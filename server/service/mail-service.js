const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "galichmsk1515@gmail.com",
        pass: "vreozfiqyiqgthww",
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: "galichmsk1515@gmail.com",
      to,
      subject: "Активация аккаунта на CONTEYENER",
      text: "",
      html: `
            <div>
                <h1>Для активации перейдите по ссылке</h1>
                <a href="${link}">${link}</a>
            </div>
            `,
    });
  }
}
module.exports = new MailService();