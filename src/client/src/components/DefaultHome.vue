<template>
  <section>
      <router-link type="button" class="btn btn-light btn-lg" to="/login"> Log In </router-link>
      <h1> Platform for SAP IdM data segmentation</h1>
      <h3> Explore our site and build your own pipelines that could save you time in SAP Idm privileges management </h3>
      <h4> Hurry up!!! Join our community now! </h4>
      <router-link type="button" class="btn btn-dark btn-lg" to="/register"> Register </router-link>
  </section>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
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
.btn.btn-dark.btn-lg {
  background-color: black;
  width: 10%;
  margin: 5%;
  border-radius: 80px;
}
.btn.btn-light.btn-lg {
  border-color: black;
  color: black;
  border-radius: 70px;
  margin-top: 1%;
  margin-left: 82%;
  margin-right: 5%;
  width: 8%;
}
</style>
