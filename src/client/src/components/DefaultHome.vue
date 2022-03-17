<template>
  <section>
      <h1> Platform for SAP IdM data segmentation</h1>
      <h3> Explore our site and build your own pipelines that could save you time in SAP Idm privileges management </h3>
      <h4> Hurry up!!! Join our community now! </h4>
      <div class="buttons">
        <ButtonComponent :message="'Register'" :path="'/register'" :btnClass="'btn btn-dark btn-lg'"/>
        <ButtonComponent :message="'Log In'" :path="'/login'" :btnClass="'btn btn-light btn-lg'"/>
      </div>
  </section>
</template>

<script>
import ButtonComponent from '../components/ButtonComponent.vue';
export default {
  components: {
    ButtonComponent
  }
}
</script>

<!-- Scoped attribute to limit CSS to this component only -->
<style scoped>
h3, h1, h4 {
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
/* .btn.btn-dark.btn-lg {
  background-color: black;
  width: 10%;
  margin: 5%;
  border-radius: 70px;
}
.btn.btn-light.btn-lg {
  border-color: black;
  color: black;
  border-radius: 70px;

} */
</style>
