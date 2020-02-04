<template>
  <div class="addtocart">
      <button class="btn btn-primary" @click="addToCart">Add to cart</button>
  </div>
</template>

<script>
export default {
  name: "add-to-cart",
  props: {
    name: String,
    image: String,
    price: String,
    productId: String
  },
  data(){
    return{
      item : {
        productName: this.name,
        productImage: this.image,
        productPrice : this.price,
        product_id : this.productId,
        productQuantity : 1,
      }
    }
  },
  methods:{
      addToCart(){
        $("#miniCart").modal('show');
        this.$store.commit('addToCart',this.item);
      }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
