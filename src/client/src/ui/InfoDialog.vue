<template>
  <teleport to="body">
    <dialog open v-if="show">
      <header>
        <h1>
          {{ heading }}
        </h1>
      </header>
      <menu>
        <button @click="close">Close</button>
      </menu>
    </dialog>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      require: true,
    },
    heading: {
      type: String,
      require: true,
    },
  },
  emits: ["close"],
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scope>
</style>