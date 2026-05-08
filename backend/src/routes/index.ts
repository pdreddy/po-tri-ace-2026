import { Router } from 'express';

export const apiRouter = Router();

apiRouter.get('/v1', (_req, res) => {
  res.status(200).json({ message: 'Prosper Racquet League API v1' });
});
