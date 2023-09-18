const path = require('path');
require('dotenv').config();

// Configuração comum para todos os ambientes
const commonConfig = {
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migrations')
  },
};

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db') // Nome do arquivo do banco de dados SQLite para desenvolvimento
    },
    useNullAsDefault: true, // Permite a utilização de valores NULL por padrão
    ...commonConfig,
  },
  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      charset: 'utf8mb4'
    },
    ...commonConfig,
  },
};
