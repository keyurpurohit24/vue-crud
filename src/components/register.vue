<template>
  <div class="wrapper">
    <h2>Registration</h2>
    <form @submit.prevent="submit">
      <div class="input-box">
        <input
          type="text"
          v-model="formData.name"
          placeholder="Enter your name"
        />
        <span class="error-text" v-if="v$.formData.name.$errors.length">
          {{ v$.formData.name.$errors[0].$message }}
        </span>
      </div>

      <div class="input-box">
        <input
          type="text"
          v-model="formData.email"
          placeholder="Enter your email"
        />
        <span class="error-text" v-if="v$.formData.email.$errors.length">
          {{ v$.formData.email.$errors[0].$message }}
        </span>
      </div>

      <div class="input-box">
        <input
          type="password"
          v-model="formData.password"
          placeholder="Create password"
        />
        <span class="error-text" v-if="v$.formData.password.$errors.length">
          {{ v$.formData.password.$errors[0].$message }}
        </span>
      </div>

      <div class="input-box">
        <input
          type="password"
          v-model="formData.password_confirmation"
          placeholder="Confirm password"
        />
        <span
          class="error-text"
          v-if="v$.formData.password_confirmation.$errors.length"
        >
          {{ v$.formData.password_confirmation.$errors[0].$message }}
        </span>
      </div>

      <div class="policy">
        <input
          id="is_accept_terms"
          type="checkbox"
          v-model="formData.is_accept_terms"
        />
        <label class="label" for="is_accept_terms"
          >I accept all terms & condition</label
        >
      </div>
      <span
        class="error-text"
        v-if="v$.formData.is_accept_terms.$errors.length"
      >
        {{ v$.formData.is_accept_terms.$errors[0].$message }}
      </span>

      <div class="input-box button">
        <input
          type="submit"
          value="Register Now"
          :disabled="!formData.is_accept_terms"
        />
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
import { reactive, computed, toRef } from "vue";
import useVuelidate from "@vuelidate/core";
import axios from "axios";
import {
  required,
  email,
  maxLength,
  sameAs,
  helpers,
  minLength,
} from "@vuelidate/validators";

export default {
  name: "RegisterComponent",
  setup() {
    const formData = reactive({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      is_accept_terms: false,
    });

    const rules = computed(() => ({
      formData: {
        name: {
          required: helpers.withMessage("Name is required", required),
          maxLen: helpers.withMessage(
            "Name must be under 20 characters",
            maxLength(20)
          ),
        },
        email: {
          required: helpers.withMessage("Email is required", required),
          email: helpers.withMessage("Must be a valid email", email),
        },
        password: {
          required: helpers.withMessage("Password is required", required),
          minLength: helpers.withMessage(
            "Password must be at least 6 characters",
            minLength(6)
          ),
          // stronger & anchored
          strongPassword: helpers.withMessage(
            "Please choose stronger password",
            helpers.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/)
          ),
        },
        password_confirmation: {
          required: helpers.withMessage(
            "Please confirm your password",
            required
          ),
          sameAsPassword: helpers.withMessage(
            "Passwords must match",
            sameAs(toRef(formData, "password"))
          ),
        },
        is_accept_terms: {
          required: helpers.withMessage("You must accept the terms", required),
        },
      },
    }));

    const v$ = useVuelidate(rules, { formData });

    const submit = async () => {
      const isValid = await v$.value.$validate();
      if (!isValid) return;

      try {

        const response = await axios.post("http://localhost:3000/users", {
          "name": formData.name,
          "email": formData.email,
          "password": formData.password, 
        });
        console.log("Registered:", response.data);
        alert("Registration successful!");
        window.location.href = "/login";
      } catch (error) {
        if (error.response?.data?.message) {
          alert(error.response.data.message);
        } else {
          alert("An unexpected error occurred during registration.");
        }
      }
    };

    return {
      formData,
      v$,
      submit,
    };
  },
};
</script>

<style>
@import url("@/assets/css/login-signup-style.css");
</style>
