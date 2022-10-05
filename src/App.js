import { ToastContainer } from "react-toastify";
import React, { Component } from "react";
import auth from "./services/AuthService";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Movies from "./components/Movies";
import Customers from "./pages/customers/Customers";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/Logout";
import MovieForm from "./components/MovieForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from './components/common/ProtectedRoute';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrrentUser();
    this.setState({ user });
  }

  render() {
    const {user} = this.state;
    return (
      <>
        <ToastContainer />
        <Navbar user={user} />
        <main className="mt-4 container">
          <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="/movies/new" element={
                <ProtectedRoute>
                  <MovieForm />
                </ProtectedRoute>
              }
            />
            <Route path="/movies" element={<Movies user={user}/>} />
            <Route path="/movies/:id" element={
                <ProtectedRoute>
                  <MovieForm />
                </ProtectedRoute>
              }
            />
            
            <Route path="/customers" element={<Customers />} />
            <Route path="/" element={<Navigate to="/movies" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </>
    );
  }
}

export default App;
