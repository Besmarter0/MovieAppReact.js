import React from 'react';
import './SearchBar.css'; // Assuming CSS is imported for styling

function SearchBar({ filters, onFilterChange, onSearchClick }) {
  return (
    <div className="SearchBar">
      {/* Search term input */}
      <input
        type="text"
        placeholder="Search by name, actor, or director"
        value={filters?.query_term || ''}
        onChange={(e) => onFilterChange('query_term', e.target.value)}
        className="search-input"
      />

      {/* Genre dropdown */}
      <select
        value={filters?.genre}
        onChange={(e) => onFilterChange('genre', e.target.value)}
        className="search-select"
      >
        <option value="">All Genres</option>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
        <option value="horror">Horror</option>
        <option value="sci-fi">Sci-Fi</option>
        {/* Add more genres as needed */}
      </select>

      {/* Quality dropdown */}
      <select
        value={filters?.quality}
        onChange={(e) => onFilterChange('quality', e.target.value)}
        className="search-select"
      >
        <option value="">All Qualities</option>
        <option value="480p">480p</option>
        <option value="720p">720p</option>
        <option value="1080p">1080p</option>
        <option value="1080p.x265">1080p.x265</option>
        <option value="2160p">2160p</option>
        <option value="3D">3D</option>
      </select>

      {/* Minimum rating dropdown */}
      <select
        value={filters?.minimum_rating}
        onChange={(e) =>
          onFilterChange('minimum_rating', parseInt(e.target.value))
        }
        className="search-select"
      >
        <option value="0">All Ratings</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
        <option value="4">4+</option>
        <option value="5">5+</option>
        <option value="6">6+</option>
        <option value="7">7+</option>
        <option value="8">8+</option>
        <option value="9">9+</option>
      </select>

      {/* Sort by dropdown */}
      <select
        value={filters?.sort_by}
        onChange={(e) => onFilterChange('sort_by', e.target.value)}
        className="search-select"
      >
        <option value="date_added">Date Added</option>
        <option value="title">Title</option>
        <option value="year">Year</option>
        <option value="rating">Rating</option>
        <option value="peers">Peers</option>
        <option value="seeds">Seeds</option>
        <option value="download_count">Download Count</option>
        <option value="like_count">Like Count</option>
      </select>

      {/* Order by dropdown */}
      <select
        value={filters?.order_by}
        onChange={(e) => onFilterChange('order_by', e.target.value)}
        className="search-select"
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>

      {/* Rotten Tomatoes ratings toggle */}
      <label className="toggle-label">
        <input
          type="checkbox"
          checked={filters?.with_rt_ratings}
          onChange={(e) => onFilterChange('with_rt_ratings', e.target.checked)}
          className="search-checkbox"
        />
        With RT Ratings
      </label>

      {/* Limit dropdown */}
      <select
        value={filters?.limit}
        onChange={(e) => onFilterChange('limit', parseInt(e.target.value))}
        className="search-select"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>

      {/* Page dropdown */}
      <select
        value={filters?.page}
        onChange={(e) => onFilterChange('page', parseInt(e.target.value))}
        className="search-select"
      >
        <option value="1">Page 1</option>
        <option value="2">Page 2</option>
        <option value="3">Page 3</option>
        <option value="4">Page 4</option>
        {/* Add more pages as needed */}
      </select>

      {/* Search button */}
      <button onClick={onSearchClick} className="search-button">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
