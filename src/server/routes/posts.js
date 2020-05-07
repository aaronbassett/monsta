import { Router } from 'express'
import formidable from 'formidable'
import cloudinary from 'cloudinary'
import { ObjectID } from 'mongodb'
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
    const posts = await collection.find({}).sort({ publishedOn: -1 }).toArray()

    res.json(posts)
})

router.get('/:postId', async (req, res) => {
    const db = await connectDB()
    const collection = db.collection('posts')
    const post = await collection.findOne({ _id: new ObjectID(req.params.postId) })

    res.json(post)
})

router.delete('/:postId', async (req, res) => {
    const db = await connectDB()
    const collection = db.collection('posts')
    const deleted = await collection.findOneAndDelete(
        {
            _id: new ObjectID(req.params.postId),
            'author.userId': req.headers['x-stitch-user-id']
        }
    )

    res.json(deleted)
})

router.post('/', async (req, res) => {
    const { photo, filter, description } = req.body
    const db = await connectDB()
    const collection = db.collection('posts')


    const newPost = await collection.insertOne({
        author: {
            username: req.headers['x-stitch-username'],
            userId: req.headers['x-stitch-user-id'],
            avatar: req.headers['x-stitch-user-avatar']
        },
        description: description,
        photo: photo,
        filter: filter,
        lovedCount: 0,
        publishedOn: new Date()
    })

    const posts = await collection.find({}).sort({ publishedOn: -1 }).toArray()
    res.json(posts)
})

router.post('/image', async (req, res) => {
    new formidable.IncomingForm().parse(req).on('file', (name, file) => {
        cloudinary.uploader.upload(file.path, (result) => {
            res.json(result)
        })
    })
})

export default router