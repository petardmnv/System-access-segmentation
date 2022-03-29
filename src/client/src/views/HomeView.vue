<template>
  <div class="content">
    <h1>Platform for SAP IdM data segmentation</h1>
    <h3>
      Explore our site and build your own pipelines that could save you time in
      SAP Idm privileges management
    </h3>
    <div class="contentLogOut" v-if="!isAuthenticated">
      <h4>Hurry up!!! Join our community now!</h4>
      <div class="buttons">
        <button-component
          :message="'Register'"
          :path="'/register'"
          :btnClass="'btn btn-dark btn-lg'"
        />
        <button-component
          :message="'Log In'"
          :path="'/login'"
          :btnClass="'btn btn-light btn-lg'"
        />
      </div>
    </div>
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

<!-- Scoped attribute to limit CSS to this component only -->
<style scoped>
h3,
h1,
h4 {
  color: rgb(0, 0, 0);
  margin: 3% 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: rgb(255, 255, 255);
}
.buttons {
  flex-direction: row;
  justify-content: space-between;
}
</style>
