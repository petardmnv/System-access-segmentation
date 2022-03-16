<template>
    <form>
        <div class="row mb-3">
            <div class="col-sm-10">
            <input type="username" class="form-control" id="inputUsername" placeholder="Username">
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-sm-10">
            <input type="email" class="form-control" id="inputEmail" placeholder="Email">
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-sm-10">
            <input type="password" class="form-control" id="inputPassword" placeholder="Password">
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
        <router-link type="button" class="btn btn-light btn-lg" to="/login"> Log In </router-link>
    </form>
</template>

<script>

export default{
        
}
</script>

<style>

</style>