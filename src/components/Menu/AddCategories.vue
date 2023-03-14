<template>
    <div class="container">
        <NavbarComponent />
        <div class="text-start">
            <router-link :to="{name: 'MenuComponent' , params: {ResId:ResId}}">
                <button class="btn btn-info"> Go Back </button>
            </router-link>
        </div>
        <div>
            <h1>{{ResName}}</h1>
            <p class="text-muted">{{ResAddress}}</p>
        </div>
        <form @click.prevent>
            <div class="mb-3">
            <input
                class="form-control"
                type="text"
                placeholder="Category Name"
                v-model="name"
            />
            <span class="text-danger" v-if="v$.name.$error">{{v$.name.$errors[0].$message}}</span>
            </div>
            <button class="btn btn-success mb-3" @click="AddCategory()">Add Category</button>
            <div class = "alert alert-danger" v-if="errorMessage">{{errorMessage}}</div>
            <div class = "alert alert-success" v-if="successMessage">{{successMessage}}
            </div>
        </form>
    </div>
</template>

<script>
import NavbarComponent from "@/components/Header/Navbar.vue";
import axios from "axios";
import useVuelidate from '@vuelidate/core';
import { required , minLength , maxLength } from '@vuelidate/validators';

export default {
    components: { NavbarComponent },
    data() {
        return {
            v$: useVuelidate(),
            userId: '',
            ResId : this.$route.params.ResId,
            ResName: '',
            ResAddress: '',
            name: '',
            listOfCategories: [],
            errorMessage: '',
            successMessage: ''
        }
    },
    validations() {
        return {
            name: {required , minLength:minLength(3) , maxLength:maxLength(15)}
        }
    },
    mounted() {
        let user = localStorage.getItem('userInfo');
        if(user) {
            this.userId = JSON.parse(user).id
            this.CanCurrentUserAccessThisLocation()
            this.getUserCategories()
        }
        else {
            this.$router.push({name : 'SignUpView'});
        }
    },
    methods: {
        async CanCurrentUserAccessThisLocation() {
            await axios.get(`http://localhost:3000/restaurants?id=${this.ResId}&userId=${this.userId}`).then(res => {
                this.ResName = res.data[0].name;
                this.ResAddress = res.data[0].address;
            }).catch(error => {
                if(error) {
                    this.$router.push({name : 'home'});
                }
            })
        },
        async getUserCategories() {
            let result = await axios.get(`http://localhost:3000/categories?ResId=${this.ResId}&userId=${this.userId}`);
            if(result.status == 200){
                this.listOfCategories = result.data;
            }
        },
        async AddCategory() {
            this.v$.$validate();
            if(!this.v$.$error){
                console.log(this.listOfCategories)
                let filteredName = this.listOfCategories.filter(ele => ele.name.toLocaleLowerCase() == this.name.toLocaleLowerCase());
                console.log(filteredName)
                if(filteredName.length > 0){
                    this.successMessage = "";
                    this.errorMessage = "Name Is Duplicated"
                }
                else{
                    await axios.post(`http://localhost:3000/categories`,{
                        name: this.name,
                        userId: this.userId,
                        ResId: this.ResId
                    }).then(res => {
                        if(res.status == 201){
                            this.errorMessage = '';
                            this.successMessage = "Added New Category";
                            setTimeout( () => {
                                this.$router.push({name : 'MenuComponent' , params: {ResId:this.ResId}});
                            },2000)
                        }
                    })
                }
            }
        }
    }
}
</script>