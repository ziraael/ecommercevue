<template>
  <div class="about">
	<Navbar></Navbar>
    <div class="container">
        <h1>This is the about page</h1>
    </div>
    <login></login>
  </div>
</template>

<script>
// @ is an alias to /src
import Main from "@/components/Main.vue";
import Login from "@/components/Login.vue";

export default {
  name: "about",
  components: {
    Login
  }
};
</script>

<style scoped>

</style>
