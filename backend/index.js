// Importing necessary libraries and modules
import express from 'express'; // Main Express web server framework
import cors from 'cors'; // Middleware to enable CORS (Cross-Origin Resource Sharing)
import mongoose from 'mongoose'; // MongoDB object modeling tool
import { PersonInventory } from './models/personInventoryModel.js'; // Importing the Book model
import employeeRoute from './routes/employeeRoute.js'; // Routes for book operations
import { PORT, mongoDBURL } from './config.js'; // Importing configurations such as PORT and MongoDB URL

// Creating an Express application
const app = express();

// Middleware for parsing JSON bodies in requests
app.use(express.json());

// Middleware for handling CORS Policy
// Option one: Allow all origins
app.use(cors());

// Option two: Allow custom origins (currently commented out to use option one)
// app.use(
//     cors({
//         origin: 'http://localhost:3000', // Specify allowed origin
//         methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
//         allowedHeaders: ['Content-Type'], // Specify allowed headers
//     })
// );

// Test route to confirm server is running
app.get('/', (request, response) => {
    console.log(request); // Logging the request object for debugging
    return response.status(234).send('Welcome!'); // Sending a custom welcome message with a status code
});

// Using book routes for any requests to '/books'
app.use('/employee', employeeRoute);

// Connecting to the MongoDB database and starting the server
// The server only starts if the database connection is successful
mongoose
    .connect(mongoDBURL) // Connecting to MongoDB using the URL from config
    .then(() => {
        console.log('Connected to database'); // Log on successful connection
        app.listen(PORT, () => { // Start listening for requests on configured PORT
            console.log(`Server is listening on port: ${PORT}`); // Confirmation log
        });
    })
    .catch((error) => {
        console.log(error); // Log any errors that occur during connection
    });
