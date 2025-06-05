<template>
  <div class="wrapper">
    <h2>Login</h2>
    <form @submit.prevent="submit">
      <div class="input-box">
        <input type="text" placeholder="Enter your email" required />
        <span class="error-text" v-if="v$.formData.password_confirmation.$errors[0]">{{ v$.formData.email.$errors[0].$message }}</span>
      </div>
      <div class="input-box">
        <input type="password" placeholder="Create password" required />
        <span class="error-text" v-if="v$.formData.password_confirmation.$errors[0]">{{ v$.formData.password.$errors[0].$message }}</span>
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
import useVuelidate from "@vuelidate/validators";
import { required, email } from "@vuelidate/core";

export default {
  name: "Login-component",
  setup() {
    return{
      v$: useVuelidate()
    }
  },
  validation() {
    return {
      formData: {
        email: { required, email },
        password: { required },
      },
    };
  },
  data() {
    return {
      formData: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    async submit() {
      const isFormValid = await this.v$.$validate();
      if (!isFormValid) {
        return;
      } else {
        //Register user
      }
    },
  },
};
</script>
