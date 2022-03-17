<template>
    <!-- @submit.prevent - data is submited when button is clicked without a page refresh -->
    <form @submit.prevent="submitForm" class="form-data">
        <div class="login-data" v-if="message === 'Log In'">
            <input type="username" class="form-control" id="inputCredentials" placeholder="Username or email" v-model="username">
        </div>
        <div class="login-data" v-else>
            <input type="username" class="form-control" id="inputUsername" placeholder="Username" v-model="username">
            <input type="email" class="form-control" id="inputEmail" placeholder="Email" v-model="email">
        </div>
        <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model="password">
        <button type="submit" class="btn btn-dark btn-lg">{{ message }}</button>
    </form>
</template>
<script>
export default {
    // sending the form data to the parent component vie emit-event conception
    emits: ['export-data'],
    data(){
        return {
            username: "",
            email: "",
            password: ""
        }
    },
    props: {
        message: {
            type: String,
            requred: true,
            default: "Log In"
        }
    },
    methods: {
        submitForm(){
            const formData = {
                username: this.username,
                email: this.email,
                password: this.password
            };
            return this.$emit("export-data", formData);
        }
    }
}
</script>

<style scoped>
form {
    display: inline-block;
    margin-top: 3%;
    margin-left: 35%;
    margin-right: 35%;
    margin-bottom: 2%;
    width: 30%;
    text-align: center;
}
 .form-data .form-control {
    margin-top: 7%;
    margin-bottom: 7%;
    background: #EEF6FB;
    border: 1px solid #D9E4F5;
    box-sizing: border-box;
    border-radius: 70px;
}
.btn.btn-dark.btn-lg {
    background-color: black;
    border-radius: 70px;
    width: 50%;
    margin-top: 10%;
}
</style>