import React, { useEffect, useState } from 'react';
import axios from 'axios';

import wave from '../assets/wave1.svg';
import wave2 from '../assets/wave2.svg';

import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);

    let userData = JSON.parse(localStorage.getItem('userData'));
    let params = {
        userId: userData.userId
    }

    useEffect(() => {
        axios.post('http://10.6.0.10:9494/users/movies', params)
        .then(response => {
            setMovies(response.data.movies);
            if (!response.data.status) {
                // setError(response.data.message);
                console.log('An error occured when getting your movies')
            }
        })
    }, [])

    const addMovie = () => {
        console.log('Adding new movie to user list.');
        navigate('/addmovie');
    }

    const editMovie = (movie) => {
        navigate('/addmovie', { state: { movie } });
    }

    const logout = () => {
        localStorage.removeItem('userData');
        localStorage.setItem('isLoggedIn', false);
        navigate('/');
    }

    return (
        <div>
            <div className='header'>
                <h1>My Movies</h1>
                <div className='logout' onClick={() => logout()}>
                    <p>Logout</p>
                </div>
            </div>
            <div className='dashboard'>
                <div className="container text-center">
                    {movies.length === 0 ? (
                        <div>
                            <h1>Your movie list is empty</h1>
                            <button className="add-movie-button" onClick={() => addMovie()}>Add a new movie</button>
                        </div>
                    ) : (
                        <div className="movie-grid">
                            {
                                movies.map((movie, index) => {
                                    return (<div className='movie-card' key={index} onClick={() => editMovie(movie)}>
                                        <img
                                            src={`data:${movie.imageType};base64,${movie.image}`}
                                            alt={movie.title}
                                            className='movie-picture'
                                        />
                                        <div className='movie-details'>
                                            <h2 className='movie-title'>{movie.name}</h2>
                                            <p className='movie-year'>{movie.year}</p>
                                        </div>
                                    </div>)
                                })
                            }
                        </div>
                    )}
                    <button className="add-movie-button" onClick={() => addMovie()}>Add a new movie</button>
                </div>
            </div>
            <div className='footer'>
                <div className='wave-container'>
                    <img src={wave} className="wave wave1" alt="wave" />
                    <img src={wave2} className="wave wave2" alt="wave" />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
