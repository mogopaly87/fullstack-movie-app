import express from 'express';
import path from 'path';
import { db, connectToDb} from './db.js';
import {fileURLToPath} from 'url';
import cors from 'cors';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '../build')))
app.use(express.static(path.join(__dirname, '../posters')))
const upload = multer({dest: 'posters/'})


app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})



app.post('/submit_review', upload.single('movie_poster'), async (req, res) => {
    
    await db.collection('ratings').insertOne({'name':req.body.movie_name, 'releaseDate':req.body.releaseDate, 'actors':req.body.actors, 'rating':req.body.rating, 'poster':req.file.filename}, (err, res) => {
        if (err) throw err;
        console.log(res)
        db.close()
    });
    res.redirect('/')
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
