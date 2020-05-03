import { Router } from 'express'
import formidable from 'formidable'
import cloudinary from 'cloudinary'
import connectDB from '../db/db'

const router = Router()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

router.get('/', async (req, res) => {
    const db = await connectDB()
    const collection = db.collection('posts')
    const posts = await collection.find({}).toArray()

    res.json(posts)
})

router.post('/image', async (req, res) => {
    new formidable.IncomingForm().parse(req).on('file', (name, file) => {
        cloudinary.uploader.upload(file.path, (result) => {
            console.log(result)
            res.json(result)
        })
    })
})

export default router