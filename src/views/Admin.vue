<template>
  <div class="admin">
      <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
          <a id="show-sidebar" @click="closeMenu" class="btn btn-sm btn-dark">
              <i class="fas fa-bars"></i>
          </a>
        <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
                <!-- sidebar-brand  -->
                <div class="sidebar-item sidebar-brand d-flex justify-content-between">
                    <div><router-link to="/"><strong>🛒 Vue Shop</strong></router-link></div>
                    <div id="close-sidebar" @click="closeMenu">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                <!-- sidebar-header  -->
                <div class="sidebar-item sidebar-header d-flex flex-nowrap">
                    <div class="user-pic">
                        <img class="img-responsive img-rounded" src="../assets/admin.png" alt="User picture">
                    </div>
                    <div class="user-info">
                        <span class="user-name">
                            <strong>{{name}}</strong> 👨‍💻
                        </span>
                        <span class="user-role">{{email}}</span>
                        <span class="user-status">
                            <i class="fa fa-circle"></i>
                            <span>Online</span>
                        </span>
                    </div>
                </div>
                <!-- sidebar-search  -->
                <div class="sidebar-item sidebar-search">
                    <div>
                        <div class="input-group">
                            <input type="text" class="form-control search-menu" placeholder="Search...">
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- sidebar-menu  -->
                <div class=" sidebar-item sidebar-menu">
                    <ul>
                        <li class="header-menu">
                            <span>General</span>
                        </li>
                        <li class="sidebar-dropdown">
                            <router-link to="/admin/overview">
                                <i class="fa fa-tachometer-alt"></i>
                                <span class="menu-text">Overview 📈</span>
                                <!-- <span class="badge badge-pill badge-warning">New</span> -->
                            </router-link>
                            <!-- <div class="sidebar-submenu">
                                <ul>
                                    <li>
                                        <a href="#">Dashboard 1
                                            <span class="badge badge-pill badge-success">Pro</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Dashboard 2</a>
                                    </li>
                                    <li>
                                        <a href="#">Dashboard 3</a>
                                    </li>
                                </ul>
                            </div> -->
                        </li>
                        <li>
                            <router-link to="/admin/products">
                                <i class="fab fa-amazon"></i>
                                <span class="menu-text">Products 📦</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/orders">
                                <i class="fa fa-shopping-cart"></i>
                                <span class="menu-text">Orders 🔥</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/profile">
                                <i class="fa fa-user"></i>
                                <span class="menu-text">Profile</span>
                            </router-link>
                        </li>
                        <li>
                            <a href="#" @click="logout">
                                <i class="fa fa-power-off"></i>
                                <span class="menu-text">Log Out 😴</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- sidebar-menu  -->
            </div>
        </nav>
        <!-- page-content  -->
        <main class="page-content pt-2">
            <router-view/>
        </main>
        <!-- page-content" -->
    </div>
    <!-- page-wrapper -->

  </div>
</template>

<script>
// @ is an alias to /src
import Main from "@/components/HelloWorld.vue";
import {fb} from '../firebase';

export default {
  name: "admin",
  components: {
    Main
  },
  data(){
      return{
          name:null,
          email:null,
      }
  },
  methods:{
    closeMenu(){
      $(".page-wrapper").toggleClass("toggled");
    },
    logout(){
        fb.auth().signOut()
        .then(() =>{
            this.$router.replace('/');
        })
        .catch((err) => {
            console.log(err);
        });
    }
  },
  created(){
      var user = fb.auth().currentUser;
      this.email = user.email;
  },
};
</script>

<style  scoped>
    #show-sidebar{
        border-radius: 0 0 0.7rem;
    }
    .fa-times{
        color: white;
        font-size: 20px;
        cursor: pointer;
    }
    .fa-bars{
        color: white;
    }
    .sidebar-wrapper .sidebar-menu .sidebar-dropdown > a:after {
        display: none;
    }
</style>
