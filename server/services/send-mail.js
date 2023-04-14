const nodemailer = require('nodemailer');

class SendMail {
  constructor(userEmail) {
    this.from = 'sasha.korienko@gmail.com';
    this.password = 'gvleofojzslcvkap';
  }
  send(to, token, type) {
    const massageEmail = {};
    if (type === 'activate') {
      massageEmail.subject = 'Activate email Link - uevent.com';
      massageEmail.html = `
       <div>
            <p>
                Thank you for registering, for confirmation  email follow the
                    <a href="http://localhost:3000/confirm-email/${token}">
                    link
                    </a>
            </p>
        </div>
        `;
    } else {
      massageEmail.subject = 'Reset password link - uevent.com';
      massageEmail.html = `
        <div>
            <p>
                You requested for reset password, kindly use this to reset your password
                <a link href="http://localhost:3000/send-password-link/${token}">link</a>
            </p>
        </div>
        `;
    }
    const mail = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.from,
        pass: this.password,
      },
    });
    const mailOptions = {
      from: this.from,
      to,
      subject: massageEmail.subject,
      text: '',
      html: massageEmail.html,
    };
    mail.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}

module.exports = new SendMail();