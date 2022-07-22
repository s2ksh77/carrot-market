// import nodemailer from 'nodemailer';

// const smtpTransport = nodemailer.createTransport({
//   service: 'Naver',
//   host: 'smtp.naver.com',
//   port: 587,
//   auth: {
//     user: process.env.MAIL_ID,
//     password: process.env.MAIL_PASSWORD,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// export default smtpTransport;

const smtpTransport = () => {};

export default smtpTransport;
