const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'davilucaoliveira5@gmail.com', // Seu email aqui
      pass: 'vwvkzpmjxxdsjfhi', // A senha de app gerada
    },
  });

async function sendEmail(subject, text) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'davilucaoliveira5@gmail.com', // Substitua pelo e-mail de teste
      subject,
      text,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email enviado:', info.response); // Adicione este log
    } catch (error) {
      console.error('Erro ao enviar email:', error.message); // Mensagem detalhada
    }
}

module.exports = sendEmail;
