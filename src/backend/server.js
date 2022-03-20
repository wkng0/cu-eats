import express from "express"
import cors from "cors"
import user from "./api/users.route.js"

const app = express();
const port = process.env.PORT || 7000;

// Middleware
app.use(cors());
app.use(express.json()); 

app.use("/api/v1/users", user);
app.use("*", (req, res) => res.status(404).json({ error: "not found"}));

app.listen(port, () => {
    console.log('Server is running on the port ' + port);
});

export default app;