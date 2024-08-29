import React, { useState } from 'react';
import ListMovies from './components/ListMovies/ListMovies';
import SearchBar from './components/SearchBar/SearchBar';
import TopMoviesCarousel from './components/TopMoviesCarousel/TopMoviesCarousel';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetail from './MovieDetail/MovieDetail';
import Navbar from './components/Navbar/NavBar';

function App() {
  const [filters, setFilters] = useState({
    limit: 20,
    page: 1,
    quality: '',
    minimum_rating: 0,
    query_term: '',
    genre: '',
    sort_by: 'date_added',
    order_by: 'desc',
    with_rt_ratings: false,
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  // Function to handle filter changes from SearchBar
  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  // Function to handle the search button click
  const handleSearchClick = () => {
    setAppliedFilters(filters);
  };

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <TopMoviesCarousel />
              <SearchBar
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearchClick={handleSearchClick}
              />
              <ListMovies filters={appliedFilters} />
            </div>
          }
        />
        <Route path="/movies/:movieId" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
