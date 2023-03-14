<template>
    <div class="container">
        <NavbarComponent />
        <div>
            <router-link :to="{name: 'MenuComponent' , params: {ResId:ResId}}" class="float-start">
                <button class="btn btn-success">View/Add Categories</button>
            </router-link>
            <router-link :to='{name: "AddNewItem" , params:{ResId:ResId }}'>
                <button class="btn btn-success float-end" v-if="listOfCategories.length >0">Add Items</button>
            </router-link>
            <div class="clearfix"></div>
        </div>
        <div class="position-relative">
            <div class="text-center">
                <h1 class="mb-0">{{ResName}}</h1>
                <p class="text-muted">{{ResAddress}}</p>
            </div>
            <router-link :to="{name:'DeleteAllItem',params:{ResId:ResId}}" v-if="listOfItems.length >0" class="deleteAll">
                <button class="btn btn-danger">DeleteAll</button>
            </router-link>
        </div>
        <div>
            <div v-for="cat in listOfCategories" :key="cat.id">
                <h3 class="bg-gray p-1">{{cat.name}}</h3>
                <div class="row">
                    <div 
                    v-for="item in listOfItems" :key="item.id"
                    v-show="cat.id == item.catId"
                    class="text-start p-3"
                    :class="{'col-4' : cat.id == item.catId}">
                        <div class="content">
                            <div>
                            <h4>{{item.name}}</h4>
                            <p class="text-muted h-100">{{item.description}}</p>
                            </div>
                            <div class="text-muted d-flex justify-content-between">
                                <p>Available Qty: {{item.qty}}</p>
                                <p>Price: {{item.price}}</p>
                            </div>
                            <div class="d-flex justify-content-between pb-3">
                                <router-link 
                                :to="{name: 'UpdateItem',params:{ResId:ResId,itemId:item.id}}">
                                    <button class="btn btn-info">Update</button>
                                </router-link>
                                <router-link :to="{name:'DeleteItem',params:{ResId:ResId,itemId:item.id}}">
                                    <button class="btn btn-danger">Delete</button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavbarComponent from "@/components/Header/Navbar.vue";
import axios from "axios";

export default {
    components: {NavbarComponent},
    data() {
        return {
            ResId: this.$route.params.ResId,
            ResName: '',
            ResAddress: '',
            userId: '',
            listOfCategories: [],
            listOfItems:[]
        }
    },
    async mounted() {
        let user = localStorage.getItem('userInfo');
        if(user) {
            this.userId = JSON.parse(user).id;
            this.CanCurrentUserAccessThisRestaurant();
            this.getCategories();
            this.getItems();
        }
        else {
            this.$router.push({name : 'SignUpView'});
        }
    },
    methods: {
        async CanCurrentUserAccessThisRestaurant() {
            await axios.get(`http://localhost:3000/restaurants?id=${this.ResId}&userId=${this.userId}`)
            .then(res => {
                this.ResName = res.data[0].name,
                this.ResAddress = res.data[0].address
            }).catch(error => {
                if(error) {
                    this.$router.push({name : 'home'});
                }
            })
        },
        async getCategories() {
            await axios.get(`http://localhost:3000/categories?userId=${this.userId}&ResId=${this.ResId}`).then(res => {
                this.listOfCategories = res.data
            })
        },
        async getItems() {
            await axios.get(`http://localhost:3000/items?userId=${this.userId}&ResId=${this.ResId}`).then(res => {
                this.listOfItems = res.data
            })
        }
    }

}
</script>

<style>
.bg-gray{
    background-color: #f4f4f4;
}
.h-100{
    min-height: 100px;
}
.content{
    border-bottom: 2px solid #ddd;
}
.deleteAll{
    position: absolute;
    right: 0;
    bottom: 0;
}
</style>