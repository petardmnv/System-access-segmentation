<template>
  <div class="spinner" v-if="isLoading">
      <div
        class="spinner-border"
        style="width: 3rem; height: 3rem"
        role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
  </div>
</template>

<script>
import CardComponent from "./CardComponent.vue";
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  components: { CardComponent },
};
</script>

<style scoped>
.spinner{
    display: flex;
    justify-content: center;
    top: 40%
}
</style>