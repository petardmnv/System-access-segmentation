<template>
  <div>
    <nav v-if="isAuthenticated" class="nav justify-content-center">
      <router-link class="nav-link" to="/home">Home</router-link>
      <router-link class="nav-link" to="/pipelines">Pipelines</router-link>
      <router-link class="nav-link" to="/data">Data</router-link>
      <router-link class="nav-link" to="/models">Models</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated(){
      return this.$store.getters.isAuthenticated;
    }
  }
}
</script>

<style >
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