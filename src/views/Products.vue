<template>
  <div class="products">
      <div class="container h-100 mt-5">
        <div class="intro h-100">
          <div class="row h-100 justify-content-center align-items-center">
            <div class="col-md-6">
                <h3>Products page</h3>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore laudantium aliquam sint alias iusto, quia blanditiis eveniet illum doloremque unde!</p>
            </div>
            <div class="col-md-6">
				<img src="/svg/products.svg" class="img-fluid">
            </div>
          </div>
        </div>

		<hr>

		<div class="product-test mt-4 col-md-12">

			<h3 class="mb-3 d-inline">Products list</h3>

			<button id="add-btn" @click="addNew" class="btn btn-primary float-right mb-2 col-12 col-md-2">Shto produkt</button @click="addNew">

			<div class="table-responsive">
				<table class="table">
					<thead>
						<tr class="text-center">
							<th>Name</th>
							<th>Price</th>
							<th>Tag</th>
							<th>Modify</th>
						</tr>
					</thead>

					<tbody class="text-center">
						<tr v-for="product in products">
							<td>
								{{product.name}}
							</td>
							<td>
								{{product.price}}
							</td>
							<td id="tagat" class="d-flex"> 
								<p v-for="tag in product.tags" class="p-1">
									 <span class="badge badge-secondary">{{tag}}</span>
								</p>
							</td>

							<td id="action-btns">
								<button class="btn btn-primary mr-1" @click="editProduct(product)">Edit</button>
								<button class="btn btn-danger ml-1" @click="deleteProduct(product)">Delete</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
      </div>

		<!-- Modal -->
		<div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editTitle" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" id="product-modal" role="document">
			<div id="product-content-modal" class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLongTitle">Shto produktin</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body d-flex">
			<div id="part1" class="col-md-8">
				<div class="form-group">
					<input type="text" v-model="product.name" placeholder="Product name" class="form-control">
				</div>

				<div class="input-group">
					<vue-editor v-model="product.description"></vue-editor>
				</div>
			</div>

			<div id="part2" class="col-md-4">
				<h5 class="modal-title mb-3">Product details</h5>
				<hr>
				<div class="form-group mb-4">
					<input type="text" v-model="product.price" placeholder="Product price" class="form-control">
				</div>

				<div class="form-group mb-4">
					<input type="text" @keyup.enter="addTag()" v-model="tag" placeholder="Product tags" class="form-control">
					<!-- <button @click="resetTags()" class="btn btn-danger mt-2">Reseto</button> -->
					<!-- <span id="product-tag" class="badge badge-light mt-3">{{product.tags}}</span> -->

					<div id="tag-wrap" class="d-flex flex-wrap">
						<p v-for="(tag,index) in product.tags" class="mb-0 p-1">
							<!-- <div id="tag-wrap"> -->
								<span id="product-tag" class="badge badge-info mt-3">{{tag}}</span>
								<i class="fas fa-times delete-tag" @click="deleteTag(tag,index)"></i>
							<!-- </div> -->
						</p>
					</div>
				</div>

				<div class="form-group">
					<label for="exampleFormControlFile1">Product images</label>
					<input @change="uploadImage" type="file" class="form-control-file" id="exampleFormControlFile1">
				</div>

				<div class="p-1 form-group">
					<div id="widthi" class="d-flex flex-wrap">
						<div v-for="(image,index) in product.images">
							<div id="img-wrap">
								<img class="m-3" :src="image" alt="" width="100px" height="100px">
								<i class="fas fa-times delete-img" @click="deleteImage(image,index)"></i>
								<!-- <span class="delete-img" @click="deleteImage(image,index)">X</span> -->
							</div>
						</div>
					</div>
				</div>
			</div>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				<button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal === 'new'">Save changes</button>
				<button @click="updateProduct()" type="button" class="btn btn-primary" v-if="modal === 'edit'">Update changes</button>
			</div>
			</div>
		</div>
		</div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import {fb,db} from '../firebase';
export default {
  name: "Products",
components:{
	VueEditor,
},
  props: {
    msg: String
  },
  
  data(){
	  return{
		products:[],
		product:{
		  name:null,
		  description:null,
		  price:null,
		  tags:[],
		  images:[],
		},
		activeItem:null,
		modal: null,
		tag:null,
	  }
  },
  firestore(){
	  return{
		products: db.collection('products'),
	  }
  },
  methods:{
	deleteTag(tag,index){
		this.product.tags.splice(index,1);
	},
	deleteImage(img,index){
		let image = fb.storage().refFromURL(img);

		this.product.images.splice(index,1);

		image.delete().then(function(){
			console.log('deleted img');
		}).catch(function(error){
			console.log('error');
		});
	},
	uploadImage(e){
		if(e.target.files[0]){
			//fajlli
			let file = e.target.files[0];
			//referenca
			var storageRef = fb.storage().ref('products/'+ Math.random() + '_' + file.name);

			//put it in that referenc
			let uploadTask = storageRef.put(file);

			uploadTask.on('state_changed', (snapshot) =>{

			}, (error) =>{

			}, () =>{

			uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
				this.product.images.push(downloadURL);
				});
			});
		}
	},
	// resetTags(){
	// 	this.product.tags = '';
	// },
	addTag(){
		this.product.tags.push(this.tag);
		this.tag = "";
	},
    reset(){
      this.product = {
          name:null,
          description:null,
          price:null,
          tags:[],
          images:[]
      }
	},
	
	addNew(){
		this.modal = 'new';
		this.reset();
		$("#product").modal('show');
	},

	updateProduct(){
		this.$firestore.products.doc(this.product.id).update(this.product);
			Toast.fire({
			icon: 'success',
			title: 'U përditësua me sukses!'
		})
		$("#product").modal('hide');
	},
	editProduct(product){
		this.modal = 'edit';
		this.product = product;
		$("#product").modal('show');

	},
	deleteProduct(doc){
		
	Swal.fire({
		title: 'A jeni i sigurtë?',
		text: "Ju nuk do të jeni në gjendje ta ktheni këtë veprim!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Fshij'
		}).then((result) => {
		if (result.value) {
			this.$firestore.products.doc(doc.id).delete()

			Toast.fire({
			icon: 'warning',
			title: 'U fshi me sukses!'
			})
		}
		})
	},
	readData(){

	},
	addProduct(){
		this.$firestore.products.add(this.product)
		Toast.fire({
			icon: 'success',
			title: 'U krijua me sukses!'
		})
		$("#product").modal('hide');
	},

  },
	created(){
		
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.table thead th{
		border-bottom: 1px solid #dee2e6 !important;
	}
	.modal-body{
		flex-wrap: wrap;
	}
	.product-test{
		margin: auto;
	}
	#product-modal{
		max-width: 1000px !important;
	}
	.quillWrapper{
		height: 100%;
	}
	#action-btns{
		width: 200px;
		white-space: nowrap;
	}
	#product-tag{
		font-size: 90%;
	}
	#img-wrap{
		position: relative;
	}
	#tag-wrap{
		position: relative;
	}
	#img-wrap .delete-img{
		position: absolute;
		top: 2px;
		right: 16px;
	}
	#tag-wrap .delete-tag{
		font-size: 10px;
		position: relative;
		top: -15px;
		left: -7px;
	}
	#img-wrap .delete-img:hover{
		cursor: pointer;
	}
	#tag-wrap .delete-tag:hover{
		cursor: pointer;
	}
	#tagat{
		justify-content: center;
		flex-wrap: wrap;
		margin: auto;
	}
	@media(max-width:1000px){
		#tagat{
			flex-wrap: nowrap;
			justify-content: unset;
		}
	}
	@media(max-width:768px){
		#product-content-modal{
			height: 100%;
		}
		.product-test{
			text-align: center;
		}
		#add-btn{
			margin-top: 1rem;
			margin-bottom: 1rem !important;
		}
	}
</style>
