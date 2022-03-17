<template>
    <!-- @submit.prevent - data is submited when button is clicked without a page refresh -->
    <form @submit.prevent="submitForm" class="form-data">
        <div class="login-data" v-if="message === 'Log In'">
            <input type="username" class="form-control" id="inputCredentials" @blur="clearValidation('username')" :class="{invalid: !username.isValid}" placeholder="Username or email" v-model="username.value">
            <p v-if="!username.isValid"> Invalid username </p>
        </div>
        <div class="login-data" v-else>
            <input type="username" class="form-control" :class="{invalid: !username.isValid}" id="inputUsername" @blur="clearValidation('username')" placeholder="Username" v-model="username.value">
            <p v-if="!username.isValid"> Invalid username </p>
            <input type="email" class="form-control" id="inputEmail" :class="{invalid: !email.isValid}" @blur="clearValidation('email')" placeholder="Email" v-model="email.value">
            <p v-if="!email.isValid"> Invalid email </p>
        </div>
        <input type="password" class="form-control" id="inputPassword" :class="{invalid: !password.isValid}" @blur="clearValidation('password')" placeholder="Password" v-model="password.value">
        <p v-if="!password.isValid"> Invalid password </p>
        <div class="last-message">
            <p v-if="!formIsValid">
                Please fix the above errors and then submit again.
            </p>
        </div>
        <button type="submit" class="btn btn-dark btn-lg">{{ message }}</button>
    </form>
</template>
<script>
export default {
    // sending the form data to the parent component vie emit-event conception
    emits: ['export-data'],
    data(){
        return {
            // make all inputs objects - with properties: value, isValid, because when implementing form 
            //validation I will need to store a bool flag if the input is valid or not
            username: {
                value: '',
                isValid: true
            },
            email: {
                value: '',
                isValid: true
            },
            password: {
                value: '',
                isValid: true
            },
            // Add boolean flag that will be used to do basic form validation
            formIsValid: true
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
        clearValidation(input){
            this[input].isValid = true;
        },
        validateForm(){
            // Reset validation rule to true if it was previously false
            this.formIsValid = true;
            // Basic validation
            if (!this.username.value.trim()){
                this.formIsValid = false;
                this.username.isValid = false;
            }
            if (!this.email.value.trim()){
                this.formIsValid = false;
                this.email.isValid = false;
            }
        if (!this.password.value.trim() || this.password.value.length < 8){
                this.formIsValid = false;
                this.password.isValid = false;
            }
        },
        submitForm(){
            this.validateForm();
            // Check if form is valid
            if (!this.formIsValid){
                return;
            }

            const formData = {
                username: this.username.value,
                email: this.email.value,
                password: this.password.value
            };
            return this.$emit("export-data", formData);
        }
    }
}
</script>

<style scoped>
 p {
     text-align: left;
     font-size: small;
     color: red;
     margin-left: 2%;
}
.last-message p{
    margin-top: 5%;
    text-align: center;
}
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
.form-data .form-control.invalid {
    border: 1px solid red;
}
</style>