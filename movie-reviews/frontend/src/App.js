import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Movie from './components/movie';
import Movieslist from './components/movies-list';
import Login from './components/login';
import AddReview from './components/add-review';
import { Nav, Navbar } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link><Link to={"/movies"}>Movies</Link></Nav.Link>
            <Nav.Link>
              {
                false ? (<a>Logout User</a>) : (<Link to={'/login'}>Login</Link>)
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default App;
