<template>
  <div class="mini-cart">

    <div class="modal fade" id="miniCart" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Your cart</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- <h5 v-if="emptyBody() === false"  class="display-5">Karta juaj eshte e thate...</h5> -->
          <ul id="items-list">
            <li v-for="(item,index) in this.$store.state.cart" class="media align-items-center mt-3">
              <img :src="item.productImage" width="80px" class="align-self-center mr-3">
              <div class="media-body"><i @click="$store.commit('removeFromCart',item)" class="fas fa-times-circle float-right"></i>
                <h5 class="mt-0">{{item.productName}}</h5>
                <p class="mt-0">{{item.productPrice}} €</p>
                <p class="mt-0"><i @click="removeFromCart(item)" class="fas fa-minus-circle mr-2"></i>Sasia: {{item.productQuantity}}<i @click="addToCart(item)" class="fas fa-plus-circle ml-2"></i></p> 
              </div>
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Continue shopping</button>
          <button to="/checkout" class="btn btn-primary" @click="checkout" >Checkout</button>
        </div>
      </div>
    </div>
  </div>
  
  </div>
</template>

<script>
export default {
  name: "mini-cart",
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
    checkout(){
      $("#miniCart").modal('hide');
      this.$router.push('/checkout');
    },
    addToCart(item){
        item.productQuantity++;
    },
    
    removeFromCart(item){
      if(item.productQuantity > 0){
        item.productQuantity--;
      }
      if(item.productQuantity == 0){
        //fshije krejt prej ul,li if quantity 0
        this.$store.commit('removeFromCart',item);
          Toast.fire({
            icon: 'success',
            title: 'U largua nga karta!'
        })
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .fa-times-circle{
    cursor: pointer;
    font-size: 20px;
    margin-top: 3px;
  }
  .fa-minus-circle,.fa-plus-circle{
    cursor: pointer;
    font-size: 15px;
  }
  .fa-minus-circle:hover{
    color: rgb(31, 30, 30);
    transform: scale(1.08);
  }
  .fa-plus-circle:hover{
    color: (31, 30, 30);
    transform: scale(1.08);
  }
</style>
