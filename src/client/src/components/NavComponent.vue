<template>
  <div class="navigation">
    <nav v-if="isAuthenticated" class="nav justify-content-center">
      <router-link class="nav-link" to="/home">Home</router-link>
      <router-link class="nav-link" to="/pipelines">Run Pipeline</router-link>
      <router-link class="nav-link" to="/data">Results</router-link>
      <router-link class="nav-link" to="/models">Models</router-link>
    </nav>
    <div v-if="isAuthenticated" class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button-component
        @click="logout"
        :isBtn="true"
        message="Log Out"
        :btnClass="'btn btn-dark btn-lg'"
      ></button-component>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/home");
    },
  },
};
</script>

<style >
.navigation {
  flex-direction: row;
}

nav.nav.justify-content-center {
  display: inline-flex;
  margin-top: 1ch;
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
div .d-grid.gap-2.d-md-flex.justify-content-md-end{
  display: inline-block!important;
  position: absolute;
  margin-left: 50px;
}
div .d-grid.gap-2.d-md-flex.justify-content-md-end .btn.btn-dark.btn-lg {
  height: 4vh;
  width: 13vh;
  background-color: rgb(0, 0, 0);
  border-width: 2px;
  border-radius: 70px;
  text-align: center;
  font-weight: 700;
  line-height: normal;
  margin-left: 0;
  margin-right: 0;
  margin-top: 1.1ch;
}
</style>