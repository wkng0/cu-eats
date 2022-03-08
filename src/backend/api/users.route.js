import express from "express"

const router = express.Router()

router.route("/").get((req, res) => res.send("Connected to database."))

export default router