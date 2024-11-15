// models/Post.js
import { DataTypes } from 'sequelize';

import sequelize from '../db.js';  // or wherever your Sequelize instance is

const Plugin = sequelize.define('Plugin', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  isActive: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
} , {timestamps:false});

// Named export of the Post model
export { Plugin };
