const Trending: React.FC = ({ trendingMovies }: any) => {

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

// import Trending from "./Trending";

// interface TrendingMoviesProps {
//   movies: object[];
// }

// const TrendingMovies: React.FC<TrendingMoviesProps> = ({ movies }) => {
//   if (movies.length === 0) return null;

//   return (
//     <section className="trending">
//       <Trending trendingMovies={movies} />
//     </section>
//   );
// };

// export default TrendingMovies;
