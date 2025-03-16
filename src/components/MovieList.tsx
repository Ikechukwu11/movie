import Card from "./Card";
import Spinner from "./Spinner";

interface MovieListProps {
  movies: object[];
  loading: boolean;
  errorMessage: string;
}

const MovieList: React.FC<MovieListProps> = ({ movies, loading, errorMessage }) => {
  return (
    <section className="all-movies">
      <h2 className="mt-[40px]">All Movies</h2>
      {loading ? (
        <Spinner />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <ul>
          {movies.map((movie: any) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default MovieList;
