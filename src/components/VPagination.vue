<template>
  <nav class="d-flex align-items-end" aria-label="Page navigation example">
    <ul class="pagination">
      <li
        class="page-item"
        v-if="hasPreviousPage"
        @click="changeCurrentPage(currentPage - 1)"
      >
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-if="hasPreviousPage"
        @click="changeCurrentPage(currentPage - 1)"
      >
        <a class="page-link" href="#">{{ currentPage - 1 }}</a>
      </li>
      <li class="page-item active">
        <a class="page-link" href="#">{{ currentPage }}</a>
      </li>
      <li
        class="page-item"
        v-if="hasNextPage"
        @click="changeCurrentPage(currentPage + 1)"
      >
        <a class="page-link" href="#">{{ currentPage + 1 }}</a>
      </li>
      <li
        class="page-item"
        v-if="hasNextPage"
        @click="changeCurrentPage(currentPage + 1)"
      >
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    tableRowsCounter: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },

  emits: {
    "change-page": null,
  },

  methods: {
    changeCurrentPage(numPage) {
      this.$emit("change-page", numPage);
    },
  },

  computed: {
    maxPages() {
      return (
        Math.floor(this.tableRowsCounter / this.perPage) +
        (this.tableRowsCounter % this.perPage === 0 ? 0 : 1)
      );
    },

    hasNextPage() {
      return this.currentPage < this.maxPages;
    },

    hasPreviousPage() {
      return this.currentPage > 1;
    },
  },
};
</script>
