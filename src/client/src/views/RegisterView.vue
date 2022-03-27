<template>
  <section class="register">
    <InfoDialog :show="!!error" :heading="error" @close="closeDialog"/>
    <h1>Register</h1>
    <!-- Listen to 'export-data' event occurs -->
    <UserForm @export-data="getData" :message="'Register'"></UserForm>
    <ButtonComponent
      :message="'Log In'"
      :path="'/login'"
      :btnClass="'btn btn-light btn-lg'"
    />
  </section>
</template>

<script>
import UserForm from "../components/UserForm.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import store from "@/store";
import InfoDialog from "@/ui/InfoDialog.vue";

export default {
  data() {
    return {
      error: null
    };
  },
  components: {
    UserForm,
    ButtonComponent,
    InfoDialog
  },
  methods: {
    getData(formData) {
      this.sendRequest(formData);
    },
    async sendRequest(reqData) {
      try {
        await store.dispatch("register", reqData);
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