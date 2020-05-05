import { Movies } from "../../helpers/types";
export default {
  SET_MOVIES(state, movieList: Movies[]): void {
    state.movies = movieList;
  },
};
