<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ["type", "title"],
  computed: {
    text() {
      return this.title;
    },
  },
};
</script>

<style scoped>
span {
    font-size: 700;
}
span .privileges {
  background-color: #eef6fb;
  color: rgb(0, 0, 0);
}
.badge {
  background-color: #eef6fb;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}
</style>