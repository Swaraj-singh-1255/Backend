import express from "express"
import cors from "cors"
import useGraph from "./ai/grap.ai.js"

const app = express()

app.use(cors({
    origin: true, // Allow all origins
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}))
app.use(express.json())

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok'})
})

app.post("/use-graph",async (req, res) => {
    try {
        const { input } = req.body
        if (!input) {
            return res.status(400).json({ error: "Input is required" })
        }
        const result = await useGraph(input)
        res.json({ result })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
})

export default app