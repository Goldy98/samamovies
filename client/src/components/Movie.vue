<template>
  <!-- <div class="Movie">
    <img class="Movie-cover" :src="movie.cover" />
    <div class="Movie-info">
      <h4 class="Movie-title">{{ movie.title }}</h4>
      <div class="Movie-about">{{ movie.about }}</div>
    </div>
  </div> -->
  <vs-col vs-justify="center" vs-align="center" vs-w="3" vs-xs="12">
    <vs-card actionable class="cardx">
      <div slot="header">
        <vs-row vs-justify="space-between">
          <h3>
            {{ movie.title }}
          </h3>
          <vs-dropdown>
            <!-- <vs-button
              class="btn-drop"
              type="danger"
              icon="mood"
            ></vs-button> -->
            <vs-icon class="btn-drop" color="danger" icon="mood"></vs-icon>

            <vs-dropdown-menu>
              <vs-dropdown-item>
                <vs-icon class="" icon="mood"></vs-icon>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <vs-icon class="" icon="mood_bad"></vs-icon>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <vs-icon class="" icon="sentiment_dissatisfied"></vs-icon>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <vs-icon class="" icon="sentiment_satisfied"></vs-icon>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <vs-icon class="" icon="sentiment_very_dissatisfied"></vs-icon>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <vs-icon class="" icon="sentiment_very_satisfied"></vs-icon>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </vs-row>
      </div>
      <div slot="media">
        <img class="card-img" :src="coverUrl + movie.cover" />
      </div>
      <div>
        <span>{{ movie.about }}</span>
      </div>
      <div slot="footer">
        <vs-row vs-justify="flex-end">
          <vs-button
            class="mr-2 btn-only"
            color="warning"
            type="gradient"
            icon="edit"
            @click="requestUpdate"
          ></vs-button>
          <vs-button
            class="btn-only"
            color="danger"
            type="gradient"
            icon="delete"
            @click="requestDeletion"
          ></vs-button>
        </vs-row>
      </div>
    </vs-card>
  </vs-col>
  <!-- <tr>
    <td>{{ movie.id }}</td>
    <td>{{ movie.title }}</td>
    <td>{{ movie.description }}</td>
  </tr> -->
</template>

<script lang="ts">
import Vue from "vue";
import Movies from "../helpers/types";
import { API_URL } from "../services/Api";

export default Vue.extend({
  name: "Movie",
  data() {
    return {
      coverUrl: `${API_URL}/cover/`,
    };
  },
  methods: {
    requestDeletion() {
      this.$emit("delete", this.movie);
    },
    requestUpdate() {
      this.$emit("update", this.movie);
    },
  },
  props: {
    movie: {
      required: true,
    },
  },
});
</script>

<style scoped>
.Movie {
  width: 100px;
  border: solid 1px red;
  margin: 5px;
  border-radius: 10px;
}

.Movie-cover {
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.Movie-info {
}
.Movie-title {
  margin: 10px;
  text-align: center;
  color: aquamarine;
}
.Movie-about {
  padding: 5px;
  color: white;
  text-align: justify;
  word-wrap: normal;
}

.card-img {
  max-height: 300px;
}

.cardx {
  width: 90%;
  margin: 15px;
}

.btn-drop {
  padding-right: 7px;
  border-radius: 0px 5px 5px 0px;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
