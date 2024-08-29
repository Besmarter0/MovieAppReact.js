import './SkeletonCard.css';

function SkeletonCard() {
  return (
    <div className="SkeletonCard">
      <div className="skeleton-cover"></div>
      <div className="skeleton-info">
        <div className="skeleton-title"></div>
        <div className="skeleton-details">
          <div className="skeleton-year"></div>
          <div className="skeleton-rating"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
