import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from 'jquery';
import 'popper.js';
import 'bootstrap';
import './assets/app.scss';
import {fb} from './firebase';
import VueFirestore from 'vue-firestore';
import Swal from 'sweetalert2';
import 'firebase/storage';
require('firebase/firestore')
import VueCarousel from 'vue-carousel';
import store from './store.js';
window.$ = window.jQuery = jQuery;

Vue.use(VueCarousel);


Vue.filter('striphtml', function (value) {
  var div = document.createElement("div");
  div.innerHTML = value;
  var text = div.textContent || div.innerText || "";
  return text;
});

Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key', tash mujm me perdor .id.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})

Vue.component('Navbar',require('./components/Navbar.vue').default);
Vue.component('add-to-cart',require('./components/AddToCart.vue').default);
Vue.component('mini-cart',require('./components/MiniCart.vue').default);
window.Swal = Swal;

Vue.use(VueFirestore)

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: false,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

window.Toast = Toast;
// Vue.component('Main',require('./components/Main.vue').default);

Vue.config.productionTip = false;

let app = '';

fb.auth().onAuthStateChanged(function(user){
  if(!app){
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
})




