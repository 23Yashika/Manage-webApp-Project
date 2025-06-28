import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import shortcutRoutes from './routes/shortcutRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.status(200).send('pta nhi kya ho rha h')
})
app.use('/api/auth', authRoutes);
app.use('/api/shortcuts', shortcutRoutes);

export default app;