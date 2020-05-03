import { Router } from 'express'
import _ from 'lodash'
import { OAuth2Client } from 'google-auth-library'
import connectDB from '../db/db'

const router = Router()
const client = new OAuth2Client("793925353084-v324mu5j8sgfh3i3c62dt8j52iprk9nl.apps.googleusercontent.com")


router.get('/:postId', async (req, res) => {
    const db = await connectDB()
    const collection = db.collection('loved')
    const loves = await collection.find({ postId: req.params.postId, loved: 1 }).toArray()
    const lovedBy = _.reduce(loves, (result, love) => {
        result[love.userId] = love.username
        return result;
    }, {})

    res.json(lovedBy)
})

router.put('/:postId', async (req, res) => {
    if ("x-stitch-user-id" in req.headers) {
        const db = await connectDB()
        const collection = db.collection('loved')

        const newLove = collection.findOneAndUpdate(
            {
                postId: req.params.postId,
                userId: req.headers['x-stitch-user-id']
            },
            {
                $set: {
                    updatedOn: new Date(),
                    username: req.headers['x-stitch-username']
                },
                $bit: { loved: { "xor": 1 } }
            },
            {
                returnOriginal: false,
                upsert: true
            }
        )
        res.json(newLove)
    } else {
        res.sendStatus(401)
    }
})

export default router