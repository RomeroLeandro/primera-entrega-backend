const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'your-email-service',
  auth: {
    user: 'your-email',
    pass: 'your-password',
  },
});

const sendPasswordResetEmail = (userEmail, resetToken) => {
  const mailOptions = {
    from: 'your-email',
    to: userEmail,
    subject: 'Recuperación de Contraseña',
    text: `Haz clic en el siguiente enlace para restablecer tu contraseña: 
      http://tu-sitio-web/reset-password?token=${resetToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo electrónico: ' + error);
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
    }
  });
};


module.exports = {sendPasswordResetEmail}