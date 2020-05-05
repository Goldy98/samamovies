interface Movies {
  id: number;
  title: string;
  about: string;
  cover?: string;
  actorsList: string[];
}
import { fetchMovies } from "../../services/MoviesServices";

export default {
  async getMovies({ commit }): Promise<void> {
    console.log("getMovies");
    const movieList = await fetchMovies();
    commit("SET_MOVIES", movieList ?? []);
  },
};
