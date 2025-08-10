import express from "express";
import { getAllDogs } from "../services/dogsService.js";
const dogsRouter = express.Router();
dogsRouter.get("/", async (req, res) => {
    try {
        const dogs = await getAllDogs();
        res.json(dogs);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default dogsRouter;
