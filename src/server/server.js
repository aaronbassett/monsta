import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import connectDB from './db/db'

const port = process.env.PORT || 8080
const app = express()

app.use(
    cors(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
)

app.get('/posts', async (req, res) => {
    const db = await connectDB()
    const collection = db.collection('posts')
    const posts = await collection.find({}).toArray()

    res.json(posts)
})

app.listen(port, () => console.log(`Monst Server listening on port #${port}`))