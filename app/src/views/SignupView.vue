<template>
  <form 
    @submit.prevent="signUp"
  >
    <input 
      v-model="email" 
      placeholder="Email" 
    />
    <input 
      v-model="password" 
      type="password" 
      placeholder="Password" 
    />
    <button 
      type="submit"
    >
      Sign Up
    </button>
  </form>
</template>
  
<script>
  // TODO tinker with better paths later
  import api_interface from "../api_interface";

  export default {
    data() {
      return {
        email: "",
        password: ""
      };
    },
    methods: {
      async signUp() {
        await api_interface.post("api/auth/sign-up", {
          email: this.email,
          password: this.password
        });
      }
    }
  };
</script>
