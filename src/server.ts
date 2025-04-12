import app from './app';
import { config } from './config/env';
import { connectDB } from './config/db';

const start = async () => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`🚀 Node server running on port ${config.port}`);
  });
};

start();