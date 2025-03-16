const API_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_BASE_IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
 
const API_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`
  },
}

export { API_BASE_URL, API_BASE_IMAGE_URL, API_OPTIONS }