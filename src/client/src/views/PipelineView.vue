<template>
  <div>
    <div v-if="!isLoading">
      <dialog-component :show="!!error" :heading="error" @close="closeDialog" />
      <h1>Run Pipeline</h1>
      <div class="pipeline-form">
        <div class="content">
          <h3>Import needed data to execute pipeline</h3>
          <pipeline-component @export-pipeline-data="getData" />
        </div>
      </div>
    </div>
    <div v-else>
      <SpinnerComponent
        :isLoading="isLoading"
        class="loading"
      ></SpinnerComponent>
    </div>
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
      isLoading: false,
    };
  },
  methods: {
    async getData(formData) {
      await this.sendRequest(formData);
    },
    async sendRequest(reqData) {
      try {
        this.isLoading = true;
        await this.$store.dispatch("results/sendPipelineData", reqData);
        this.isLoading = false;
        // Redirect
        this.$router.replace("/pipelines/result");
      } catch (error) {
        this.error =
          error.message || "Failed to send Pipeline data to the server.";
        this.isLoading = false;
      }
    },
    closeDialog() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.pipeline-form {
  display: flex;
  border-radius: 12px;
  position: relative;
  justify-content: center;
  border: 2px solid black;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2.3rem;
  margin: 2rem auto;
  max-width: 50rem;
  max-height: 80rem;
  text-align: center;
}
.h1 .h3 {
  font-weight: 900;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 5rem;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.loading {
  position: absolute;
  height: 100vh;
  width: 100vw;
}
</style>
