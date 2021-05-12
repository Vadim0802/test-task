<template>
  <div class="me-4">
    <label class="h4 text-center" for="search">Search</label>
    <div class="d-flex justify-content-start align-items-start">
      <select
        id="search"
        class="form-select mb-3 me-4 w-50"
        aria-label="Default select example"
        :value="modelValue.typeOfSearchField"
        @change="updateSelectField"
      >
        <option value="name">Name</option>
        <option value="height">Height</option>
        <option value="mass">Mass</option>
        <option value="created">Created</option>
      </select>
      <input
        type="text"
        class="form-control"
        placeholder="Input search string"
        :disabled="!modelValue.typeOfSearchField"
        :value="modelValue.searchString"
        @input="updateInputField"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["modelValue"],

  emits: {
    "update:modelValue": null,
  },

  methods: {
    updateSelectField(ev) {
      this.$emit("update:modelValue", {
        ...this.modelValue,
        typeOfSearchField: ev.target.value,
      });
    },

    updateInputField(ev) {
      this.$emit("update:modelValue", {
        ...this.modelValue,
        searchString: ev.target.value,
      });
    },
  },
};
</script>
