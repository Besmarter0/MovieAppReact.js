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
          <p>{movie.year}</p>
          <p>{movie.rating}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
