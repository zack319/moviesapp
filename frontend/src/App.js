import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const Home = React.lazy(() => import('./views/Home'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const NewMovieForm = React.lazy(() => import('./views/NewMovieForm'));

// Pages
// May include different actual pages outside of the SPA

function App () {

  const isLoggedIn = localStorage.getItem('userData') ? true : false;
  console.log(isLoggedIn);

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Routes>
          <Route path="/" name="Home" element={ <Home />} />
          <Route path="/dashboard" name="Dashboard" element={ isLoggedIn ? <Dashboard /> : <Home />} />
          <Route path="/addmovie" name="Add Movie" element={ isLoggedIn ? <NewMovieForm /> : <Home />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App;
