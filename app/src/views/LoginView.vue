<template>
  <form 
    @submit.prevent="logIn"
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
      Log In
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
      async logIn() {
        await api_interface.post("api/auth/log-in", {
          email: this.email,
          password: this.password
        });

        // TODO handle resp
      }
    }
  };
</script>
