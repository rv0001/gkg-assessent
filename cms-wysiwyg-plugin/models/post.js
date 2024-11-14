const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false, // Disable Sequelize's automatic creation of `createdAt` and `updatedAt`
  });
};
