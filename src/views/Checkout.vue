<template>
  <div class="checkout">
	<Navbar></Navbar>
    <div class="container mt-5 pt-5">
        <div class="row">
            <div class="col-md-9">
                <h4 class="py-4">Checkout Page</h4>
                <ul id="items-list">
                    <li v-for="item in this.$store.state.cart" class="media align-items-center mt-3">
                    <img :src="item.productImage" width="80px" class="align-self-center mr-3">
                    <div class="media-body">
                        <h5 class="mt-0">{{item.productName}}</h5>
                        <div class="d-flex justify-content-between">
                            <p class="mt-0">{{item.productPrice}} €</p>
                            <p class="mt-0">Quantity: {{item.productQuantity}}</p>
                        </div>
                    </div>
                    </li>
                </ul>
            </div>
            <div class="col-md-3">Total price</div>
        </div>
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
