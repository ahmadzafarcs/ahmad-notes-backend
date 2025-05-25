import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors({
    origin: https://notes.azcs.site,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],  
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoutes from './routes/auth.route.js';
import noteRoutes from './routes/notes.route.js';

app.use('/', authRoutes);
app.use('/', noteRoutes);

app.get('/test', (req, res) => {
    res.status(200).json({ success: true, message: 'API is working' });
});

export default app;
