const AppError = require("../utils/AppError");
const nodemailer = require("nodemailer");
const { promisify } = require('util');
require("dotenv").config();

class ContactController {
  async create(req, res) {
    const { email, sugest } = req.body;
    // Configuração do Nodemailer

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: "higorturetta@hotmail.com",
      subject: "Calky - Recebemos uma Sugestão!",
      text: `Olá,
      
      Temos boas notícias! Recebemos uma nova sugestão de um de nossos usuários. Aqui estão os detalhes:
      
      Remetente: ${email}
      Sugestão:
      ${sugest}
      
`,
    };

    const sendMail = promisify(transporter.sendMail.bind(transporter));

    try {
      await sendMail(mailOptions);
      return res.status(200).json(`Email enviado com sucesso.`);
    } catch (error) {
      console.error(error);
      next(new AppError(`Houve algum erro ao enviar o email.`, 500));
    }
  }
}

module.exports = ContactController;
