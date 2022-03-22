<template>
    <router-link v-if="!isBtn" type="button" :class="btnClass" :to="path"> {{ message }} </router-link>
    <button v-else type="submit" :class="btnClass" > {{ message }} </button>
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
            requred: false,
            default: "/login"
        },
        btnClass: {
            type: String,
            requred: true,
            default: "btn btn-light btn-lg"
        },
        isBtn: {
            type: Boolean,
            require: true,
            default: false
        }
    }
};
</script>

<style scoped>
.btn.btn-light.btn-lg {
    height: 5vh;
    width: 20vh;
    border-width: 2px;
    border-color: black;
    color: black;
    border-radius: 70px;
    text-align: center;
    margin-left: 2ch;
    margin-right: 2ch;
}
.btn.btn-dark.btn-lg {
    height: 5vh;
    width: 20vh;
    background-color: rgb(0, 0, 0);
    border-width: 2px;
    border-radius: 70px;
    text-align: center;
    margin-left: 2ch;
    margin-right: 2ch;
}
</style>