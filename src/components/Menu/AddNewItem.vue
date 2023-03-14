<template>
    <div class="container">
        <NavbarComponent />
        <div>
            <router-link :to="{name : 'DetailsRes' , params:{ResId:this.ResId}}" class="float-start">
                <button class="btn btn-info">Go Back</button>
            </router-link>
            <div class="clearfix"></div>
            <h1 class="mb-0">{{ResName}}</h1>
            <p class="text-muted">{{ResAddress}}</p>
        </div>
        <h1>Add New Item</h1>
        <form @click.prevent>
            <div class="form-floating mb-3">
                <input
                type="text"
                class="form-control"
                v-model="name"
                id="name"
                placeholder="name">
                <label for="name">Item Name</label>
                <span class="text-danger" v-if="v$.name.$error">{{v$.name.$errors[0].$message}}</span>
            </div>
            <div class="form-floating mb-3">
                <input
                type="number"
                class="form-control"
                v-model="price"
                id="price"
                placeholder="price">
                <label for="price">Price</label>
                <span class="text-danger" v-if="v$.price.$error">{{v$.price.$errors[0].$message}}</span>
            </div>
            <div class="form-floating mb-3">
                <input
                type="number"
                class="form-control"
                v-model="qty"
                id="qty"
                placeholder="qty">
                <label for="qty">Quantity</label>
                <span class="text-danger" v-if="v$.qty.$error">{{v$.qty.$errors[0].$message}}</span>
            </div>
            <div class="form-floating mb-3">
                <textarea
                type="text"
                class="form-control"
                v-model="description"
                id="description"
                placeholder="description"></textarea>
                <label for="description">Description</label>
                <span class="text-danger" v-if="v$.description.$error">{{v$.description.$errors[0].$message}}</span>
            </div>
            <div class="form-floating mb-3">
                <select class="form-select" id="floatingSelect" aria-label="Floating label select example" v-model="category">
                    <option v-for="cat in listOfCategories" :key="cat.id" :value="cat.id">
                        {{cat.name}}
                    </option>
                </select>
                <label for="floatingSelect">Works with selects</label>
                <span class="text-danger" v-if="v$.category.$error">{{v$.category.$errors[0].$message}}</span>
            </div>
            <div class="mb-3">
                <button class="btn btn-primary" @click="AddItem()">
                    Add Item
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import NavbarComponent from "@/components/Header/Navbar.vue";
import axios from "axios";
import useVuelidate from '@vuelidate/core';
import {required , minLength , maxLength , between} from "@vuelidate/validators";

export default {
    components: { NavbarComponent },
    data() {
        return {
            v$: useVuelidate(),
            name: '',
            price: 0,
            description:'',
            qty: 1 ,
            userId: '',
            ResId: this.$route.params.ResId,
            ResName: '',
            ResAddress: '',
            category:'',
            listOfCategories:[]
        }
    },
    mounted() {
        let user = localStorage.getItem('userInfo');
        if(user) {
            this.userId = JSON.parse(user).id;
            this.CanCurrentUserAccessThisLocation();
            this.getCategories()
        }
        else {
            this.$router.push({name : 'SignUpView'});
        }
    },
    validations() {
        return {
            name: {required , minLength:minLength(6) },
            description: {required , minLength:minLength(6) , maxLength:maxLength(200)},
            price: {required , between:between(0,1000)},
            qty: {required , between:between(1,10000)},
            category: {required},
        }
    },
    methods: {
        async CanCurrentUserAccessThisLocation() {
            let result = await axios.get(`http://localhost:3000/restaurants?id=${this.ResId}&userId=${this.userId}`)
            if(result.status == 200 && result.data.length > 0){
                this.ResName = result.data[0].name;
                this.ResAddress = result.data[0].address;
            }
            else {
                this.$router.push({name : 'home'});
            }
        },
        async getCategories() {
            let result = await axios.get(`http://localhost:3000/categories?userId=${this.userId}&ResId=${this.ResId}`)
            if(result.status == 200 && result.data.length > 0){
                this.listOfCategories= result.data
            }
        },
        async AddItem() {
            this.v$.$validate();
            if(!this.v$.$error){
                await axios.post(`http://localhost:3000/items`,{
                    name: this.name,
                    price: this.price,
                    qty: this.qty,
                    description: this.description,
                    userId: this.userId,
                    ResId: this.ResId,
                    catId: this.category
                }).then(res => {
                    if(res.status == 201) {
                        this.$router.push({name : 'DetailsRes' , params:{ResId:this.ResId}});
                    }
                }).catch(error => {
                    if(error) {
                        console.log('something went wrong')
                    }
                })
            }
            else {
                console.log('error')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    textarea{
        resize: none;
    }
</style>