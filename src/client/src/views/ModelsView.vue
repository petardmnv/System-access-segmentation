<template>
  <div>
    <dialog-component :show="!!error" :heading="error" @close="closeDialog" />
    <model-component
      v-for="model in models"
      :key="model._id"
      :id="model._id"
      :modelName="model.name"
      :modelDescription="model.description"
    ></model-component>
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