import { Post } from '../models/Post.js'; // Assuming your Sequelize model is here
import fs from 'fs';
import path from 'path';

const pluginsDirectory = path.join(process.cwd(), 'backend', 'plugins');


export const PostController = {

  async  plugins(req, res) {
    try {
      const plugins = [];
      const pluginFolders = fs.readdirSync(pluginsDirectory);
  
      // Iterate through the plugin folders and load their index.js files
      for (const folder of pluginFolders) {
        const pluginPath = path.join(pluginsDirectory, folder);
        const pluginConfigPath = path.join(pluginPath, 'index.js');
  
        // Check if the plugin's index.js exists
        if (fs.existsSync(pluginConfigPath)) {
          try {
            // Dynamically import the plugin module (index.js)
            const pluginModule = await import(pluginConfigPath);
            const plugin = pluginModule.plugin || {}; 
            console.log(plugin) // Assuming each plugin exports an object with 'plugin'
  
            // Push the plugin configuration to the plugins array
            plugins.push({
              name: plugin.name,
              description: plugin.description,
              version: plugin.version,
              onLoad: plugin.onLoad ? 'onLoad':  null,
              renderBlock: plugin.renderBlock ? 'renderBlock': null
            });
          } catch (error) {
            console.error(`Error loading plugin from ${pluginConfigPath}:`, error);
          }
        }
      }
  
      // Send the response with the loaded plugins
      res.status(200).json({ plugins });
    } catch (error) {
      console.error('Error loading plugins:', error);
      res.status(500).json({ error: 'Failed to load plugins' });
    }
  },
  
  async createPost(req, res) {
    try {
        console.log(req.body)
      const { title, slug, content } = req.body;
      
      if (!title || !slug || !content) {
        return res.status(400).json({ error: 'Title, slug, and content are required.' });
      }
      
      const newPost = await Post.create({ title, slug, content });
      return res.status(201).json(newPost);
    } catch (error) {
        console.log(error)
      return res.status(500).json({ error: 'Failed to create post.',error });
    }
  },

  async getPosts(req, res) {
    try {
        if(req.query.id){
        const post = await Post.findByPk(req.query.id);
        return res.status(200).json(post);
        }else{
      const posts = await Post.findAll();
      return res.status(200).json(posts);
        }
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch posts.' });
    }
  },

  async getPostById(req, res) {
    try {
      const post = await Post.find(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found.' });
      }
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch post.' });
    }
  },

  async updatePost(req, res) {
    try {
      const { title, slug, content } = req.body;
      const post = await Post.findByPk(req.query.id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found.' });
      }

      post.title = title;
      post.slug = slug;
      post.content = content;

      await post.save();
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update post.' });
    }
  },

  async deletePost(req, res) {
    try {
      const post = await Post.findByPk(req.params.id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found.' });
      }

      await post.destroy();
      return res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete post.' });
    }
  }
};
