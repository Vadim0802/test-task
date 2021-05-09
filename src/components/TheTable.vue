<template>
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
      <tr v-for="(item, idx) in users" :key="idx">
        <th scope="row">{{ idx }}</th>
        <td>{{ item.name }}</td>
        <td>{{ item.height }}</td>
        <td>{{ item.mass }}</td>
        <td>{{ item.created }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getUsers } from "../api.js";

export default {
  data() {
    return {
      users: [],
    };
  },

  mounted() {
    getUsers("https://swapi.dev/api/people").then((res) => {
      this.users = res;
    });
  },
};
</script>

<style></style>
