import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendEmail = (to: string): void => {
  const mailOptions = {
    from: 'Shyersoft Inc. <noreply.shyersoft@gmail.com>',
    replyTo: 'noreply.shyersoft@gmail.com',
    to: to,
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
