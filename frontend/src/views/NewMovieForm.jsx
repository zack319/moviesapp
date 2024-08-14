import React, { useState, useEffect } from 'react';
import axios from 'axios';

import wave from '../assets/wave1.svg';
import wave2 from '../assets/wave2.svg';
import { useNavigate, useLocation } from 'react-router-dom';

const NewMovieForm = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setPreview] = useState(null);
    const [imageType, setImageType] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (state && state.movie) {
            setTitle(state.movie.name);
            setYear(state.movie.year);
            setPreview(`data:${state.movie.imageType};base64,${state.movie.image}`);
            setImageType(state.movie.imageType);
            setImage(state.movie.image);
        }
    }, [state]);

    const goTo = (route) => {
        navigate(route);
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            if (file.type.startsWith('image/')) {
                // setImage(file);

                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                    const base64String = reader.result.replace("data: ", "").replace(/^.+,/, "")
                    setImage({ ...image, image: base64String })
                    setImageType(file.type);
                };

                reader.readAsDataURL(file);
            } else {
                setError('Please upload a valid image.');
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!title | !year | !image) {
            setError('Fill in all fields, upload an image then submit');
            return;
        }

        let userData = JSON.parse(localStorage.getItem('userData'));

        let data = {
            name: title,
            year: year,
            image: image.image,
            imageType: imageType,
            userId: userData.userId
        }

        if (state && state.movie) {
            data['movieId'] = state.movie._id;
            if (typeof image === 'string' || image instanceof String) {
                data['image'] = image;
            }

            axios.post('http://10.6.0.10:9494/users/editmovie', data)
            .then(response => {
                if (!!response.data.status) {
                    goTo('/dashboard');
                }
            }).catch(err => {
                setError('An error occured when editing the movie.');
            });
        } else {
            axios.post('http://10.6.0.10:9494/users/addmovie', data)
            .then(response => {
                if (!!response.data.status) {
                    goTo('/dashboard');
                }
            }).catch(err => {
                setError('An error occured when adding the movie.');
            });
        }

    }

    return (
        <div>
            <div className="add-movie-container">
                <h1 className='heading-one'>Create a new movie</h1>
                <form onSubmit={handleSubmit} className='add-movie-form'>
                    <div className='image-upload'>
                        <input id='file-input' type='file' accept='image/*' onChange={handleImageUpload} className='file-input' />
                        <label>
                            {imagePreview ? (
                                <img src={imagePreview} alt="Movie" className='image-preview' />
                            ) : (
                                <div className='image-placeholder'>Drop an image here</div>
                            )}
                        </label>
                    </div>
                    <div className='movie-info'>
                        <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} className='input-field' />
                        <input type='text' placeholder='Publising year' value={year} onChange={(e) => setYear(e.target.value)} className='input-field' />
                        <div className='button-group'>
                            <button type='button' className='cancel-button' onClick={() => goTo('/dashboard')}>Cancel</button>
                            <button type='submit' className='submit-button'>Submit</button>
                        </div>
                    </div>
                    <div>{error}</div>
                </form>
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

export default NewMovieForm;
