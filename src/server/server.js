import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import connectDB from './db/db'
import routes from './routes'

const port = process.env.PORT || 8080
const app = express()

app.use(
    cors(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
)

app.use('/posts', routes.posts)
app.use('/loved', routes.loved)

app.listen(port, () => console.log(`Monst Server listening on port #${port}`))