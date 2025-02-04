import { Request, Response, Router } from 'express';

const postsController = Router();

postsController.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: ['list of posts'],
  });
});

export { postsController };
