<template>
  <div class="products" id="products">
      <div class="container">
          <h1 class="text-center p-5">Products List</h1>
          <div class="row">
              
              <div class="col-md-6 col-xl-4 mt-2" v-for="(product,index) in products" :key="index">
                  <div class="card h-100 product-item" @mouseover="hover = true, selectItem(index)" @mouseleave="hover = false" :class="{ 'shadow':index === hover }">

                        <carousel :perPage="1" :autoplay="true">
                          <slide v-for="(image, index) in product.images">
                                <img :src="image" class="card-img-top p-1" width="250px">
                          </slide>
                        </carousel>
                
                        <div class="card-body d-flex flex-column">
                          <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title">{{ product.name }}</h5>
                            <h5 class="card-prices">{{ product.price}} €</h5>
                          </div>
                            <p class="card-description flex-grow-1" v-html="product.description"></p>
                           
                            <add-to-cart 
                                :image="getImage(product.images)"
                                :productId="product.id"
                                :price="product.price"
                                :name="product.name">
                            </add-to-cart>
                        </div>
                    </div>
              </div>

          </div>
      </div>
    
  </div>
</template>

<script>
import {db} from '../firebase';
export default {
  name: "ProductList",
  props: {
    msg: String
  },
data(){
    return {
        hover: false,
        products: [],
    }
  },
  methods:{
    selectItem(index) {
        this.hover = index;
    },
    getImage(images){
      return images[0];
    }
  },
  firestore(){
      return {
        products: db.collection('products'),
      }
  },
  hoveringg(){
    $( ".card" ).hover(
    function() {
        $(this).addClass('shadow-lg').css('cursor', 'pointer'); 
    }, function() {
        $(this).removeClass('shadow-lg');
    }
    );
    return true;
  }
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .card-img-top{
        height:300px;
    }
    .products{
        margin-top: 7rem;
        background: #f2f2f2;
        padding-bottom: 3rem;
    }
    .card-description{
        font-family: "Open Sans";
    }
    .card-prices{
        font-style: italic;
        font-size: 1rem;
    }
    @media(max-width:768px){
        .card-img-top{
            height:350px;
        }
    }
</style>