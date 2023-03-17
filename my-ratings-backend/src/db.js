
import {MongoClient} from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();
let db;

async function connectToDb(cb) {
    const client = new MongoClient(process.env.MONGO_CONNECT);
    // const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    db = client.db('ratingsdb')
    cb();
}

export {
    db,
    connectToDb,
}

