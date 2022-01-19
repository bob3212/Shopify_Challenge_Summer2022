const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    itemCount: {
        type: Number, 
        required: true
    }
    ,
    itemDescription: {
        type: String
    },
    itemType: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Inventory", ItemSchema)