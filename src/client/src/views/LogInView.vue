<template>
  <section class="login">
    <dialog-component :show="!!error" :heading="error" @close="closeDialog" />
    <h1>Log In</h1>
    <!-- Listen to 'export-data' event occurs -->
    <authentication-component
      @export-data="getData"
      :message="'Log In'"
    ></authentication-component>
    <button-component
      :message="'Register'"
      :path="'/register'"
      :btnClass="'btn btn-light btn-lg'"
    />
  </section>
</template>

<script>
export default {
  data() {
    return {
      error: null,
    };
  },
  methods: {
    getData(formData) {
      this.sendRequest(formData);
    },
    async sendRequest(reqData) {
      try {
        await this.$store.dispatch("login", reqData);
        // Redirect
        this.$router.replace("/home");
      } catch (error) {
        this.error = error.message || "Failed to Login. Try again.";
      }
    },
    closeDialog() {
      this.error = null;
    },
  },
};
</script>

<style>
h1 {
  padding-top: 30px;
  color: black;
  font-weight: bold;
  font-size: xx-large;
}
</style>