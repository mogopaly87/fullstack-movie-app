import express from 'express';
import path from 'path';
import { db, connectToDb} from './db.js';
import {fileURLToPath} from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '../build')))

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

app.post('/submit_review', async (req, res) => {
    const data = await req.body
    await db.collection('ratings').insertOne(data, (err, res) => {
        if (err) throw err;
        console.log(res)
        db.close()
    });
    // console.log(data);
});

app.delete("/movies/:id", async (req, res) => {
    try{
    const params  = await req.params;
    const movies = await db.collection('ratings');
    const query = {name: (params.id)}
    const result = await movies.deleteOne(query);

    if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.");
    } else {
        console.log("No documents matched the query. Deleted 0 documents.");
    }
    } finally {
        await db.close;
    }
})

// app.get("/", async (req, res) => {

//     const movies = await db.collection('ratings').find({});
//     const allMovies = await movies.toArray();
//     res.send(allMovies)
// })

app.get("/api", async (req, res) => {

    const movies = await db.collection('ratings').find({});
    const allMovies = await movies.toArray();
    res.send(allMovies)
})

connectToDb(() =>{
    console.log('Successfully connected to Database')
    app.listen(8000, () => {
    console.log("Server is listening on port 8000")
})
})
