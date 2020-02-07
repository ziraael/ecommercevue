<template>
  <div id="the-nav">
	<nav id="navi" class="navbar navbar-expand-lg navbar-light mt-2">
        <router-link class="navbar-brand" to="/">
			<img id="logo" src="/svg/logo.svg" width="60" class="pr-3" alt="">Vue Shop
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <router-link to="/" class="nav-link" href="#">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/about" class="nav-link" href="#">About</router-link>
            </li>
            </ul>
            <form id="search-bar" class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Çfarë keni në mendje?" aria-label="Search">
            <!-- <button class="btn btn-outline-info my-2 my-sm-0 mt-3" type="submit">Kërko</button> -->
            <a id="the-login" class="btn btn-outline-success my-2 my-sm-0 mt-3 ml-2" data-toggle="modal" data-target="#login">Login</a>
            <a id="mycart" class="btn btn-outline-warning my-2 my-sm-0 mt-3 ml-2" data-toggle="modal" data-target="#miniCart">My Cart</a>
            <router-link to="/admin"><a id="the-profile" class="btn btn-outline-danger my-2 my-sm-0 mt-3 ml-2">Profile</a></router-link>
            </form>
        </div>
	</nav>
  </div>
</template>

<script>
import {fb} from '../firebase';

export default {
  name: "Navbar",
  props: {
	msg: String,
  },
methods:{
	isLogged(){
		fb.auth().onAuthStateChanged((user) => {
			if (user) {
				console.log("whatt2")
				// this.isLoggedin = true;
			} else {
				console.log("whatt")
				// this.isLoggedin = false;
			}
		});
	}
},

};
</script>

<script>
$(function(){
	if(window.innerWidth < 992){
		$("nav").addClass('shadow-sm');
	}
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	#mycart{
		color: #c39303;
	}
	#mycart:hover{
		color: white;
	}
	#the-profile{
		// display: none;
		color: #dc3545;
		text-decoration: none;
	}
	#the-profile:hover{
		color: white;
	}
	#the-nav{
		display: flex;
		justify-content: space-around;
	}
	.navbar{
		width: 90%;
		background:none;
	}
	#search-bar{
		place-content: center;
	}
	ul{
		text-align: center;
	}
	@media(max-width: 992px) {
	#logo{
		width: 50px;
	}
	.navbar{
		width: 100%;
	}
	}
	#the-login{
		color: #28a745;
	}
	#the-login:hover{
		background-color: #28a745;
		border-color: #28a745;
		color: white;
	}
</style>
