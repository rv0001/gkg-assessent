import { Sequelize } from 'sequelize';

// Define your database connection
const sequelize = new Sequelize("mysql://avnadmin:AVNS_n1TjyaK9UNlIErbwbjj@mysql-3a132e1a-verma-0bdf.d.aivencloud.com:14197/test?ssl-mode=REQUIRED", {
  dialect: 'mysql', // or another database dialect
  logging: false,
});

export default sequelize;