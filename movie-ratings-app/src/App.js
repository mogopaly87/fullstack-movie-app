import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import List from './List';
import ReviewForm from './Form';
import {Routes, Route, Link, useParams} from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const getData = () => (
    fetch('./movies.json',
      {
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }
    )
    .then(response => response.json())
    .catch(error => console.error(error))
  )

const App = () => {

  const [movies, setMovies] = useState([])
  // const [movieName] = useParams();
 
  useEffect(() => {
    // Using axios to get data from Express
    const loadMovies = async () => {
      const response = await axios.get(`http://localhost:8000/movies`)
      const movieInfo = response.data;

      setMovies(movieInfo);
    }
    
    loadMovies();

    // getData()
    //   .then(result => {
    //     setMovies(result)
    //   })
  }, [])

  const handleRemoveMovie = item => {
    const newMoviesList = movies.filter(
      (movie) => item.id !== movie.id
    );
    setMovies(newMoviesList);
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
                "id": movies.length + 1,
                "name": movieName,
                "releaseDate": releaseDate,
                "actors": actors,
                "poster": image,
                "rating": rating
            }
            
            const newList = [...movies];
            newList.push(newMovieRating);
            setMovies(newList);
            console.log(newList)

        txtMovieName.current.value = "";
        txtReleaseDate.current.value = "";
        txtActors.current.value = "";
        txtImageLink.current.value = "";
        txtRating.current.value = "";
    }
  return (
    <div className="App">
      <h1>This is a test</h1>
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
