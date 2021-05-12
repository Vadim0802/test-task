<template>
  <div class="d-flex justify-content-between">
    <div class="d-flex justify-content-start">
      <div class="me-4">
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
      <div class="me-4">
        <label class="h4" for="sort">Sort</label>
        <select
          id="sort"
          class="form-select mb-3"
          aria-label="Default select example"
          v-model="sortType"
        >
          <option value="name">Name</option>
          <option value="created">Created</option>
        </select>
      </div>
      <v-table-search v-model="form"></v-table-search>
    </div>
    <v-pagination
      :tableRowsCounter="users.length"
      :perPage="perPage"
      :currentPage="currentPage"
      @change-page="changePage"
      v-if="users.length !== 0"
    ></v-pagination>
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
        <td>{{ item.created.toDateString() }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import VPagination from "./VPagination.vue";
import VTableSearch from "./VTableSearch.vue";
import { getUsers } from "../api.js";
import { sort } from "../utils.js";

export default {
  components: {
    VPagination,
    VTableSearch,
  },

  data() {
    return {
      users: [],
      perPage: 9,
      currentPage: 1,
      sortType: "",
      form: {
        typeOfSearchField: "",
        searchString: "",
      },
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
    filteredUsers() {
      return this.users.filter((user) => {
        return user[this.form.typeOfSearchField].includes(
          this.form.searchString
        );
      });
    },

    usersOnPage() {
      const begin = this.perPage * this.currentPage - this.perPage;
      const end = this.perPage * this.currentPage;

      return this.users.slice(begin, end);
    },

    currentBeginIndexesOfPage() {
      return this.perPage * this.currentPage - this.perPage;
    },
  },

  watch: {
    sortType(value) {
      const type = typeof this.users[0][value];
      this.users = sort(value, type)(this.users);
    },
  },
};
</script>

<style></style>
