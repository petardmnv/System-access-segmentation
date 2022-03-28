<template>
  <section class="register">
    <dialog-component :show="!!error" :heading="error" @close="closeDialog"/>
    <h1>Register</h1>
    <!-- Listen to 'export-data' event occurs -->
    <authentication-component @export-data="getData" :message="'Register'"/>
    <button-component
      :message="'Log In'"
      :path="'/login'"
      :btnClass="'btn btn-light btn-lg'"
    />
  </section>
</template>

<script>
export default {
  data() {
    return {
      error: null
    };
  },
  methods: {
    getData(formData) {
      this.sendRequest(formData);
    },
    async sendRequest(reqData) {
      try {
        await this.$store.dispatch("register", reqData);
        // Redirect
        this.$router.replace("/home");
      } catch (error) {
        this.error = error.message || "Failed to Register. Try again.";
      }
    },
    closeDialog(){
      this.error = null;
    }
  },
};
</script>

<style>
h1 {
  color: black;
  font-weight: bold;
  font-size: xx-large;
}
</style>