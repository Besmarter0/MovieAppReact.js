/* eslint-disable react/prop-types */
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Card from '../Card/Card';
// import './ListMovies.css';
// import SkeletonCard from '../Skeletons/SkeletonCard';
// import { useNavigate } from 'react-router-dom';

// function ListMovies({ filters }) {
//   const [movies, setMovies] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false); // State to manage loading state
//   const navigate = useNavigate();
//   const [page, setPage] = useState(1); // State to track current page
//   const [hasMore, setHasMore] = useState(true); // State to check if more movies are available

//   const observer = useRef();

//   const lastMovieElementRef = useCallback(
//     (node) => {
//       if (loading) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore) {
//           setPage((prevPage) => prevPage + 1); // Increment the page number
//         }
//       });
//       if (node) observer.current.observe(node);
//     },
//     [loading, hasMore]
//   );

//   useEffect(
//     () => {
//       const getListMovies = async () => {
//         try {
//           setLoading(true); // Set loading to true when fetching data
//           const queryParams = new URLSearchParams();

//           // Append filter values
//           if (filters.limit !== 20) queryParams.append('limit', filters.limit);
//           if (filters.page !== 1) queryParams.append('page', filters.page);
//           if (filters.quality) queryParams.append('quality', filters.quality);
//           if (filters.minimum_rating > 0)
//             queryParams.append('minimum_rating', filters.minimum_rating);
//           if (filters.query_term)
//             queryParams.append('query_term', filters.query_term);
//           if (filters.genre) queryParams.append('genre', filters.genre);
//           if (filters.sort_by !== 'date_added')
//             queryParams.append('sort_by', filters.sort_by);
//           if (filters.order_by !== 'desc')
//             queryParams.append('order_by', filters.order_by);
//           if (filters.with_rt_ratings)
//             queryParams.append('with_rt_ratings', filters.with_rt_ratings);

//           const response = await fetch(
//             `https://yts.mx/api/v2/list_movies.json?${queryParams.toString()}`
//           );
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           const data = await response.json();
//           setMovies(data.data.movies);
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setLoading(false); // Set loading to false after data is fetched
//         }
//       };

//       getListMovies();
//     },
//     [filters],
//     setTimeout(5000)
//   );

//   if (loading) {
//     // Show skeletons while loading
//     return (
//       <div className="ListMovies">
//         {Array.from({ length: 10 }).map((_, index) => (
//           <SkeletonCard key={index} />
//         ))}
//       </div>
//     );
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!movies || movies.length === 0) {
//     return <div>No movies found.</div>;
//   }

//   // Directly use the movies state for rendering
//   return (
//     <div className="ListMovies">
//       {movies.map((movie) => (
//         <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-link">
//           <Card movie={movie} />
//         </Link>
//       ))}
//     </div>
//   );
// }

// export default ListMovies;
import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import SkeletonCard from '../Skeletons/SkeletonCard';
import './ListMovies.css';
import BackToTopButton from '../BackToTopButton/BackToTopButton';

function ListMovies({ filters }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // State to track current page
  const [hasMore, setHasMore] = useState(true); // State to check if more movies are available

  const observer = useRef();

  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // Increment the page number
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const getListMovies = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();

        // Append filter values
        queryParams.append('page', page); // Add current page to query params
        if (filters.limit) queryParams.append('limit', filters.limit);
        if (filters.quality) queryParams.append('quality', filters.quality);
        if (filters.minimum_rating)
          queryParams.append('minimum_rating', filters.minimum_rating);
        if (filters.query_term)
          queryParams.append('query_term', filters.query_term);
        if (filters.genre) queryParams.append('genre', filters.genre);
        if (filters.sort_by) queryParams.append('sort_by', filters.sort_by);
        if (filters.order_by) queryParams.append('order_by', filters.order_by);
        if (filters.with_rt_ratings)
          queryParams.append('with_rt_ratings', filters.with_rt_ratings);

        const response = await fetch(
          `https://yts.mx/api/v2/list_movies.json?${queryParams.toString()}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Check if data.data.movies exists and is an array
        const newMovies = data.data.movies || [];

        setMovies((prevMovies) => {
          // Reset movies if it's the first page, else append
          return page === 1 ? newMovies : [...prevMovies, ...newMovies];
        });

        setHasMore(newMovies.length > 0); // Check if there are more movies to load
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getListMovies();
  }, [filters, page]); // Include filters and page in dependencies

  // Reset movies and page when filters change
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [filters]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="ListMovies">
      {movies.map((movie, index) => {
        if (movies.length === index + 1) {
          // Attach the ref to the last movie element
          return (
            <Link
              ref={lastMovieElementRef}
              to={`/movies/${movie.id}`}
              key={movie.id}
              className="movie-link"
            >
              <Card movie={movie} />
            </Link>
          );
        } else {
          return (
            <Link
              to={`/movies/${movie.id}`}
              key={movie.id}
              className="movie-link"
            >
              <Card movie={movie} key={movie.id} />
            </Link>
          );
        }
      })}

      {loading && (
        <div className="SkeletonContainer">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}

      {!hasMore && <div className="EndOfList">No more movies to load.</div>}
      <BackToTopButton />
    </div>
  );
}

export default ListMovies;
