<template>
  <div class="wrapper">
    <h2>Registration</h2>
    <form @submit.prevent="submit">
      <div class="input-box">
        <input type="text" v-model="formData.name" placeholder="Enter your name"  />
        <span class="error-text" v-if="v$.formData.name.$errors[0]">{{ v$.formData.name.$errors[0].$message }}</span>
      </div>
      <div class="input-box">
        <input type="text" v-model="formData.email" placeholder="Enter your email"  />
        <span class="error-text" v-if="v$.formData.email.$errors[0]">{{ v$.formData.email.$errors[0].$message }}</span>
      </div>
      <div class="input-box">
        <input type="password" v-model="formData.password" placeholder="Create password"  />
        <span class="error-text" v-if="v$.formData.password.$errors[0]">{{ v$.formData.password.$errors[0].$message }}</span>
      </div>
      <div class="input-box">
        <input type="password" v-model="formData.password_confirmation" placeholder="Confirm password"  />
        <span class="error-text" v-if="v$.formData.password_confirmation.$errors[0]">{{ v$.formData.password_confirmation.$errors[0].$message }}</span>
      </div>
      <div class="policy">
        <input type="checkbox" />
        <h3>I accept all terms & condition</h3>
      </div>
      <div class="input-box button">
        <input type="Submit" value="Register Now" />
      </div>
      <div class="text">
        <h3>
          Already have an account?
          <router-link to="login">Login now</router-link>
        </h3>
      </div>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, maxLength, sameAs, helpers } from "@vuelidate/validators";

export default {
  name: "Register-component",
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  methods:{
    async submit(){
      const isFormValid = await this.v$.$validate()
      if(!isFormValid){
        return;
      }else{
        //Register user
      }
    }
  },
  data(){
    return{
      formData:{
        name:null,
        email:null,
        password:null,
        password_confirmation:null
      }
    }
  },
  validations(){
    return{
      formData:{
        name:{
          required,
          name: maxLength(20),
        },
        email:{
          required,
          email,
        },
        password:{
          required,
        },
        password_confirmation:{
          required,
          password_confirmation : helpers.withMessage("must be same as password",sameAs('password'))
        }
      },
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4070f4;
}
.wrapper {
  position: relative;
  max-width: 430px;
  width: 100%;
  background: #fff;
  padding: 34px;
  border-radius: 6px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
.wrapper h2 {
  position: relative;
  font-size: 22px;
  font-weight: 600;
  color: #333;
}
.wrapper h2::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 28px;
  border-radius: 12px;
  background: #4070f4;
}
.wrapper form {
  margin-top: 30px;
}
.wrapper form .input-box {
  height: 52px;
  margin: 18px 0;
}
form .input-box input {
  height: 100%;
  width: 100%;
  outline: none;
  padding: 0 15px;
  font-size: 17px;
  font-weight: 400;
  color: #333;
  border: 1.5px solid #c7bebe;
  border-bottom-width: 2.5px;
  border-radius: 6px;
  transition: all 0.3s ease;
}
.input-box input:focus,
.input-box input:valid {
  border-color: #4070f4;
}
form .policy {
  display: flex;
  align-items: center;
}
form h3 {
  color: #707070;
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
}
.input-box.button input {
  color: #fff;
  letter-spacing: 1px;
  border: none;
  background: #4070f4;
  cursor: pointer;
}
.input-box.button input:hover {
  background: #0e4bf1;
}
form .text h3 {
  color: #333;
  width: 100%;
  text-align: center;
}
form .text h3 a {
  color: #4070f4;
  text-decoration: none;
}
form .text h3 a:hover {
  text-decoration: underline;
}
.error-text{
  color: red;
}
</style>
