const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { hash } = require("bcryptjs");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    if (!name) {
      throw new AppError("O nome é obrigatório!");
    }

    const checkIfEmailExists = await knex("users").where({ email }).first();

    if (checkIfEmailExists) {
      throw new AppError("E-mail já cadastrado!");
    }

    const hashedPassword = await hash(password, 8);

    try {
      await knex("users").insert({
        email: email,
        name: name,
        password: hashedPassword,
      });
    } catch (error) {
      // Lide com o erro de inserção, se necessário
      console.error(error);
      throw new AppError("Erro ao cadastrar usuário.");
    }

    res.json();
  }
}

module.exports = UsersController;
