import express from 'express';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js'; // Your routes file
import dotenv from 'dotenv';
const app = express();

// Enable CORS
dotenv.config({ path: '.env.local' });
app.use(cors());

// Use express.json() to parse incoming JSON requests
app.use(express.json()); // This is crucial for parsing JSON

// Use routes
app.use('/api', postRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
