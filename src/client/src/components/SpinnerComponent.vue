<template>
  <div class="spinner" v-if="isLoading">
    <CardComponent class="new">
      <div
        class="spinner-border"
        style="width: 3rem; height: 3rem"
        role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </CardComponent>
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
.new{
    max-width: 20rem;
    max-height: 20rem;
    align-items: center;
    vertical-align: middle;
}
</style>