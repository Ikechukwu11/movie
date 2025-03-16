import { useState, useEffect, useRef, useCallback } from "react";
import Search from "../components/Search"
import Spinner from "../components/Spinner";
import Card from "../components/Card";
import useDebounce from "../hooks/useDebounce";
import { getTrendingMovies } from "../api/appwrite";
import Trending from "../components/Trending";
import { fetchMovies } from "../api/movie";

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string>('');

  const [movies, setMovies] = useState<object[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

 
  const debouncedSearchTerm = useDebounce(searchTerm, 1000); // Adjust the delay as needed



  const loadTrendingMovies = async () => {
    try {
      const response: any = await getTrendingMovies();
      setTrendingMovies(response);
      //console.log(response);
    } catch (error) {
      console.error(error);
    }
    
  }

  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieRef = useCallback(
    (node: HTMLLIElement | HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage((prevPage) => prevPage + 1); // Load next page
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, totalPages]
  );

  // useEffect(() => {
  //   loadMovies(debouncedSearchTerm);
  // }, [debouncedSearchTerm]); // Use the debounced value here

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const { movies: newMovies, totalPages } = await fetchMovies(debouncedSearchTerm, page);
        setMovies((prev) => (page === 1 ? newMovies : [...prev, ...newMovies]));
        setTotalPages(totalPages);
        setLoading(false);
      } catch (error: any) {
        setErrorMessage(error || 'Something went wrong');
      }
    };

    loadMovies();
  }, [debouncedSearchTerm, page]);

  useEffect(() => {
    loadTrendingMovies();
  }, []); // Use the debounced value here


  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Baner" />
          <h1>Find <span className="text-gradient">Movies</span> You will Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="trending">
          {trendingMovies?.length > 0 &&
            <Trending trendingMovies={trendingMovies} />
          }
        </section>

        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>
          {/* {loading ? (<Spinner />) : errorMessage ? 
            (<p className="text-red-500">{errorMessage}</p>) :
            (
              <ul>
                {movies?.map((movie: any, index) => (
                  <Card key={movie.id} movie={movie} ref={index === movies.length - 1 ? lastMovieRef : undefined} // Attach observer to last movie
                  />
                ))}
              </ul>
            )
          }*/}
          <ul>
            {movies.map((movie: any, index) => (
              <Card
                key={index}
                movie={movie}
                ref={index === movies.length - 1 ? lastMovieRef : undefined} // Attach observer to last movie
              />
            ))}
          </ul>
          {loading && <Spinner />}
          <p className="text-red-500">{errorMessage}</p>
        </section>
      </div>
    </main>
  )
}

export default Home
