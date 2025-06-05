<template>
  <div class="wrapper">
    <h2>Login</h2>
    <form @submit.prevent="submit">
      <div class="input-box">
        <input type="text" v-model="formData.email" placeholder="Enter your email" />
        <span class="error-text" v-if="v$.formData.password.$errors[0]">{{ v$.formData.email.$errors[0].$message }}</span>
      </div>
      <div class="input-box">
        <input type="password" v-model="formData.password" placeholder="Create password" />
        <span class="error-text" v-if="v$.formData.password.$errors[0]">{{ v$.formData.password.$errors[0].$message }}</span>
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
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  name: "Login-component",
  setup() {
    return{
      v$: useVuelidate()
    }
  },
  validations() {
    return {
      formData: {
        email: { required, email },
        password: { required },
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
        console.log();
      }
    },
  },
  data() {
    return {
      formData: {
        email: null,
        password: null,
      },
    };
  },
};
</script>
