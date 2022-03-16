<template>
    <section class="register">
        <h1> Register </h1>
        <form>
            <input type="username" class="form-control" id="inputUsername" placeholder="Username">
            <input type="email" class="form-control" id="inputEmail" placeholder="Email">
            <input type="password" class="form-control" id="inputPassword" placeholder="Password">
            <button type="submit" class="btn btn-dark btn-lg">Register</button>
        </form>
        <router-link type="button" class="btn btn-light btn-lg" to="/login"> Log In </router-link>
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
.register {
    display: inline-block;
    margin-top: 7%;
    margin-left: 35%;
    margin-right: 35%;
    margin-bottom: 7%;
    width: 30%;
    text-align: center;
}
.register .form-control {
    margin-top: 7%;
    margin-bottom: 7%;
    background: #EEF6FB;
    border: 1px solid #D9E4F5;
    box-sizing: border-box;
    border-radius: 70px;
}
.register .btn.btn-dark.btn-lg {
    border-radius: 70px;
    width: 50%;
    margin-bottom: 7%;
}
.register .btn.btn-light.btn-lg {
    border-width: 2px;
    border-color: black;
    color: black;
    border-radius: 70px;
    width: 50%;
}
</style>