<template>
  <section class="login">
      <DialogComponent :show="!!error" :heading="error" @close="closeDialog"/>
    <h1>Log In</h1>
    <!-- Listen to 'export-data' event occurs -->
    <UserForm @export-data="getData" :message="'Log In'"></UserForm>
    <ButtonComponent
      :message="'Register'"
      :path="'/register'"
      :btnClass="'btn btn-light btn-lg'"
    />
  </section>
</template>

<script>
import store from "@/store";
import UserForm from "../components/UserForm.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import DialogComponent from "@/components/DialogComponent.vue";

export default {
  data() {
    return {
      error: null,
    };
  },
  components: {
    UserForm,
    ButtonComponent,
    DialogComponent
  },
  methods: {
    getData(formData) {
      this.sendRequest(formData);
    },
    async sendRequest(reqData) {
      try {
        await store.dispatch("login", reqData);
        // Redirect
        this.$router.replace("/home");
      } catch (error) {
        this.error = error.message || "Failed to Login. Try again.";
      }
    },
    closeDialog(){
      this.error = null;
    }
  }
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