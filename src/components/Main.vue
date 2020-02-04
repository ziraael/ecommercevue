<template>
  <div class="main mt-5">
      <div class="h-100">
          <div class="row h-100 justify-content-center align-items-center">
              <div id="kontenti" class="col-lg-5">
                  <div class="main-content">
                      <h1 class="main-title">
                          Vue Shop
                      </h1>
                      <p id="info">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae eos quos libero perferendis cumque! At placeat quo temporibus ipsam quas non beatae mollitia, adipisci enim velit iure voluptatem deleniti atque sint quos dignissimos perspiciatis vitae assumenda suscipit vero minima soluta.</p>
                        <div id="buttons" class="main-btn mt-5">
                            <button id="info-btn" class="btn custom-btn info-btn">
                                Info
                            </button>
                            <button @click="scrollTop" id="shophere" class="btn custom-btn btn-outline-secondary">Shop here</button>
                        </div>
                  </div>
              </div>
              <div class="col-lg-7">
                  <div class="graphic">
                      <img id="main-photo" src="/svg/researching.svg" width="80%">
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>


<script>
import $ from 'jquery';
export default {
  name: "Main",
  props: {
    msg: String
  },
  methods:{
        scrollTop(e){
        e.preventDefault();
        $("html,body").animate({
            scrollTop: $("#products").offset().top
        }, 500);
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:300&display=swap');

    #kontenti{
        display: flex;
        text-align: left;
        padding-left: 6vw;
    }
    .row{
        width: 100%;
        margin:0;
    }
    .info-btn{
        background-color: #566DD0;
        border-color: #566DD0;
        color: white;
    }
    .custom-btn:hover{
        background-color: #31C8C4;
        border-color: #31C8C4;
        color: white;
    }
    #info{
        font-family: 'Open Sans';
        font-size: 20px;
    }
    @media(max-width:1500px){
        #main-photo{
            width: 100%;
        }
    }
    @media(max-width:991px){
        #main-photo{
            margin-top: 5rem;
        }
        #kontenti{
            text-align: center;
            padding: 0;
        }
        #info{
            width: 80%;
            margin: auto;
        }
        #buttons{
            justify-content: center;
        }
    }
    #buttons{
        display: flex;
        flex-wrap: nowrap;
    }
    .custom-btn{
        width: 100px;
        padding: 12px;
        margin-right: 5px;
        margin-left: 5px;
    }
</style>
