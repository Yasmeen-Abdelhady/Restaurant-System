<template>
    <NavbarComponent />
    <div class="container">
        <h1>Add New Restaurant</h1>
        <form @click.prevent>
            <div class="mb-3 text-start">
            <input
                class="form-control"
                type="text"
                placeholder="Restaurant Name"
                v-model="name"
            />
            <span class="text-danger" v-if="v$.name.$error">{{v$.name.$errors[0].$message}}</span>
            </div>
            <div class="mb-3 text-start">
            <input
                type="text"
                class="form-control"
                placeholder="Phone Number"
                v-model="phone"
            />
            <span class="text-danger" v-if="v$.phone.$error">{{v$.phone.$errors[0].$message}}</span>
            </div>
            <div class="mb-3 text-start">
            <input
                type="text"
                placeholder="Address"
                class="form-control"
                v-model="address"
            />
            <span class="text-danger" v-if="v$.address.$error">{{v$.address.$errors[0].$message}}</span>
            </div>
            <button type="button" class="btn btn-primary" @click="AddRestaurant()">Add Restaurant</button>
        </form>
    </div>
</template>

<script>
import NavbarComponent from "@/components/Header/Navbar.vue";
import useVuelidate from '@vuelidate/core';
import { required , minLength , numeric } from '@vuelidate/validators';
import axios from 'axios'

export default {
    components: {NavbarComponent},
    data() {
        return {
            v$: useVuelidate(),
            name: '',
            phone: '',
            address: '',
            userId: ''
        }
    },
    validations() {
        return {
            name: {required , minLength:minLength(5)},
            phone: {required , numeric , minLength:minLength(10)},
            address: {required , minLength:minLength(10)}
        }
    },
    mounted() {
        let user = localStorage.getItem('userInfo');
        if(user) {
            this.userId = JSON.parse(user).id;
        }
        else {
            this.$router.push({name: 'SignUpView'});
        }
        
    },
    methods: {
        async AddRestaurant() {
            this.v$.$validate();
            if(!this.v$.$error){
                console.log('success')
                // Add Restaurant in Localhost
                await axios.post('http://localhost:3000/restaurants',{
                    name : this.name,
                    phone: this.phone,
                    address: this.address,
                    userId: this.userId
                }).then(res => {
                    console.log(res);
                    this.$router.push({name: 'home'})
                })
            }
            else {
                console.log('not success')
            }
        }
    }
}
</script>