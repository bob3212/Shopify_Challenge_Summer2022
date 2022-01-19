const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const ItemModel = require('./schema/item')

//Setting up middleware
app.use(express.json());
app.use(cors());

//Connecting to db
mongoose.connect("mongodb+srv://bob:bob123@cluster0.wbrbh.mongodb.net/inventory?retryWrites=true&w=majority", {
    useNewUrlParser: true
})

//Add route to add new item to db
app.post("/add", async (req, res) => {
    const itemName = req.body.itemName;
    const numItem = req.body.numItem;
    const itemDesc = req.body.itemDesc;
    const itemType = req.body.itemType;
    
    const item = new ItemModel({
        itemName: itemName,
        itemCount: numItem,
        itemDescription: itemDesc,
        itemType: itemType
    })
    try {
        await item.save();
        res.sendStatus(200);
    } catch(err) {
        console.log(err);
    }
})

//Read route to read filtered items to db
app.get('/read/:type', async (req, res) => {
    const type = req.params.type;
    //If no filter
    if(type === 'All'){
        ItemModel.find({}, (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send(result);
        })
    }else{
        ItemModel.find({ itemType: type}, (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send(result);
        })
    }
})

//Update route to update the item count or item type of any item in db
app.put("/update", async (req, res) => {
    const newItemCount = req.body.newItemCount;
    const newItemType = req.body.newItemType;
    const id = req.body.id;
    
    try {
        await ItemModel.findById(id, (err, updatedItem) => {
            updatedItem.itemCount = newItemCount;
            updatedItem.itemType = newItemType;
            updatedItem.save()
            res.sendStatus(200);
        }).clone().catch((err) => console.log(err))
    } catch(err) {
        console.log(err)
    }
})

//Delete route to delete any item from db
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await ItemModel.findByIdAndRemove(id).exec();
    res.sendStatus(200);
})


app.listen(4000, () => {
    console.log("Server is running on port 4000")
})