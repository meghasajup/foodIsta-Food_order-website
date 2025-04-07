import express from 'express';
import multer from 'multer';
import { addFood, deleteFood, foodList } from '../controllers/foodController.js';

const foodRouter = express.Router();

//Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
})
const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood); //Add food
foodRouter.get("/list", foodList); //Food list
foodRouter.post("/delete", deleteFood) //Delete food

export default foodRouter;