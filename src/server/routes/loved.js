import { Router } from 'express'
import connectDB from '../db/db'

const router = Router()


router.get('/:postId', async (req, res) => {
    const db = await connectDB()
    const collection = db.collection('loved')
    const loves = await collection.find({ postId: req.params.postId, loved: 1 }).toArray()
    const lovedBy = loves.map((love) =>
        love.user
    )
    res.json(lovedBy)
})

router.put('/:postId', async (req, res) => {
    const db = await connectDB()
    const collection = db.collection('loved')

    const newLove = collection.findOneAndUpdate(
        { postId: req.params.postId, user: 'aaronbassett' },
        {
            $set: { updatedOn: new Date() },
            $bit: { loved: { "xor": 1 } }
        },
        {
            returnOriginal: false,
            upsert: true
        }
    )
    res.json(newLove)
})

export default router