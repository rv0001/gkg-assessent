// models/Post.js
import { DataTypes } from 'sequelize';

import sequelize from '../db.js';  // or wherever your Sequelize instance is

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
} , {timestamps:false});

// Named export of the Post model
export { Post };
