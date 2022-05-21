<template>
  <router-link v-if="!isBtn" type="button" :class="btnClass" :to="path">
    {{ message }}
  </router-link>
  <button v-else type="submit" :class="btnClass">{{ message }}</button>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      requred: true,
      default: "Log In",
    },
    path: {
      type: String,
      requred: false,
      default: "/login",
    },
    btnClass: {
      type: String,
      requred: true,
      default: "btn btn-light btn-lg",
    },
    isBtn: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
};
</script>

<style scoped>
.btn.btn-light.btn-lg {
  backface-visibility: hidden;
  background-color: white;
  color: black;
  border-radius: 20px;
  border-width: 3px;
  box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
    rgba(50, 50, 93, 0.1) 0 2px 5px 0, rgba(0, 0, 0, 0.07) 0 1px 1px 0;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 700;
  height: 44px;
  margin: 12px 0 0;
  outline: none;
  border: solid 1px black;
  overflow: hidden;
  position: relative;
  text-align: center;
  text-transform: none;
  transition: all 0.2s, box-shadow 0.08s ease-in;
  max-width: 150px;
  width: 130px;
  margin-left: 2ch;
  margin-right: 2ch;
}

.btn.btn-light.btn-lg:focus {
  box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
    rgba(50, 50, 93, 0.2) 0 6px 15px 0, rgba(0, 0, 0, 0.1) 0 2px 2px 0,
    rgba(50, 151, 211, 0.3) 0 0 0 4px;
}

.btn.btn-dark.btn-lg {
  backface-visibility: hidden;
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  border-radius: 20px;
  border-width: 3px;
  box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
    rgba(50, 50, 93, 0.1) 0 2px 5px 0, rgba(0, 0, 0, 0.07) 0 1px 1px 0;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 700;
  height: 44px;
  margin: 12px 0 0;
  outline: none;
  border: solid 1px black;
  overflow: hidden;
  position: relative;
  text-align: center;
  text-transform: none;
  transition: all 0.2s, box-shadow 0.08s ease-in;
  max-width: 150px;
  width: 130px;
  margin-left: 2ch;
  margin-right: 2ch;
}

.btn.btn-dark.btn-lg:focus {
  box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
    rgba(50, 50, 93, 0.2) 0 6px 15px 0, rgba(0, 0, 0, 0.1) 0 2px 2px 0,
    rgba(50, 151, 211, 0.3) 0 0 0 4px;
}

.btn.btn-light.btn-sm {
  height: 3vh;
  width: 10vh;
  background-color: rgb(255, 255, 255);
  border-width: 1px;
  border-radius: 90px;
  text-align: center;
  margin-left: 2ch;
  margin-right: 2ch;
  padding: 0px;
}
</style>