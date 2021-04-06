import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shyersoft@gmail.com',
    pass: 'xQ91GGNcy',
  },
});

export const sendEmail = (to: string): void => {
  const mailOptions = {
    from: 'Shyersoft Inc. <noreply.shyersoft@gmail.com>',
    replyTo: 'noreply.shyersoft@gmail.com',
    to: 'andrewostin13@gmail.com',
    subject: 'Your verification code',
    html: `
    <p>Your verification code is: </p>
    <h1>${Math.random()}</h1>
    `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
