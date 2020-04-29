import { Router } from 'express'
import connectDB from '../db/db'

const router = Router()

router.get('/', async (req, res) => {
    const db = await connectDB()
    const collection = db.collection('posts')
    const posts = await collection.find({}).toArray()

    res.json(posts)
})

export default router