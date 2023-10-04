const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const {hash} = require("bcryptjs");
const nodemailer = require('nodemailer');
require("dotenv").config();

class PasswordTokenController {
  async create(req, res) {
    const { email } = req.body;
    console.log(process.env.EMAIL);
    console.log(process.env.EMAIL_PASSWORD)
    // Configuração do Nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Gere um token de redefinição de senha
    const token = crypto.randomBytes(20).toString("hex");
    const hashedToken = await bcrypt.hash(token, 10);

    // Insira o token no banco de dados
    await knex("passwordToken").insert({
      token: hashedToken,
      email,
    });

    // Envie um email com o token de redefinição de senha
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Calky - Recuperação de Senha",
      text: `Você solicitou a redefinição de senha. Use o seguinte token para redefinir sua senha: ${token}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error(error);
        throw new AppError(`Houve algum erro ao enviar o email.`, 500);
      } else {
        return res
          .status(200)
          .json(`Token de atualização de senha gerado com sucesso.`);
      }
    });
  }

  async update(req, res) {
    const { email, token, newPassword } = req.body;

    // Verifique se o token é válido
    const tokenRecord = await knex("passwordToken")
      .where("email", email)
      .orderBy("created_at", "desc")
      .first();

    if (!tokenRecord) {
      throw new AppError("Token Inválido!", 401);
    }

    // Verifique se o token não expirou (por exemplo, expira em 1 hora)
    const tokenExpirationTime = 60 * 60 * 1000; // 1 hora em milissegundos
    const tokenCreationTime = new Date(tokenRecord.created_at).getTime();
    const currentTime = new Date().getTime();

    if (currentTime - tokenCreationTime > tokenExpirationTime) {
        throw new AppError("Token expirado!", 401);
    }

    const isTokenValid = await bcrypt.compare(token, tokenRecord.token);

    if (isTokenValid) {
      const hashedPassword = await hash(newPassword, 8);

      await knex("users").where("email", email).update({
        password: hashedPassword,
      });

      // Limpe o token após a redefinição de senha
      await knex("passwordToken").where("id", tokenRecord.id).del();
      return res.status(200).json(`Senha atualizada com sucesso.`);
    } else {
      throw new AppError("Token Inválido e/ou expirado!", 401);
    }
  }
}

module.exports = PasswordTokenController;
