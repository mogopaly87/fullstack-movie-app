import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import List from './List';
import ReviewForm from './Form';
import {Routes, Route, Link, useParams} from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {

  const [movies, setMovies] = useState([]);
 
  useEffect(() => {
    // Using axios to get data from Express
    const loadMovies = async () => {
      const response = await axios.get(`/api`)
      const movieInfo = response.data;
      // console.log(movieInfo);
      setMovies(movieInfo);
    }
    
    loadMovies();
    
  }, [movies])

  const handleRemoveMovie = item => {

    const deleteMovie = async () => {
      await axios.delete(`/movies/${item['name']}`)
    }
    deleteMovie();
    
  }


    const txtMovieName = useRef();
    const txtReleaseDate = useRef();
    const txtActors = useRef();
    const txtImageLink = useRef();
    const txtRating = useRef();

    
    
    const handleFormSubmit = (event) => {
        event.preventDefault()
        
        const movieName = txtMovieName.current.value;
        const releaseDate = txtReleaseDate.current.value;
        const actors = txtActors.current.value;
        const image = txtImageLink.current.value;
        const rating = txtRating.current.value;

        let newMovieRating = {
                "name": movieName,
                "releaseDate": releaseDate,
                "actors": actors,
                "poster": image,
                "rating": rating
            }

        const doPostRequest = async () =>{
          await axios.post("/submit_review", newMovieRating);
          // let data = res.data;
          
        }
        doPostRequest();


        txtMovieName.current.value = "";
        txtReleaseDate.current.value = "";
        txtActors.current.value = "";
        txtImageLink.current.value = "";
        txtRating.current.value = "";
    }
  return (
    <div className="App">
      <h1>Movies Review</h1>
      <nav className="d-flex justify-content-around">
        <button type="button" className="btn btn-primary"><Link style={{textDecoration: "none", color:"whitesmoke"}} className="w-49" to="/">Home</Link></button>
        <button type="button" className="btn btn-primary"><Link style={{textDecoration: "none", color:"whitesmoke"}} className="w-49" to="submit_review">Write Review</Link></button>
      </nav>
      <hr />
      <Routes>
        <Route 
          path="/"
          element={<List list={movies} onRemoveItem={handleRemoveMovie}/>}
        />
        <Route 
          path="/submit_review"
          element={<ReviewForm  submit={handleFormSubmit} 
              name = {txtMovieName} 
              date = {txtReleaseDate} 
              actors = {txtActors} 
              image = {txtImageLink}
              rating = {txtRating}/>}
        />
      </Routes>
      

      
    </div>
  );
}



export default App;
