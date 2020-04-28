import { MongoClient } from 'mongodb'
let db = null

export default async function connectDB() {
    if (db) return db

    const client = await new MongoClient.connect(process.env.MONGODB_SERVER_URI, { useNewUrlParser: true })
    db = client.db(process.env.MONGODB_DATABASE_NAME || "monsta")

    return db
}