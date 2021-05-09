<template>
  <div class="d-flex justify-content-between">
    <div>
      <label class="h4" for="per-page">Per page</label>
      <select
        id="per-page"
        class="form-select mb-3"
        aria-label="Default select example"
        v-model.number="perPage"
      >
        <option v-for="n in 9" :key="n" :value="n">{{ n }}</option>
      </select>
    </div>
    <app-pagination
      :tableRowsCounter="users.length"
      :perPage="perPage"
      :currentPage="currentPage"
      @change-page="changePage"
    ></app-pagination>
  </div>
  <table class="table table-striped">
    <thead class="table-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Height</th>
        <th scope="col">Mass</th>
        <th scope="col">Created</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, idx) in usersOnPage" :key="idx">
        <th scope="row">{{ currentBeginIndexesOfPage + idx + 1 }}</th>
        <td>{{ item.name }}</td>
        <td>{{ item.height }}</td>
        <td>{{ item.mass }}</td>
        <td>{{ item.created }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import AppPagination from "./AppPagination.vue";
import { getUsers } from "../api.js";

export default {
  components: {
    AppPagination,
  },

  data() {
    return {
      users: [],
      perPage: 9,
      currentPage: 1,
    };
  },

  async created() {
    await getUsers("https://swapi.dev/api/people").then((res) => {
      this.users = res;
    });
  },

  methods: {
    changePage(newPage) {
      this.currentPage = newPage;
    },
  },

  computed: {
    usersOnPage() {
      const begin = this.perPage * this.currentPage - this.perPage;
      const end = this.perPage * this.currentPage;

      return this.users.slice(begin, end);
    },

    currentBeginIndexesOfPage() {
      return this.perPage * this.currentPage - this.perPage;
    },
  },
};
</script>

<style></style>
