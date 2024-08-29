import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';
function MovieDetail() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async (movieId) => {
      try {
        const response = await fetch(
          `https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setMovieDetails(data.data.movie);
      } catch (err) {
        console.error('Failed to fetch movie details:', err);
        setError(err.message);
      }
    };

    if (movieId) {
      fetchMovieDetails(movieId);
    }
  }, [movieId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${movieDetails.background_image_original})`,

        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        padding: '20px',
        color: '#fff',
        minHeight: '100vh',
      }}
      className="MainConatiner Glass"
    >
      {/* Video Player at the Top */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <video
          id="torrent-video"
          controls
          style={{
            width: '60%',
            height: '500px',
            backgroundColor: '#000',
            borderRadius: '10px',
          }}
        ></video>
      </div>

      {/* Movie Details Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        className="DetailsSection"
      >
        {/* Movie Thumbnail and Cover Images */}
        <div style={{ flex: 1 }}>
          <img
            src={movieDetails.large_cover_image}
            alt={movieDetails.title}
            style={{
              width: '60%',
              height: 'auto',
              borderRadius: '10px',
              marginBottom: '20px',
            }}
          />
          {/* Displaying the additional small cover images */}
          {/* <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10px',
            }}
          >
            <img
              src={movieDetails.small_cover_image}
              alt="Small Cover"
              style={{ width: '30%', borderRadius: '5px' }}
            />
            <img
              src={movieDetails.medium_cover_image}
              alt="Medium Cover"
              style={{ width: '30%', borderRadius: '5px' }}
            />
            <img
              src={movieDetails.large_cover_image}
              alt="Large Cover"
              style={{ width: '30%', borderRadius: '5px' }}
            />
          </div> */}
        </div>

        {/* Movie Information */}
        <div style={{ flex: 2, paddingLeft: '20px', lineHeight: '1.6' }}>
          <h1>
            {movieDetails.title} ({movieDetails.year})
          </h1>
          <p>
            <strong>Rating:</strong> {movieDetails.rating}
          </p>
          <p>
            <strong>Genres:</strong> {movieDetails.genres.join(', ')}
          </p>
          <p>
            <strong>Description:</strong>{' '}
            {movieDetails.description_full || 'no description avalibale '}
          </p>
          <p>
            <strong>IMDB Code:</strong> {movieDetails.imdb_code}
          </p>
          <p>
            <strong>Language:</strong> {movieDetails.language}
          </p>
          <p>
            <strong>Runtime:</strong> {movieDetails.runtime} minutes
          </p>
          <p>
            <strong>MPA Rating:</strong> {movieDetails.mpa_rating}
          </p>
          <p>
            <strong>Likes:</strong> {movieDetails.like_count}
          </p>
        </div>

        {/* Torrent Download Section */}
        <div className="Glass torrentDownload">
          <h3>Available Torrents</h3>
          {movieDetails.torrents.map((torrent) => (
            <button
              key={torrent.hash}
              onClick={() => {
                const magnetURI = `magnet:?xt=urn:btih:${
                  torrent.hash
                }&dn=${encodeURIComponent(
                  movieDetails.title
                )}&tr=udp://tracker.openbittorrent.com:80`;
                window.location.href = magnetURI; // Direct user to download torrent
              }}
              style={{
                margin: '10px',
                padding: '10px 20px',
                cursor: 'pointer',
                backgroundColor: '#1db954',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              Download {torrent.quality}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
