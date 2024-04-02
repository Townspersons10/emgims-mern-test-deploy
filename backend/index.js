import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import employeeRoute from './routes/employeeRoute.js';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

// Define __filename and __dirname at the beginning
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files from the Vite build output directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// Handle SPA routing by returning the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(process.env.mongoDBURL)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(err => console.error('Connection error', err));

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Welcome to the Employee Inventory Management System!'));

app.use('/employee', employeeRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
