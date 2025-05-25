import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoutes from './routes/auth.route.js';
import noteRoutes from './routes/notes.route.js';

app.use('/', authRoutes);
app.use('/', noteRoutes);

app.get('/api/test', (req, res) => {
    res.status(200).json({ success: true, message: 'API is working' });
});

export default app;
