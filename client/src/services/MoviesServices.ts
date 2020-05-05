import { AxiosResponse } from "axios";
import { apiRequest } from "./Api";
import { Movies } from "@/helpers/types";

export async function fetchMovies(): Promise<AxiosResponse | undefined> {
  try {
    return await apiRequest("GET", "movies");
  } catch (error) {
    console.log("error:", error);
  }
}

export async function addMovie(movie): Promise<AxiosResponse | undefined> {
  const movieData = new FormData();
  Object.entries(movie).forEach((entrie) => {
    movieData.set(entrie[0], movie[entrie[0]]);
  });

  try {
    return await apiRequest("POST", "movies", movieData, true);
  } catch (error) {
    console.log("error:", error);
  }
}
export async function updateMovie(
  movie: Movies
): Promise<AxiosResponse | undefined> {
  try {
    return await apiRequest("PATCH", "movies", movie);
  } catch (error) {
    console.log("error:", error);
  }
}

export async function deleteMovie(
  movie: Movies
): Promise<AxiosResponse | undefined> {
  try {
    return await apiRequest("DELETE", `movies/${movie.id}`, movie);
  } catch (error) {
    console.log("error:", error);
  }
}
