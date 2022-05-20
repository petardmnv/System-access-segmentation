<template>
  <div>
    <dialog-component :show="!!error" :heading="error" @close="closeDialog" />
    <h1>Models List</h1>
    <content-component
      v-for="model in models"
      :key="model._id"
      :id="model._id"
      :title="model.name"
      description="Description"
      :content="[model.description]"
    ></content-component>
  </div>
</template>

<script>
export default {
  data() {
    return {
      models: null,
      error: null,
    };
  },
  created() {
    this.loadModels();
  },
  methods: {
    async loadModels() {
      try {
        await this.$store.dispatch("models/getModels");
        this.models = this.$store.getters["models/getModels"];
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