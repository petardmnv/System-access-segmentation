<template>
  <div>
    <dialog-component :show="!!error" :heading="error" @close="closeDialog" />
    <content-component
      v-for="result in results"
      :key="result._id"
      :id="result._id"
      :title="result.role"
      description="Privileges"
      :content="result.privileges"
      contentType="privileges"
    ></content-component>
  </div>
</template>

<script>
export default {
  data() {
    return {
      results: null,
      error: null,
    };
  },
  mounted() {
    this.loadResults();
  },
  methods: {
    async loadResults() {
      try {
        await this.$store.dispatch("results/getResults");
        this.results = this.$store.getters["results/getResults"];
      } catch (error) {
        this.error = error.message || "Something went wrong";
      }
    },
    closeDialog() {
      this.error = null;
    },
  },
};
</script>