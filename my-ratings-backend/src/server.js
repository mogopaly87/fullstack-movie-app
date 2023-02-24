import express from 'express';
import { db, connectToDb} from './db.js';
import cors from 'cors';
// const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json())


app.post('/hello', (req, res) => {
    res.send(`Hello ${req.body.name}!`);
});

// app.get("/hello/:name", (req, res,next) => {
//     const { name } = req.params;
//     res.send(`Hello ${name}!`);
// })

app.get("/movies", async (req, res) => {

    const {name} = req.params;

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
