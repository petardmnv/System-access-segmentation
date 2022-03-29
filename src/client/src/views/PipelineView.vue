<template>
  <div>
    <h1>Run Pipeline</h1>
    <content-component>
      <h3>
        Import needed data to execute pipeline
      </h3>
      <pipeline-component>

      </pipeline-component>
    </content-component>
    <SpinnerComponent :isLoading="isLoading"></SpinnerComponent>
  </div>
</template>

<script>
import SpinnerComponent from "@/components/SpinnerComponent.vue";
export default { 
  components: { SpinnerComponent },
  data() {
    return {
      isLoading: false,
      formData: null
    }
  },
  computed: {
    isLoading() {
      return this.isLoading;
    }
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
</style>
