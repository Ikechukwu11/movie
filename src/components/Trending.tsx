const Trending: React.FC = ({ trendingMovies }: any) => {
	console.log(trendingMovies);
	return (
		<div>
			<h2>Trending Movies</h2>
			<ul>
				{trendingMovies.map((movie: any, index: any) => (

					<li key={index}>
						<p>{index + 1}</p>
						<img alt='Trending Movie' src={movie.poster_url} />

					</li>
				
				))}
			</ul>
		</div>

	)
}

export default Trending