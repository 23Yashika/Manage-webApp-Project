 import 'dotenv/config';
import app from './src/app.js';
import connectdb from './src/config/db.js';
const PORT = process.env.PORT;
async function startServer() {
  try {
    await connectdb();
    app.listen(PORT, () => {
        console.log(`✅ App is running : PORT - ${PORT}`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};
startServer();