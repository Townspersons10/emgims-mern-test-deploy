import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { PersonInventory } from './models/personInventoryModel.js'; // Importing the Book model
import { fileURLToPath } from 'url';
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

// Convert the file URL to a file path
// __filename and __dirname do not exist in ES modules, so we create them
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Then you can use __dirname as before
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'index.html'));
});
