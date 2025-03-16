import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
	.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
	.setProject(PROJECT_ID);

const database = new Databases(client);

interface Movie {
	id: string
	poster_path: string,
}

export const updateSearchCount = async (searchTerm: string, movie: Movie) => {
	/*
	** Use appwrit to check if search term already exists in the database
	*/
	try {
		const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
			Query.equal('searchTerm', searchTerm),
		]);

		if (result.documents.length > 0) {

			/*
			** If it exists in the database, update the count
			*/

			const doc = result.documents[0];
			await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
				count: doc.count + 1
			})

		} else {
			/*
			** if it does exist in the database,create new search term and update count to 1
			*/
			await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
				searchTerm: searchTerm,
				count: 1,
				movie_id: movie.id,
				poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
				
			})
		}
	} catch (error) {
		console.error('error');

	}
}

export const getTrendingMovies = async () => {
	try {
		const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
			Query.limit(5),
			Query.orderDesc('count'),
		]);

		return result.documents;
	} catch (error) {
		console.error('error');
	}
	
}