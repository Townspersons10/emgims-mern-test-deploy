import express from 'express';
import { PersonInventory } from '../models/personInventoryModel.js'; // Importing the PersonInventory model

const router = express.Router();

// Route to create a new person inventory entry in the database
router.post('/', async (request, response) => {
    try {
        // Validate request body for required fields
        if (!request.body.name || !request.body.inventoryItems) {
            return response.status(400).send({
                message: 'Send all required fields: name, inventoryItems',
            });
        }
        // Creating a new person inventory object from request body
        const newPersonInventory = {
            name: request.body.name,
            inventoryItems: request.body.inventoryItems,
        };

        // Saving the new person inventory to the database
        const personInventory = await PersonInventory.create(newPersonInventory);

        // Respond with the created person inventory object
        return response.status(201).send(personInventory);
    } catch (error) {
        // Log and respond with error
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to retrieve all person inventories from the database
router.get('/', async(request, response) => {
    try {
        const personInventories = await PersonInventory.find({}); // Fetching all person inventories

        // Respond with total count and data of person inventories
        return response.status(200).json({
            count: personInventories.length,
            data: personInventories
        });
    } catch (error) {
        // Log and respond with error
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to retrieve a single person inventory by its id
router.get('/:id', async(request, response) => {
    try {
        const { id } = request.params; // Extracting id from request parameters

        const personInventory = await PersonInventory.findById(id); // Finding the person inventory by id

        // Respond with the person inventory data
        return response.status(200).json(personInventory);
    } catch (error) {
        // Log and respond with error
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to update a person inventory's information by its id
router.put('/:id', async(request, response) => {
    try {
        const { id } = request.params; // Extracting id from request parameters

        // Attempting to update the person inventory information
        const result = await PersonInventory.findByIdAndUpdate(id, request.body, { new: true });
        
        // Check if person inventory exists and was updated
        if (!result) {
            return response.status(404).json({message: 'Person Inventory not found'});
        }

        // Respond that person inventory was successfully updated
        return response.status(200).send({ message: 'Person Inventory updated successfully'})
    } catch (error) {
        // Log and respond with error
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to delete a person inventory by its id
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params; // Extracting id from request parameters

        // Attempting to delete the person inventory
        const result = await PersonInventory.findByIdAndDelete(id);

        // Check if person inventory exists and was deleted
        if (!result) {
            return response.status(404).json({message: 'Person Inventory not found'});
        }

        // Respond that person inventory was successfully deleted
        return response.status(200).send({ message: 'Person Inventory deleted successfully'})

    } catch (error) {
        // Log and respond with error
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Exporting the router to be used in other parts of the application
export default router;
