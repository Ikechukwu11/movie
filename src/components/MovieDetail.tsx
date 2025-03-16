import { useState } from "react";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { movieProviders } from "../api/video-providers";


interface MovieDetailsProps {
	movie: any;
	loading: boolean;
}

const MovieDetail: React.FC<MovieDetailsProps> = ({ movie, loading }) => {
	if (loading) return <Spinner />;
	if (!movie) return <p className="text-red-500">Movie not found.</p>;

	const [iframeVideo, setIframeVideo] = useState<any>({ video: '', title: '', type: 'youtube' });

	//const [showDropdown, setShowDropdown] = useState(false);

	// const handleWatchNow = () => {
	// 	setShowDropdown(!showDropdown); // Toggle dropdown visibility
	// };

	const handleProviderSelect = (provider: any) => {
		//setSelectedProvider(provider);
		//const provider = randomProvider();
		setIframeVideo({ video: ``, title: ``, type: 'youtube' });
		setIframeVideo({ video: `${provider.url}${movie.id}`, title: `${provider.name}`, type: 'embed' }); // Show the movie when a provider is selected
		//setShowDropdown(false); // Hide the dropdown
	};

	const randomProvider = () => {
		const randomIndex = Math.floor(Math.random() * movieProviders.length);
		return movieProviders[randomIndex];
	};




	return (
		<div className="movie-details">
			<div className="movie-poster">			
				<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
			</div>

			<div className="movie-info">
				<h1>{movie.title}</h1>
				<p>{movie.overview}</p>
				<p><strong>Release Date:</strong> {movie.release_date}</p>
				<p className="flex items-center gap-1"><strong>Rating:</strong> 
					<span className="flex items-center gap-1">
						{Array.from({ length: Math.round(movie.vote_average) }, (_, i) => (
							<img className="w-4 h-4" key={i} src="/star.svg" alt="Star Icon" />
						))}
						{/*{movie.vote_average.toFixed(1)}*/}
					</span>
				</p>
				<p><strong>Genres:</strong> {movie.genres.map((genre: any) => genre.name).join(', ')}</p>

				<div className="mt-4 w-full">
					{movie.videos.results.length > 0 && (
						<>
							{
								iframeVideo.type === 'youtube' && (
									movie.videos.results.map((video: any) => (
										video.type === 'Trailer' && video.site === 'YouTube' && video.official ? (
											<iframe
												key={video.key} // Add a unique key for each video
												className="trailer"
												height="315"
												src={iframeVideo.video ? iframeVideo.video : `https://www.youtube.com/embed/${video.key}`}
												title={iframeVideo.title}
												frameBorder="0"
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
												referrerPolicy="strict-origin-when-cross-origin"
												allowFullScreen
											></iframe>
										) : null
									))
								) 
							}
						</>
					
					)}

					{iframeVideo.type !== 'youtube' &&
						<iframe
							className="trailer"
							height="315"
							src={iframeVideo.video} // This should be the actual movie video URL
							title={iframeVideo.title}
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						></iframe>
					}
				</div>

				<div className="extra">
					<button className="back-btn">
						<Link to="/">Back to movies</Link>
					</button>
					<button
						className="watch-btn"
						//onClick={() => setIframeVideo({ video: `https://embed.su/embed/movie/${movie.id}`, title: `${movie.title}`, type: 'embed' })}
						onClick={() => handleProviderSelect(randomProvider())}
					>
						Watch Now
					</button>
				</div>
			</div>


		</div >
	);
};

export default MovieDetail;
