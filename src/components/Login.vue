<template>
<!-- Modal -->
        <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">

                <div class="modal-body">


                        <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Signup</a>
                            </li>
                        </ul>

						<!-- L O G I N -->

                        <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                            
                            <!-- <h5 class="text-center">Login with your email</h5> -->							
                            <div class="form-group mt-4">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                                <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" @keyup.enter="login" v-model="password" class="form-control" id="exampleInputPassword1">
                            </div>

                             <div id="login-sign-btn" class="form-group">
                                <button class="btn btn-primary col-md-10" @click="login">Login</button>
                            </div>

                        </div>

						<!-- R E G I S T E R -->

                        <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                            
                             <!-- <h5 class="text-center">Create New Account</h5> -->
                             
                            <div class="form-group">
                                <label for="name">Your name</label>
                                <input type="text" v-model="name" class="form-control" id="name">
                            </div>

                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email"  v-model="email" class="form-control" id="email" aria-describedby="emailHelp" >
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" v-model="password" class="form-control" id="password">
                            </div>

                            <div id="login-sign-btn" class="form-group">
                                <button class="btn btn-primary col-md-10" @click="register">Signup</button>
                            </div>

                        </div>
                        </div>
                    
 
                </div>
           
            </div>
        </div>
	</div>
  </div>
</template>

<script>
import {fb,db} from '../firebase';

export default {
  name: "Login",
  props: {
    msg: String
  },
  data(){
	  return{
		  name: null,
		  email: null,
		  password: null,
	  }
  },
  methods:{
	login(){
		fb.auth().signInWithEmailAndPassword(this.email, this.password)
		.then(() => {
			$("#login").modal('hide')
			this.$router.replace('admin')
		})
		.catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			if (errorCode === 'auth/wrong-password') {
				alert('Wrong password.');
			} else {
				alert(errorMessage);
			}
			console.log(error);
		});
	},
	register(){
		fb.auth().createUserWithEmailAndPassword(this.email, this.password)
		.then((user) => {
			$("#login").modal('hide')

			db.collection("profiles").doc(user.user.uid).set({
			name: this.name,
			// email: this.email,
			// password: this.password,
			})
			.then(function() {
				console.log("Document successfully written!");
			})
			.catch(function(error) {
				console.error("Error writing document: ", error);
			});

			this.$router.replace('admin');
		})

		.catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode == 'auth/weak-password') {
			alert('The password is too weak.');
		} else {
			alert(errorMessage);
		}
		console.log(error);
		});
	},
    loginClick(){
        $('#login-form-link').click(function(e) {
        console.log("touched")
        $("#login-form").delay(100).fadeIn(100);
            $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    },
    registerClick(){
        $('#register-form-link').click(function(e) {
            $("#register-form").delay(100).fadeIn(100);
                $("#login-form").fadeOut(100);
            $('#login-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#login-sign-btn{
	height: 55px;
    display: flex;
    justify-content: center;
    padding: 10px 10px 0 10px;
}
.form-group .row{
    justify-content: center;
}
.panel-heading .row{
    justify-content: space-evenly;
}
.panel-login {
	border-color: #ccc;
	// -webkit-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
	// -moz-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
	// box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
}
.panel-login>.panel-heading {
	color: #00415d;
	background-color: #fff;
	border-color: #fff;
	text-align:center;
}
.panel-login>.panel-heading a{
	text-decoration: none;
	color: #666;
	font-weight: bold;
	font-size: 15px;
	-webkit-transition: all 0.1s linear;
	-moz-transition: all 0.1s linear;
	transition: all 0.1s linear;
}
.panel-login>.panel-heading a.active{
	color: #029f5b;
	font-size: 18px;
}
.panel-login>.panel-heading hr{
	margin-top: 10px;
	margin-bottom: 0px;
	clear: both;
	border: 0;
	height: 1px;
	background-image: -webkit-linear-gradient(left,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.15),rgba(0, 0, 0, 0));
	background-image: -moz-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
	background-image: -ms-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
	background-image: -o-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
}
.panel-login input[type="text"],.panel-login input[type="email"],.panel-login input[type="password"] {
	height: 45px;
	border: 1px solid #ddd;
	font-size: 16px;
	-webkit-transition: all 0.1s linear;
	-moz-transition: all 0.1s linear;
	transition: all 0.1s linear;
}
.panel-login input:hover,
.panel-login input:focus {
	outline:none;
	-webkit-box-shadow: none;
	-moz-box-shadow: none;
	box-shadow: none;
	border-color: #ccc;
}
.btn-login {
	background-color: #59B2E0;
	outline: none;
	color: #fff;
	font-size: 14px;
	height: auto;
	font-weight: normal;
	padding: 14px 0;
	text-transform: uppercase;
	border-color: #59B2E6;
}
.btn-login:hover,
.btn-login:focus {
	color: #fff;
	background-color: #53A3CD;
	border-color: #53A3CD;
}
.forgot-password {
	text-decoration: underline;
	color: #888;
}
.forgot-password:hover,
.forgot-password:focus {
	text-decoration: underline;
	color: #666;
}

.btn-register {
	background-color: #1CB94E;
	outline: none;
	color: #fff;
	font-size: 14px;
	height: auto;
	font-weight: normal;
	padding: 14px 0;
	text-transform: uppercase;
	border-color: #1CB94A;
}
.btn-register:hover,
.btn-register:focus {
	color: #fff;
	background-color: #1CA347;
	border-color: #1CA347;
}
</style>
