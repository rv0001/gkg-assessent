import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
// Define your database connection
const sequelize = new Sequelize(`${process.env['DATABASE_URL']}`, {
  dialect: 'mysql', // or another database dialect
  logging: false,
});

export default sequelize;