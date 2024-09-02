/* eslint-disable react/prop-types */

import  { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import arrow icons
import CustomModal from '../CustomModal/CustomModal.jsx'; // Import the custom modal component
import './TopMoviesCarousel.css';

function TopMoviesCarousel() {
  const [topMovies, setTopMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await fetch(
          'https://yts.mx/api/v2/list_movies.json?limit=20&page=1&sort_by=like_count&order_by=desc'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTopMovies(data.data.movies);
      } catch (err) {
        console.error('Failed to fetch top movies:', err);
        setError(err.message);
      }
    };

    fetchTopMovies();
  }, []);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <FaArrowRight className={`${className} custom-arrow`} onClick={onClick} />
    );
  };

  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <FaArrowLeft className={`${className} custom-arrow`} onClick={onClick} />
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, // Show fewer slides to make it smaller
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (topMovies.length === 0) {
    return <div>Loading top movies...</div>;
  }

  return (
    <div className="TopMoviesCarousel">
      <h2>Top Movies</h2>
      <Slider {...settings}>
        {topMovies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => openModal(movie)}
          >
            <div className="movie-card-inner">
              <img src={movie.medium_cover_image} alt={movie.title} />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>Rating: {movie.rating}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom Modal for Movie Details */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        movie={selectedMovie}
      />
    </div>
  );
}

export default TopMoviesCarousel;
