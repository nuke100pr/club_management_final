const express = require('express');
const userRoutes = require('./routes/userRoutes');
const boardRoutes = require('./routes/boardRoutes');
const clubRoutes = require('./routes/clubRoutes');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors');
const connectDB = require('./db'); // Import the MongoDB connection
const messageRoutes = require('./routes/messageRoutes');
const forumRoutes = require('./routes/forumRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// Serve static files from the uploads folder
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', postRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/forums', forumRoutes);
app.use('/events', eventRoutes);
// Start server
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
