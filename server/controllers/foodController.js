import foodModel from "../models/foodModel.js";
import fs from 'fs';

//add food 
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        price: req.body.price,
        image: image_filename,
        description: req.body.description,
        category: req.body.category
    })

    try {
        await food.save();
        res.status(201).json({ message: "Food added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to add food" });
    }
}


//all food list
const foodList = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get food list" });
    }
}


//delete food
const deleteFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete food" });
    }
}

export { addFood, foodList, deleteFood }