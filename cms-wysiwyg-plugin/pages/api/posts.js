import { Post } from '../../models';  // Import your Sequelize Post model

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle POST request: Create a new post
    const { title, slug, content } = req.body;

    // Validation: Ensure all fields are present
    if (!title || !slug || !content) {
      return res.status(400).json({ error: 'Title, Slug, and Content are required.' });
    }

    try {
      // Create a new post in the database
      const newPost = await Post.create({
        title,
        slug,
        content,
      });

      return res.status(201).json(newPost);  // Respond with the created post
    } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).json({ error: 'Failed to create post.' });
    }
  } else if (req.method === 'GET') {
    const { id, slug } = req.query; // Get id or slug from query params
  

    try {
      let post;
      console.log(id,slug,"jkjbkl")
      if (slug) {
        post = await Post.findOne({ where: { slug } }); // Find post by slug
      } else if (id ) {
        if(id){
            post = await Post.findByPk(id);
        }
        // Find post by ID
       
      } else {
            post = await Post.findAll();
      }

      if (!post) {
        return res.status(404).json({ error: 'Post not found' }); // Return 404 if no post found
      }

      return res.status(200).json(post); // Respond with the found post data
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch post' }); // Internal server error
    }
  } else if (req.method === 'PUT') {
    // Handle PUT request: Update a post by slug
    const { title, slug, content } = req.body;
    const { id } = req.query;

    if (!id || !title || !slug || !content) {
      return res.status(400).json({ error: 'Title, Slug, Content, and ID are required.' });
    }

    try {
      // Find the post to update
      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found.' });
      }

      // Update the post
      post.title = title;
      post.slug = slug;
      post.content = content;
      
      await post.save();

      return res.status(200).json(post);  // Return the updated post
    } catch (error) {
      console.error('Error updating post:', error);
      return res.status(500).json({ error: 'Failed to update post.' });
    }
  } else if (req.method === 'DELETE') {
    // Handle DELETE request: Delete a post by ID
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Post ID is required.' });
    }

    try {
      // Find the post by ID
      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found.' });
      }

      // Delete the post
      await post.destroy();

      return res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (error) {
      console.error('Error deleting post:', error);
      return res.status(500).json({ error: 'Failed to delete post.' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
