import mongoose from "mongoose";

// Defines the schema for an inventory item
const inventoryItemSchema = mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        }
    },
    {
        _id: false // Prevents Mongoose from creating an _id for subdocuments
    }
);

// Defines the schema of the model for a person with their inventory items
const personInventorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        inventoryItems: [inventoryItemSchema] // An array of inventory item subdocuments
    },
    {
        timestamps: false
    }
);

// Exports the model
export const PersonInventory = mongoose.model('PersonInventory', personInventorySchema);
