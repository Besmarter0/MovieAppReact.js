import React from 'react';
import './CustomModal.css'; // Update this CSS file for styling

const CustomModal = ({ isOpen, onClose, movie }) => {
  if (!movie) return null;

  const trailerUrl = movie.yt_trailer_code
    ? `https://www.youtube.com/embed/${movie.yt_trailer_code}`
    : null;
  return (
    <div className={`custom-modal ${isOpen ? 'open' : ''}`}>
      <div className="custom-modal-overlay" onClick={onClose}></div>
      <div className="custom-modal-content">
        <button className="custom-modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          <div className="modal-image">
            <img
              src={movie.large_cover_image}
              alt={movie.title}
              className="custom-modal-image"
            />

            <a href="#">Watch It Now</a>
          </div>
          <div className="modal-info">
            <h2>{movie.title}</h2>
            <p>
              <strong>Rating:</strong> {movie.rating}
            </p>
            <p>
              <strong>Language:</strong> {movie.language}
            </p>
            <p>
              <strong>Year:</strong> {movie.year || 'No Date Regonised '}
            </p>
            <p>
              <strong>genres:</strong>{' '}
              {movie.genres.map((g) => <span>{g} </span>) ||
                'Not Summary Found'}
            </p>
            <p>
              <strong>Description:</strong>{' '}
              {movie.summary || 'Not Summary Found'}
            </p>
            {trailerUrl && (
              <div className="modal-trailer">
                <h3>Trailer</h3>
                <iframe
                  width="100%"
                  height="315"
                  src={trailerUrl}
                  title={`${movie.title} Trailer`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            <div className="modal-actions">
              <a
                href={movie.url}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-movie-button"
              >
                Watch Movie
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
