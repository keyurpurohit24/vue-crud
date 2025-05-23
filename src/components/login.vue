<template>
<div class="wrapper">
    <h2>Login</h2>
    <form action="#">
      <div class="input-box">
        <input type="text" placeholder="Enter your email" required />
      </div>
      <div class="input-box">
        <input type="password" placeholder="Create password" required />
        <!-- test -->
      </div>
      <div class="input-box button">
        <input type="Submit" value="Login Now" />
      </div>
      <div class="text">
        <h3>
          Don't have account?
          <router-link to="register">Signup now</router-link>
        </h3>
      </div>
    </form>
  </div>
</template>

<script>
export default {
    name: "Login-component"
}
</script>