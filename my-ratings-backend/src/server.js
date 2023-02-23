import express from 'express';
import { db, connectToDb} from './db.js';

const app = express();
app.use(express.json())

app.post('/hello', (req, res) => {
    res.send(`Hello ${req.body.name}!`);
});

app.get("/hello/:name", (req, res) => {
    const { name } = req.params;
    res.send(`Hello ${name}!`);
})

app.get("/movie/:name", async (req, res) => {

    const {name} = req.params;

    const movie = await db.collection('ratings').findOne({name});

    res.json(movie);
})

connectToDb(() =>{
    console.log('Successfully connected to Database')
    app.listen(8000, () => {
    console.log("Server is listening on port 8000")
})
})
