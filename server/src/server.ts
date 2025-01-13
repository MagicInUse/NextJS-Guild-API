import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3001;

// Middleware to enable CORS for specified origins
app.use(cors({
  origin: ['http://localhost:3000', 'https://fadedlegends.magicapps.dev/']
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public_html directory
app.use(express.static(path.join(__dirname, '../public_html')));

// API routes
app.use('/api', routes);

// SPA fallback to serve index.html for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public_html/index.html'));
});

// Error handler middleware to catch and respond to errors
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: err.message });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});