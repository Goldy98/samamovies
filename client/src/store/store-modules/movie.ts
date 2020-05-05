import {
  defineModule,
  defineMutations,
  defineActions,
  localActionContext,
} from "direct-vuex";
import { Movies } from "@/helpers/types";
import {
  fetchMovies,
  addMovie,
  deleteMovie,
  updateMovie,
} from "@/services/MoviesServices";

export interface MovieState {
  movieList: Movies[];
}

function initialState(): MovieState {
  return {
    movieList: [],
  };
}

const actions = defineActions({
  async getMovies(context) {
    const { commit } = movieActionContext(context);
    const movies = await fetchMovies();
    commit.SET_MOVIES(movies?.data as Movies[]);
    // Here, 'dispatch', 'commit', 'getters' and 'state' are typed.
  },
  async addNewMovie(context, movie) {
    const { commit } = movieActionContext(context);
    const newMovie = await addMovie(movie);
    commit.ADD_MOVIE(newMovie?.data.data);
  },
  async updateAnMovie(context, movie) {
    const { commit } = movieActionContext(context);
    const updatedMovie = await updateMovie(movie);
    commit.UPDATE_MOVIE(updatedMovie?.data);
  },
  async deleteAnMovie(context, movie: Movies) {
    console.log("this.deleteAnMovie called:");
    const { commit } = movieActionContext(context);
    if (await deleteMovie(movie)) commit.REMOVE_MOVIE(movie);
  },
});

const mutations = defineMutations<MovieState>()({
  SET_MOVIES(state, movies: Movies[]) {
    state.movieList = movies;
  },
  ADD_MOVIE(state, movie: Movies) {
    if (movie) state.movieList.unshift(movie);
  },
  UPDATE_MOVIE(state, movie: Movies) {
    const movieIndex = state.movieList.findIndex(
      (anMovie) => anMovie.id === movie.id
    );
    state.movieList.splice(movieIndex, 1, movie);
  },
  REMOVE_MOVIE(state, movie: Movies) {
    const movieIndex = state.movieList.findIndex(
      (aMovie) => aMovie.id === movie.id
    );
    state.movieList.splice(movieIndex, 1);
  },
});

const movie = defineModule({
  namespaced: true,
  state: initialState(),
  actions,
  mutations,
});

export default movie;
const movieActionContext = (context: any) => localActionContext(context, movie);
