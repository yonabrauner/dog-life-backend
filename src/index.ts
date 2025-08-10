import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import walksRouter from "./routes/walks.ts";
import dogsRouter from "./routes/dogs.ts";
import cors from "cors";

// require('dotenv').config(); // added for deployment

const app = express();

app.use(cors());
app.use(express.json());

// Use /walks routes
app.use("/walks", walksRouter);

app.use("/dogs", dogsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on 0.0.0.0:${port}`));
