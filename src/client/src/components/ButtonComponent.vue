<template>
    <router-link type="button" :class="btnClass" :to="path"> {{ message }} </router-link>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            requred: true,
            default: "Log In"
        },
        path: {
            type: String,
            requred: true,
            default: "/login"
        },
        btnClass: {
            type: String,
            requred: true,
            default: "btn btn-light btn-lg"
        }
    }
}
</script>

<style scoped>
.btn.btn-light.btn-lg {
    border-width: 2px;
    border-color: black;
    color: black;
    border-radius: 70px;
    margin-left: 35%;
    margin-right: 35%;
    width: 15%;
    text-align: center;

}
.btn.btn-dark.btn-lg {
    background-color: black;
    border-radius: 70px;
    margin-left: 35%;
    margin-right: 35%;
    width: 15%;
    text-align: center;
}
</style>