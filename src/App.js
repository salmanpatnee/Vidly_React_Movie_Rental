import React, { Component } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Movies from "./components/Movies";
import Movie from "./components/Movie";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Logout from './components/Logout';
import MovieForm from "./components/MovieForm";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {  } 

  componentDidMount() {
    try {
      const user = JSON.parse(localStorage.getItem("auth_user"));
      console.log(user);  
      this.setState({user});
      
    } catch (error) {}
  }

  render() { 
    return (
      <>
      <ToastContainer />
      <Navbar user={this.state.user}/>
      <main className="mt-4 container">
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/movies/new" element={<MovieForm />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieForm />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
    );
  }
}
 
export default App;