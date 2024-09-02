/* eslint-disable react/prop-types */
import './Card.css';
function Card({ movie }) {
  return (
    <div className="Card">
      <div className="coverImage">
        <img src={movie.medium_cover_image} alt={movie.title} loading="lazy" />
      </div>
      <div className="infoCard">
        <h3>{movie.title}</h3>
        <div className="Rating_year">
          <span>{movie.year}</span>
          <span>{movie.rating}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
