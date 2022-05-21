<template>
  <div class="contentContainer">
    <slot></slot>
  </div>
</template>

<style scoped>
.contentContainer {
  display: flex;
  border-radius: 12px;
  position: relative;
  justify-content: space-between;
  border: 2px solid black;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2.3rem;
  margin: 2rem auto;
  max-width: 50rem;
  text-align: center;
}
</style>