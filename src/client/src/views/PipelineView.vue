<template>
  <div>
    <dialog-component :show="!!error" :heading="error" @close="closeDialog" />
    <h1>Run Pipeline</h1>
    <card-component>
      <h3>
        Import needed data to execute pipeline
      </h3>
      <pipeline-component @export-pipeline-data="getData"/>
    </card-component>
    <SpinnerComponent :isLoading="isLoading" class="loading"></SpinnerComponent>
  </div>
</template>

<script>
import SpinnerComponent from "@/components/SpinnerComponent.vue";
export default { 
  components: { SpinnerComponent },
  data() {
    return {
      formData: null,
      error: null,
      isLoading: false
    }
  },
  methods: {
    getData(formData) {
      this.sendRequest(formData);
    },
    async sendRequest(reqData) {
      try {
        this.isLoading = true;
        await this.$store.dispatch("results/sendPipelineData", reqData);
        this.isLoading = false;
        // Redirect
        this.$router.replace("/pipelines/result");
      } catch (error) {
        this.error = error.message || "Failed to send Pipeline data to the server.";
        this.isLoading = false;
      }
    },
    closeDialog() {
      this.error = null;
    },
  }
};
</script>

<style scoped>
h1 h3 {
  font-weight: 900;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 5rem;
}
.loading {
  position: absolute;
  height: 100vh;
  width: 100vw;
}
</style>
