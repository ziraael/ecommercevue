<template>
  <div class="home">
	<Navbar></Navbar>
    <Main></Main>
    <login></login>
    <ProductList></ProductList>
    <mini-cart></mini-cart>
  </div>
</template>

<script>
// @ is an alias to /src
import Main from "@/components/Main.vue";
// import Products from "@/sections/Products.vue";
import ProductList from "@/sections/ProductList.vue";
import Login from "@/components/Login.vue";

export default {
  name: "home",
  components: {
    Main,Login,ProductList
  },
};
</script>

<style scoped>
  @media(max-width:400px){
    #items-list{
      padding: 0 !important;
    }
  }
</style>
