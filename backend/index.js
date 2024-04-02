import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { PersonInventory } from './models/personInventoryModel.js'; // Importing the Book model
import employeeRoute from './routes/employeeRoute.js';
import path from 'path';
import dotenv from 'dotenv'

dotenv.config();


const app = express();


const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Attempt to connect to MongoDB
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

// Serve static files from the React frontend app in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/dist'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}
