<template>
    <section class="login-form">
            <h1> Log In </h1>
            <form>
                <input type="credentials" class="form-control" id="inputCredentials" placeholder="Username or Email">
                <input type="password" class="form-control" id="inputPassword" placeholder="Password">
                <button type="submit" class="btn btn-dark btn-lg">Log In</button>
            </form>
            <router-link type="button" class="btn btn-light btn-lg" to="/register"> Register </router-link>
    </section>
</template>

<script>

export default{
    
}
</script>

<style>
h1 {
    color: black;
    font-weight: bold;
    font-size: xx-large;
}
.login-form {
    display: inline-block;
    margin-top: 7%;
    margin-left: 35%;
    margin-right: 35%;
    margin-bottom: 7%;
    width: 30%;
    text-align: center;
}
.login-form .form-control {
    margin-top: 7%;
    margin-bottom: 7%;
    background: #EEF6FB;
    border: 1px solid #D9E4F5;
    box-sizing: border-box;
    border-radius: 70px;
}
.login-form .btn.btn-dark.btn-lg {
    border-radius: 70px;
    width: 50%;
    margin-bottom: 7%;
}
.login-form .btn.btn-light.btn-lg {
    border-width: 2px;
    border-color: black;
    color: black;
    border-radius: 70px;
    width: 50%;
}
</style>