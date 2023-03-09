<template>
    <div class="container">
        <form @click.prevent>
            <h1>Update Your Profile</h1>
            <div class="mb-3 text-start">
                <label for="name" class="form-label">UserName</label>
                <input
                    class="form-control"
                    type="text"
                    id="name"
                    v-model="name"
                />
                <span
                class="text-danger"
                v-if="v$.name.$error">{{v$.name.$errors[0].$message}}</span>
            </div>
            <div class="mb-3 text-start">
                <label class="form-label" for="email">Email</label>
                <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="email"
                />
                <span
                class="text-danger"
                v-if="v$.email.$error">{{v$.email.$errors[0].$message}}</span>
            </div>
            <div class="mb-3 text-start">
                <label class="form-label" for="password">Password</label>
                <input
                    type="password"
                    id="password"
                    class="form-control"
                    v-model="password"
                />
                <span
                class="text-danger"
                v-if="v$.password.$error">{{v$.password.$errors[0].$message}}</span>
            </div>
            <div class="mb-3">
                <button type="submit" class="btn btn-primary" @click="UpdateProfileNow()">
                    Update Your Profile Now
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import {required , email , minLength} from '@vuelidate/validators';
import axios from "axios";

export default {
    name : 'UpdateProfile',
    data() {
        return {
            v$ : useVuelidate(),
            name : '',
            email : '',
            password :'',
            userId :''
        }
    },
    validations() {
        return {
            name : {required},
            password : {required , minLength:minLength(10)},
            email : {required , email}
        }
    },
    mounted() {
        let user = localStorage.getItem('userInfo');
        if(user) {
            this.userId = JSON.parse(user).id;
            this.name = JSON.parse(user).name;
            this.email = JSON.parse(user).email;
            this.password = JSON.parse(user).password;
        }
        else {
            this.$router.push({name: 'sign-up'});
        }
    },
    methods: {
        async UpdateProfileNow() {
            this.v$.$validate();
            if(!this.v$.$error){
                // set new data in localhost
                await axios.patch(`http://localhost:3000/users/${this.userId}`,{
                    name: this.name,
                    email:this.email,
                    password:this.password
                }).then(res => {
                    // set new data in local storage 
                    localStorage.setItem('userInfo', JSON.stringify(res.data) );
                    // redirect to profile page
                    this.$router.push({name: 'ProfileView'})
                });
            }
        }
    }
}
</script>