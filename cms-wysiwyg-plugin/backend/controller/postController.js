import { Post } from '../models/Post.js';
import { Plugin } from '../models/Plugin.js'; 



export const PostController = {


  
  async createPost(req, res) {
    try {
        console.log(req.body)
      const { title, slug, content ,youtubeUrl} = req.body;
      
      if (!title || !slug || !content) {
        return res.status(400).json({ error: 'Title, slug, and content are required.' });
      }
      
      const newPost = await Post.create({ title, slug, content,youtubeUrl });
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
  async getAllPlugin(req, res) {
    try {
      console.log("kjk")
      const plugin = await Plugin.findAll();
      if (!plugin) {
        return res.status(404).json({ error: 'Plugin not found.' });
      }
      return res.status(200).json(plugin);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch plugin.' });
    }
  },

  async updatePost(req, res) {
    try {
      const { title, slug, content ,youtubeUrl} = req.body;
      const post = await Post.findByPk(req.query.id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found.' });
      }

      post.title = title;
      post.slug = slug;
      post.content = content;
      post.youtubeUrl = youtubeUrl;


      await post.save();
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update post.' });
    }
  },

  async updatePlugin(req, res) {
    try {
      const { isActive } = req.body;
      const plugin = await Plugin.findByPk(req.query.id);

      if (!plugin) {
        return res.status(404).json({ error: 'plugin not found.' });
      }

      plugin.isActive = isActive;

      await plugin.save();
      return res.status(200).json(plugin);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update plugin.' });
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
  },

};
