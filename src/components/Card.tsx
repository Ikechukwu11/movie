import { Link } from "react-router-dom";
import { forwardRef } from "react";
interface CardProps {
	movie: {
		id: number;
		title: string;
		vote_average: number;
		poster_path: string;
		release_date: string;
		original_language: string;
	}
}

// const Card: React.FC<CardProps> = ({ movie: { id, title, vote_average, poster_path, release_date, original_language } }: any, ref) => {
const Card = forwardRef<HTMLLIElement, CardProps>(({ movie }, ref) => {
	return (
		<div className="movie-card" ref={ref}>
			<Link to={`/movie/${movie.id}`}>
				<img alt={movie.title} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie-poster.png'} />
			
				<div className="mt-4">
					< h3 >{movie.title}</h3>
				</div>

				<div className="content">
					<div className="rating">
						<img src="/star.svg" alt="Star Icon" />
						<p>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
					</div>
					<span>•</span>
					<p className="lang">{movie.original_language}</p>
					<span>•</span>
					<p className="year">{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
				</div>

			</Link>

		</div>
	)
});																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																												

export default Card
