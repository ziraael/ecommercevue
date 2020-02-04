import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let cart = window.localStorage.getItem('cart');


export default new Vuex.Store({
    state: {
      cart: cart ? JSON.parse(cart) : [],
    },
    mutations:{
        addToCart(state,item){
            let found = state.cart.find(product => product.product_id === item.product_id);

            
            if(found){
                found.productQuantity++;
            }else{
                state.cart.push(item);
            }
            this.commit('saveData');
        },
        removeFromCart(state,item){
            let index = state.cart.indexOf(item);

            state.cart.splice(index,1);

            this.commit('saveData');
            
            Toast.fire({
                icon: 'success',
                title: 'U largua nga karta!'
            })
        },

    saveData(state){
        window.localStorage.setItem('cart',JSON.stringify(state.cart));
    }

    },
  })