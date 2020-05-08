import { Router } from 'express'
import formidable from 'formidable'
import cloudinary from 'cloudinary'
import { ObjectID } from 'mongodb'
import connectDB from '../db/db'

const router = Router()

router.get('/:userId', async (req, res) => {
    const db = await connectDB()
    const collection = db.collection('posts')

    const facets = {
        "postsMade": [
            {
                '$group': {
                    _id: { userId: "$author.userId" },
                    total: { '$sum': 1 },
                }
            },
            { '$project': { _id: 0 } }
        ],
        "lovedReceived": [
            {
                '$group': {
                    _id: { userId: "$author.userId" },
                    total: { '$sum': "$lovedCount" },
                }
            },
            { '$project': { _id: 0 } }
        ],
        "commentsReceived": [
            { '$unwind': '$comments' },
            {
                '$group': {
                    _id: { commentId: "$_id" },
                    count: {
                        '$sum': {
                            '$cond': {
                                if: {
                                    '$isArray': "$comments.comments"
                                }, then: {
                                    '$add': [{ '$size': "$comments.comments" }, 1]
                                }, else: 1
                            }
                        },
                    }
                }
            },
            {
                '$group': {
                    _id: null,
                    total: {
                        '$sum': '$count',
                    }
                }
            },
            { '$project': { _id: 0 } }
        ]
    }

    collection.aggregate([
        { '$match': { 'author.userId': req.params.userId } },
        { '$facet': facets }
    ], (err, cursor) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        } else {
            cursor.toArray((err, documents) => {
                console.log(documents)
                res.json(documents)
            })
        }
    })
})

export default router