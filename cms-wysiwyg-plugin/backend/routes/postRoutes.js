import { Router } from 'express'; // import Router from express
import { PostController } from '../controller/postController.js'; // Assuming you have a controller

const router = Router();

// Define the routes for posts
router.get('/posts/plugins', PostController.getAllPlugin);
router.put('/posts/plugins', PostController.updatePlugin);

router.post('/posts', PostController.createPost);
router.get('/posts', PostController.getPosts);
router.get('/posts/:id', PostController.getPostById);
router.put('/posts', PostController.updatePost);
router.delete('/posts/:id', PostController.deletePost);





export default router;