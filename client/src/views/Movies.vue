<template>
  <div>
    <vs-row class="px-1" vs-justify="space-between">
      <h1 class="page-title">The Sama Movies List</h1>
      <vs-button
        color="danger"
        type="gradient"
        icon="add"
        @click="showPopup = true"
        >Add an movie</vs-button
      >
    </vs-row>
    <div class="center grid">
      <vs-row vs-justify="flex-start" vs-w="12">
        <Movie
          :movie="movie"
          v-for="movie in movies"
          :key="movie.id"
          @delete="confirmDeletion"
          @update="prepareMovieUpdate"
        />
      </vs-row>
    </div>

    <vs-popup class="w-10" title="Add new movies" :active.sync="showPopup">
      <form>
        <div class=" my-1">
          <vs-input
            label="Title"
            v-model="editableMovie.title"
            type="text"
            class="w-100"
          />
        </div>

        <div class="my-1">
          <label for="" class="vs-input--label">About</label>
          <vs-textarea v-model="editableMovie.about" />
        </div>

        <div class="my-1">
          <vs-input
            label="Cover"
            id="movieCoverFile"
            ref="movieCoverFile"
            v-if="editableMovie.id === undefined"
            v-on:change="handleFileUpload"
            v-model="tmpCoverFile"
            type="file"
            class="w-100"
          />
        </div>

        <div class="my-1">
          <vs-row vs-justify="space-between">
            <vs-input
              label="Actor"
              v-model="actorName"
              type="text"
              class="w-90"
            />
            <vs-button
              class="btn-only mt-11"
              color="primary"
              icon="add"
              @click="addActorToList"
            ></vs-button>
          </vs-row>
        </div>

        <div v-if="actorsList.length > 0">
          <vs-list
            ><vs-list-header title="Actors list" color="dark"></vs-list-header>
            <vs-chip
              closable
              :title="actor"
              v-for="actor in actorsList"
              :key="actor"
              @click="removeActor(actor)"
            >
              <vs-avatar />
              {{ actor }}
            </vs-chip>
          </vs-list>
        </div>

        <div>
          <vs-row vs-justify="center"
            ><vs-button
              class="mt-11"
              color="success"
              icon="save"
              type="gradient"
              @click="addMovie"
              >{{
                editableMovie.id === undefined
                  ? "ADD THE MOVIE"
                  : "UPDATE THE MOVIE"
              }}</vs-button
            ></vs-row
          >
        </div>
      </form>
    </vs-popup>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Movies } from "../helpers/types";
import Movie from "@/components/Movie.vue";
import { fetchMovies, addMovie } from "../services/MoviesServices";

export default Vue.extend({
  name: "Movies",
  components: { Movie },
  data() {
    return {
      number: 0,
      showPopup: false,
      editableMovie: {
        title: "",
        about: "",
        cover: "",
        sentiment: "mood",
        actorsList: "",
        movieCoverFile: File,
      },
      actorName: "",
      actorsList: [] as string[],
      tmpCoverFile: "",
      store: undefined,
      movieToDelete: null,
    };
  },
  async mounted() {
    this.store = this.$store.direct;
    console.log("this.store:", this.store);
    await this.store.dispatch.movie.getMovies();
  },
  methods: {
    async getMovies(): Promise<Movies[]> {
      const resp = await fetchMovies();
      const movies = resp?.data;
      if (movies) {
        return movies as Movies[];
      } else {
        return [];
      }
    },
    addActorToList(): void {
      if (this.actorName !== "") {
        this.actorsList.push(this.actorName);
        this.actorName = "";
      }
    },
    removeActor(actor): void {
      const actorIndex = this.actorsList.findIndex(
        (element) => actor === element
      );
      this.actorsList.splice(0, 1);
      if (actorIndex) this.actorsList.splice(actorIndex, 1);
    },
    handleFileUpload() {
      const movieCoverFile = this.$refs.movieCoverFile["$refs"][
        "vsinput"
      ] as HTMLFormElement;
      this.editableMovie.movieCoverFile = movieCoverFile.files[0];
    },
    async addMovie(): Promise<void> {
      this.editableMovie.actorsList = "";
      this.actorsList.forEach((actor, index) => {
        if (index === this.actorsList.length - 1) {
          this.editableMovie.actorsList =
            this.editableMovie.actorsList + `${actor}`;
        } else {
          this.editableMovie.actorsList =
            this.editableMovie.actorsList + `${actor}-`;
        }
      });
      if (this.editableMovie.id !== undefined) {
        this.store.dispatch.movie.updateAnMovie(this.editableMovie);
      } else {
        this.store.dispatch.movie.addNewMovie(this.editableMovie);
      }
      // const resp = await addMovie(this.editableMovie);
    },
    confirmDeletion(movie: Movies) {
      const deleteMovie: Function = this.deleteTheMovie;
      this.movieToDelete = movie;
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirm`,
        text: "Do you really want to delete this movie ?",
        accept: deleteMovie,
        acceptText: "Yes",
        cancelText: "No",
      });
    },
    async deleteTheMovie(movie) {
      await this.store.dispatch.movie.deleteAnMovie(this.movieToDelete);
    },
    prepareMovieUpdate(movie: Movies) {
      this.editableMovie = JSON.parse(JSON.stringify(movie));
      this.actorsList = this.editableMovie.actorsList;
      this.showPopup = true;
    },
    async updateMovie() {},
  },

  computed: {
    movies(): Movies[] {
      if (this.store) return this.store.state.movie.movieList;
      else return [];
    },
  },
});
</script>

<style scoped>
.Movies-grid {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 0.5fr));
  grid-auto-rows: 40px;
}

h1 {
  color: #e2777a;
}

.w-100 {
  width: 100%;
}

.w-90 {
  width: 90%;
}

.mt-11 {
  margin-top: 11px;
}
</style>
