<template>
    <section class="login">
        <h1> Log In </h1>
        <!-- Listen to 'export-data' event occurs -->
        <UserForm @export-data="getData" :message="'Log In'"></UserForm>
        <ButtonComponent :message="'Register'" :path="'/register'" :btnClass="'btn btn-light btn-lg'"/>
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
    padding-top: 30px;
    color: black;
    font-weight: bold;
    font-size: xx-large;
}
</style>