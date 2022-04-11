import express from "express"

const router = express.Router()
import cors from 'cors';
router.use(cors());
router.route("/").get((req, res) => res.send("Connected to database."))

export default router