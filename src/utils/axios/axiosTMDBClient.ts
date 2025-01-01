import axios from "axios";

// Creating an axios instance with the base URL for TMDB
const axiosTMDBClient = axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
});

// Set authorization token from environment variable (ensure it's set correctly in the deployment environment)
const tokenStr = process.env.NEXT_PUBLIC_TMDB_API_TOKEN || "";

if (!tokenStr) {
  console.warn(
    "TMDB API token is missing! Please check your environment configuration."
  );
}

// Apply token for authorization
axiosTMDBClient.defaults.headers.common["Authorization"] = `Bearer ${tokenStr}`;

// Add a response interceptor for global error handling
axiosTMDBClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common API errors (like 404, 500) or network issues
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default axiosTMDBClient;
