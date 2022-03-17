<template>
    <section class="register">
        <h1> Register </h1>
        <!-- Listen to 'export-data' event occurs -->
        <UserForm @export-data="getData" :message="'Register'"></UserForm>
        <ButtonComponent :message="'Log In'" :path="'/login'" :btnClass="'btn btn-light btn-lg'"/>
    </section>
</template>

<script>
import UserForm from '../components/UserForm.vue';
import ButtonComponent from '../components/ButtonComponent.vue';

export default{

    components:{
        UserForm,
        ButtonComponent
    },
    methods: {
        getData(formData) {
            console.log(formData);
        }
    }
}
</script>

<style>
h1 {
    color: black;
    font-weight: bold;
    font-size: xx-large;
}
</style>