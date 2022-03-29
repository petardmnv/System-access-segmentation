<template>
  <div class="spinner" v-if="isLoading">
    <ContentComponent class="new">
      <div
        class="spinner-border"
        style="width: 3rem; height: 3rem"
        role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </ContentComponent>
  </div>
</template>

<script>
import ContentComponent from "./ContentComponent.vue";
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  components: { ContentComponent },
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