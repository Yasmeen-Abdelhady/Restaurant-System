<template>
    <form @click.prevent>
        <h1>SignUp</h1>
        <div class="mb-3 text-start">
        <label for="name" class="form-label">UserName</label>
        <input
            class="form-control"
            type="text"
            id="name"
            placeholder="Enter Your Name"
            v-model="name"
        />
        <span class="text-danger" v-if="v$.name.$error">{{
            v$.name.$errors[0].$message
        }}</span>
        </div>
        <div class="mb-3 text-start">
        <label class="form-label" for="email">Email</label>
        <input
            type="email"
            class="form-control"
            placeholder="Your Email"
            id="email"
            v-model="email"
        />
        <span class="text-danger" v-if="v$.email.$error">{{
            v$.email.$errors[0].$message
        }}</span>
        </div>
        <div class="mb-3 text-start">
        <label class="form-label" for="password">Password</label>
        <input
            type="password"
            id="password"
            placeholder="Your Password"
            class="form-control"
            v-model="password"
        />
        <span class="text-danger" v-if="v$.password.$error">{{
            v$.password.$errors[0].$message
        }}</span>
        </div>
        <div class="mb-3">
        <button type="submit" class="btn btn-primary" @click="validateEmailBeforeSignUp()">
            SignUp Now
        </button>
        </div>
        <div class="mb-3">
        You Already Have Account ?
        <router-link :to="{ name: 'LoginView' }">Login</router-link>
        </div>
        <div class="alert alert-success" v-if="successMessage">{{successMessage}}</div>
        <div class="alert alert-danger" v-if="errorMessage">{{errorMessage}}</div>
    </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import axios from "axios";

export default {
    data() {
        return {
        v$: useVuelidate(),
        name: "",
        email: "",
        password: "",
        userEmailExists:[],
        successMessage: "",
        errorMessage: ""
        }
    },
    validations() {
        return {
        name: { required , minLength:minLength(10)},
        password: { required, minLength: minLength(10) },
        email: { required, email },
        };
    },
    methods: {
        async validateEmailBeforeSignUp() {
            let result = await axios.get(`http://localhost:3000/users?email=${this.email}`)
            if(result.status == 200){
                console.log(result)
                this.userEmailExists = result.data
                if(this.userEmailExists.length >0){
                    this.successMessage = "";
                    this.errorMessage = "this email already exists...";
                }
                else {
                    this.successMessage = "";
                    this.errorMessage = "";
                    this.signUp();
                }
            }
        },
        async signUp() {
            this.v$.$validate();
            if(!this.v$.$error){
                // post data in localhost
                await axios.post('http://localhost:3000/users',{
                    name : this.name,
                    email : this.email,
                    password : this.password
                }).then((res) => {
                    // set data in local storage
                    window.localStorage.setItem('userInfo',JSON.stringify(res.data))
                    // redirect to home page
                    this.successMessage = "Loading...";
                    setTimeout(()=>{
                        this.$router.push({name : 'home'})
                    },1000)
                }).catch(error => {
                    console.log(error)
                });
            }
            else{
                console.log("can't add any user")
            }
        }
    },
    mounted() {
        if(localStorage.getItem('userInfo')){
            this.$router.push({name : 'home'})
        }
    }
};
</script>
