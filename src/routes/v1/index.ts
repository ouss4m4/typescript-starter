import { Request, Response, Router } from 'express';
import { postsController } from '../../controllers/posts.controller';
import { userController } from '../../controllers/users.controller';
import { userRouter } from './users.router';

const apiV1Router = Router();

apiV1Router.use('/users', userRouter);
apiV1Router.use('/posts', postsController);

apiV1Router.use('/', (req: Request, res: Response) => {
  // redirect to swagger later on
  res.json({
    success: true,
    version: 1,
  });
});

export { apiV1Router };
