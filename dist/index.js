import express from "express";
import walksRouter from "./routes/walks.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Backend is running!");
});
// Use /walks routes
app.use("/walks", walksRouter);
app.listen(3000, '0.0.0.0', () => console.log("Listening on 0.0.0.0:3000"));
