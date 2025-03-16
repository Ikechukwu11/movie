import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Ensure you have React Router set up
import { fetchMovieDetails, fetchMovieCast } from "../api/movie";
import MovieDetail from "../components/MovieDetail";
import MovieCast from "../components/MovieCast";
import { updateSearchCount } from "../api/appwrite";

const Details: React.FC = () => {
	const { id } = useParams<{ id: string }>(); // Get movie ID from URL
	const [movie, setMovie] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [cast, setCast] = useState<any[]>([]);

	console.log(id)

	useEffect(() => {
		const loadMovie = async () => {
			setLoading(true);
			const movieData = await fetchMovieDetails(id);
			setMovie(movieData);
			setLoading(false);

			// Fetch cast separately without blocking movie details
			if (id) {
				fetchMovieCast(id).then(setCast);
				updateSearchCount(movieData.title, movieData);
			}
		};

		if (id) loadMovie();
	}, [id]);

	return (
		<main>
			<div className="pattern" />
			<div className="wrapper">
				<MovieDetail movie={movie} loading={loading} />
				<MovieCast cast={cast} /> {/* Render cast list separately */}
			</div>

		</main >
	);
}

export default Details