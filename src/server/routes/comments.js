import { Router } from 'express'
import { ObjectID } from 'mongodb'
import connectDB from '../db/db'

const router = Router()


router.post('/:postId', async (req, res) => {
    const { comment, replyTo } = req.body
    const db = await connectDB()
    const collection = db.collection('posts')

    const commentPath = (replyTo !== undefined) ? `comments.${replyTo}.comments` : 'comments'

    const post = await collection.findOneAndUpdate(
        { _id: new ObjectID(req.params.postId) },
        {
            '$push': {
                [commentPath]: {
                    _id: new ObjectID(),
                    author: {
                        username: req.headers['x-stitch-username'],
                        userId: req.headers['x-stitch-user-id'],
                        avatar: req.headers['x-stitch-user-avatar']
                    },
                    comment: comment,
                    publishedOn: new Date()
                }
            }
        },
        {
            returnOriginal: false
        }
    )
    res.json(post.value)
})

export default router