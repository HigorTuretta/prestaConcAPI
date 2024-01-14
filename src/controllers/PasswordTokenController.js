const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { compare } = require("bcryptjs");
const { hash } = require("bcryptjs");
const nodemailer = require("nodemailer");
require("dotenv").config();

class PasswordTokenController {
  async create(req, res) {
    const { email, created_at } = req.body;
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

    // Insira o token no banco de dados
    await knex("passwordToken").insert({
      token: token,
      email,
      created_at,
    });

    // Envie um email com o token de redefinição de senha
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Calky - Recuperação de Senha",
      text: `Prezado(a) usuário(a),
    
    Recebemos uma solicitação para redefinir a senha da sua conta no Calky. Para prosseguir com a redefinição, por favor, utilize o token abaixo:
    
    Token de Redefinição: ${token}
    
    Se você não solicitou a redefinição de senha, por favor, ignore este e-mail ou entre em contato conosco para garantir a segurança da sua conta.
    
    Atenciosamente,
    Equipe Calky`
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

  async show(req, res) {
    const { email, token } = req.body;
    // Verifique se o token é válido
    const tokenRecord = await knex("passwordToken").where({ email }).first();

    if (!tokenRecord) {
      throw new AppError("Token Inválido!", 401);
    }

    // Verifique se o token não expirou (por exemplo, expira em 1 hora)
    const tokenExpirationTime = 60 * 60 * 1000; // 1 hora em milissegundos
    const tokenCreationTime = new Date(tokenRecord.created_at).getTime();
    const currentTime = new Date().getTime();

    if (currentTime - tokenCreationTime > tokenExpirationTime) {
      await knex("passwordToken").where("id", tokenRecord.id).del();
      throw new AppError("Token expirado!", 401);
    }

    const isTokenValid = tokenRecord.token == token ? true : false;

    if (isTokenValid) {
      return res.status(200).json(`Token válido.`);
    } else {
      throw new AppError("Token inválido!", 401);
    }
  }

  async update(req, res) {
    const { token, newPassword } = req.body;
    const { email } = req.params;

    // Verifique se o token é válido
    const tokenRecord = await knex("passwordToken")
      .where("email", email)
      .first();

    if (!tokenRecord) {
      throw new AppError("Token Inválido!", 401);
    }

    // Verifique se o token não expirou (por exemplo, expira em 1 hora)
    const tokenExpirationTime = 60 * 60 * 1000; // 1 hora em milissegundos
    const tokenCreationTime = new Date(tokenRecord.created_at).getTime();
    const currentTime = new Date().getTime();

    if (currentTime - tokenCreationTime > tokenExpirationTime) {
      // Limpe o token
      await knex("passwordToken").where("id", tokenRecord.id).del();
      throw new AppError("Token expirado!", 401);
    }

    const isTokenValid = tokenRecord.token == token ? true : false;

    if (isTokenValid) {
      const hashedPassword = await hash(newPassword, 8);

      await knex("users").where("email", email).update({
        password: hashedPassword,
      });

      // Limpe o token após a redefinição de senha
      await knex("passwordToken").where("id", tokenRecord.id).del();

      return res.status(200).json(`Senha atualizada com sucesso.`);
    } else {
      await knex("passwordToken").where("id", tokenRecord.id).del();
      throw new AppError("Token Inválido e/ou expirado!", 401);
    }
  }
}

module.exports = PasswordTokenController;
