<template>
    <form @click.prevent>
        <h1>Login</h1>
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
        <div v-if="userNotFound" class="mb-3 text-danger">{{this.userNotFound}}</div>
        <div class="mb-3">
        <button type="submit" class="btn btn-primary" @click="login">
            Login
        </button>
        </div>
        <div class="mb-3">
        Don't Have Account ?
        <router-link :to="{ name: 'SignUpView' }">SignUp</router-link>
        </div>
    </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import axios from "axios";

export default {
    name: "LoginForm",
    data() {
        return {
        v$: useVuelidate(),
        email: "",
        password: "",
        userNotFound : ''
        };
    },
    validations() {
        return {
        email: { required, email },
        password: { required, minLength: minLength(10) },
        };
    },
    methods: {
        async login() {
            this.v$.$validate();
            if (!this.v$.$error) {
                // get user data from localhost
                await axios
                .get(
                    `http://localhost:3000/users?email=${this.email}&password=${this.password}`
                ).then(res => {
                    if(res.data.length) {
                        // set user info in local storage
                        localStorage.setItem('userInfo',JSON.stringify(res.data[0]));
                        // redirect to home page
                        this.$router.push({ name: "home" });
                    }
                    else{
                        this.userNotFound = 'User Not Found'
                    }
                    
                }).catch(error => console.log(error));
            }
        },
    },
    mounted() {
        if (localStorage.getItem("userInfo")) {
            this.$router.push({ name: "home" });
        }
    },
};
</script>
