import React, { useState } from 'react';
import axios from 'axios';

import wave from '../assets/wave1.svg';
import wave2 from '../assets/wave2.svg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const goTo = (route) => {
        navigate(route);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        let data = {
            username: email,
            password: password
        }

        axios.post('http://10.6.0.10:9494/users/login', data)
        .then(response => {
            setEmail('');
            setPassword('');
            // const { token } = response.data.token;
            // localStorage.setItem('token', token);
            // on success -> go to dashboard page
            if (!!response.data.status) {
                localStorage.setItem('userData', JSON.stringify(response.data.userData));
                localStorage.setItem('isLoggedIn', true);
                goTo('/dashboard');
            }
        }).catch(err => {
            setEmail('');
            setPassword('');
            setError('Invalid username or password. Please try again.');
        });
    }

    return (
        <div>
            <div className="container text-center">
                <div className="card" style={{ maxWidth: '400px', margin: 'auto' }}>
                    <h1>Sign in</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="spacing-md">
                            <input type="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="spacing-md">
                            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="spacing-md" style={{ display: 'inline-flex' }}>
                            <input type="checkbox" id="rememberMe" style={{ flex: 1, marginRight: '10px' }} />
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>
                        <div className='spacing-lg'>
                            <button type="submit">Login</button>
                        </div>
                        <div>{error}</div>
                    </form>
                </div>
            </div>
            <div className='wave-container'>
                <img src={wave} className="wave wave1" alt="wave" />
                <img src={wave2} className="wave wave2" alt="wave" />
            </div>
        </div>
    )
}

export default Home;
