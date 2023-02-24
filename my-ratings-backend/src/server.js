import express from 'express';
import { db, connectToDb} from './db.js';
import cors from 'cors';


const app = express();
app.use(express.json())
app.use(cors())


app.post('/submit_review', async (req, res) => {
    const data = await req.body
    await db.collection('ratings').insertOne(data, (err, res) => {
        if (err) throw err;
        console.log(res)
        db.close()
    });
    // console.log(data);
});

// app.get("/hello/:name", (req, res) => {
//     const { name } = req.params;
//     res.send(`Hello ${name}!`);
// })

app.get("/movies", async (req, res) => {

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
