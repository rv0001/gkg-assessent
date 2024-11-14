const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  logging: false,
});

// Import the Post model
const PostModel = require('./post'); // Make sure you import correctly

// Define models
const Post = PostModel(sequelize, Sequelize.DataTypes);

// Export models
module.exports = {
  Sequelize,
  sequelize,
  Post,
};
