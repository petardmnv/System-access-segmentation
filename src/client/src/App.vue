<template>
  <section>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
    <nav v-if="isAuthenticated" class="nav justify-content-center">
      <router-link class="nav-link" to="/home">Home</router-link>
      <router-link class="nav-link" to="/pipelines">Pipelines</router-link>
      <router-link class="nav-link" to="/data">Data</router-link>
      <router-link class="nav-link" to="/models">Models</router-link>
    </nav>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
nav.nav.justify-content-center a {
  font-weight: bold;
  font-size: larger;
  color: black;
}
nav.nav.justify-content-center a.active.router-link-exact-active.nav-link {
  text-decoration-thickness: 4px;
  text-decoration-line: underline;
  display: flex;
  justify-content: center;
}
</style>