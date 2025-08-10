import express from "express";
import { getAllWalks, createWalk, getLastWalk, getLastWalkWithActivity, getTopWalker } from "../services/walksService.js";
const walksRouter = express.Router();
/// Keep track of connected SSE clients
const clients = [];
// SSE endpoint for clients to subscribe
walksRouter.get("/stream", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    // Push this client to the list
    clients.push(res);
    // Remove client when connection closes
    req.on("close", () => {
        const index = clients.indexOf(res);
        if (index !== -1)
            clients.splice(index, 1);
    });
});
// Broadcast helper
function broadcast(event, data) {
    const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    clients.forEach(client => client.write(payload));
}
// POST /walks - create a new walk
walksRouter.post("/", async (req, res) => {
    const { date, duration, walkerName, notes, dogActivities } = req.body;
    try {
        console.log("post request recieved from:", walkerName, "with activities:", dogActivities);
        const walk = await createWalk({ date, duration, walkerName, notes, dogActivities });
        res.json(walk);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create walk" });
    }
});
// Regular GET to fetch all walks (for initial load)
walksRouter.get("/", async (req, res) => {
    try {
        const walks = await getAllWalks();
        res.json(walks);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Get last walk route
walksRouter.get("/last", async (req, res) => {
    try {
        const lastWalk = await getLastWalk();
        res.json(lastWalk);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch last walk" });
    }
});
// Get last walk with activity from dog
walksRouter.get("/activity/:dogName/:activity", async (req, res) => {
    try {
        const { dogName, activity } = req.params;
        if (activity !== "pee" && activity !== "poop") {
            return res.status(400).json({ error: "Activity must be 'pee' or 'poop'" });
        }
        const result = await getLastWalkWithActivity(dogName, activity);
        if (!result) {
            return res.status(404).json({ message: "No matching activity found" });
        }
        res.json(result);
    }
    catch (error) {
        console.error("Error fetching last activity:", error);
        res.status(500).json({ error: "Failed to fetch last activity" });
    }
});
// Get top walker (most walks)
walksRouter.get("/topWalker", async (req, res) => {
    try {
        const topWalker = await getTopWalker();
        res.json(topWalker);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "couldnt get topWalker." });
    }
});
export default walksRouter;
