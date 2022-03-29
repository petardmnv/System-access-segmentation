<template>
  <div class="contentContainer">
    <slot></slot>
  </div>
</template>

<style scoped>
.contentContainer {
  border-radius: 12px;
  border: 2px solid black;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  margin: 2rem auto;
  max-width: 50rem;
  max-height: 80rem;
  text-align: center;
}
</style>