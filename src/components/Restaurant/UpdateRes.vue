<template>
    <NavbarComponent />
    <div class="container">
        <h1>Update Your Restaurant</h1>
        <form @click.prevent>
            <div class="mb-3">
                <input type="text" v-model="name" placeholder="Name" class="form-control"/>
                <span class="text-danger" v-if="v$.name.$error">{{v$.name.$errors[0].$message}}</span>
            </div>
            <div class="mb-3">
                <input type="text" v-model="phone" placeholder="Phone" class="form-control"/>
                <span class="text-danger" v-if="v$.phone.$error">{{v$.phone.$errors[0].$message}}</span>
            </div>
            <div class="mb-3">
                <input type="text" v-model="address" placeholder="Address" class="form-control"/>
                <span class="text-danger" v-if="v$.address.$error">{{v$.address.$errors[0].$message}}</span>
            </div>
            <div class="mb-3">
                <button class="btn btn-primary" @click="updateRes()">Update</button>
            </div>
        </form>
    </div>
</template>

<script>
import NavbarComponent from "@/components/Header/Navbar.vue";
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, numeric, minLength } from "@vuelidate/validators";

export default {
    components: {NavbarComponent},
    data() {
        return {
            v$: useVuelidate(),
            userId: '',
            ResId: '',
            name:'',
            address: '',
            phone:'',
            ResData: []
        }
    },
    mounted() {
        let user = localStorage.getItem('userInfo');
        if(user) {
            this.userId = JSON.parse(user).id;
            this.ResId = this.$route.params.ResId;
            this.CanCurrentUserAccessThisLocation()
        }
        else{
            this.$router.push({name : 'SignUpView'});
        }
    },
    validations() {
        return {
            name: {required , minLength:minLength(5)},
            phone: {required , numeric , minLength:minLength(10)},
            address: {required , minLength:minLength(10)}
        }
    },
    methods: {
        async CanCurrentUserAccessThisLocation() {
            await axios.get(`http://localhost:3000/restaurants?id=${this.ResId}&userId=${this.userId}`).then(res =>{
                this.ResData = res.data;
                this.name = this.ResData[0].name;
                this.phone = this.ResData[0].phone;
                this.address = this.ResData[0].address;
            }).catch(error => {
                if(error){
                    this.$router.push({name : 'home'});
                }
            })
        },
        async updateRes() {
            this.v$.$validate();
            if(!this.v$.$error) {
                await axios.put(`http://localhost:3000/restaurants/${this.ResId}`,{
                    name: this.name,
                    address: this.address,
                    phone: this.phone,
                    userId: this.userId
                }).then(res => {
                    if(res.status == 200){
                        this.$router.push({name : 'home'});
                    }
                })
            }
        }
    }
}
</script>