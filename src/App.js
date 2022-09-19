import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Movies from "./components/Movies";
import Movie from "./components/Movie";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <>
      <Navbar />
      <main className="mt-4 container">
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<Movie />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
