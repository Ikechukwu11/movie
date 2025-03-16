import { API_BASE_IMAGE_URL, API_BASE_URL, API_OPTIONS } from ".";

// export const fetchMovies = async (query: string = '') => {
// 	setLoading(true);
// 	setErrorMessage('');
// 	try {
// 		const endpoint = query 
// 			? `${API_BASE_IMAGE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
// 		const response = await fetch(endpoint, API_OPTIONS);

// 		if (!response.ok) {
// 			throw new Error('Failed to fetch movies');
// 		}
// 		const data = await response.json();

// 		if (data.Response === 'False') {
// 			setErrorMessage(data.Error || 'Failed to fetch movies');
// 			setMovies([]);
// 			return;
// 		}

// 		setMovies(data.results || []);

// 		if (query && data.results.length > 0) {
// 			await updateSearchCount(query, data.results[0]);
// 		}

// 	} catch (error) {
// 		console.error(error);
// 		setErrorMessage('Failed to fetch movies. Please try again later.');
// 	} finally {
// 		setLoading(false)
// 	}
// }

// export const loadTrendingMovies = async () => {
// 	try {
// 		const response: any = await getTrendingMovies();
// 		setTrendingMovies(response);
// 		//console.log(response);
// 	} catch (error) {
// 		console.error(error);
// 	}
    
// }

export const fetchMovies = async (query: string = "", page: number = 1) => {
	try {
		const endpoint = query
			? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
			: `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

		const response = await fetch(endpoint, API_OPTIONS);
		if (!response.ok) throw new Error("Failed to fetch movies");

		const data = await response.json();
		return {
			movies: data.results || [],
			totalPages: data.total_pages,
		};
	} catch (error) {
		console.error("Error fetching movies:", error);
		return { movies: [], totalPages: 0 };
	}
};


export const fetchMovieDetails = async (movieId: string) => {

	console.error(movieId, API_BASE_IMAGE_URL, API_BASE_URL, API_OPTIONS)
	try {
		const response = await fetch(`${API_BASE_URL}/movie/${movieId}?append_to_response=videos`, API_OPTIONS);
		if (!response.ok) throw new Error("Failed to fetch movie details");

		return await response.json();
	} catch (error) {
		console.error("Error fetching movie details:", error);
		return null;
	}
};

// Fetch cast details separately
export const fetchMovieCast = async (movieId: string) => {
	try {
		const response = await fetch(`${API_BASE_URL}/movie/${movieId}/credits`, API_OPTIONS);
		if (!response.ok) throw new Error("Failed to fetch cast");

		const data = await response.json();
		return data.cast || []; // Return only the cast array
	} catch (error) {
		console.error("Error fetching cast:", error);
		return [];
	}
};