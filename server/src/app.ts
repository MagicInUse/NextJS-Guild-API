import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', routes);

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});