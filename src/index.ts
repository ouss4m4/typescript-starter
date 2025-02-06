import { connectDb } from './infra/appDataSource';
import { startServer } from './infra/server';

startServer();
connectDb();
