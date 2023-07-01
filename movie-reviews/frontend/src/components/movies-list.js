import React, { useState, useEffect } from "react";
import MoviesDataService from '../services/movies';
import { Link } from 'react-router-dom';

const MoviesList = (props) => {
    const [movies, setMovies] = useState([])
    const [searchTitle, setSearchTitle] = useState("")
    const [searchRating, setSearchRating] = useState("")
    const [ratings, setRatings] = useState(["All Ratings"])

    useEffect(() => {
        retrieveMovies()
        retrieveRatings()
    }, [])

    const retrieveMovies = () => {
        MoviesDataService.getAll()
            .then(res => {
                console.log(res.data)
                setMovies(res.data.movies)
            })
            .catch(e =>
                console.log(e)
            )
    }

    const retrieveRatings = () => {
        MoviesDataService.getRatings()
            .then(res => {
                console.log(res.data)
                //start with 'All ratings' if user doesn't specify any ratings
                setRatings(['All Ratings'].concat(res.data))
            })
            .catch(e => console.log(e))
    }

    return (
        <div className="App">
            Movies List
        </div>
    )
}

export default MoviesList;