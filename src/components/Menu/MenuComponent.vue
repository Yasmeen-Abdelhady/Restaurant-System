<template>
    <div class="container">
        <NavbarComponent />
        <div>
            <router-link :to="{name: 'AddCategories' , params: {ResId:ResId}}" class="float-start">
                <button class="btn btn-success"> View/Add Categories</button>
            </router-link>
            <button class="btn btn-success float-end" v-if="listOfCategories.length >0">Add Items</button>
            <div class="clearfix"></div>
        </div>
        <div>
            <h1 class="mb-0">{{ResName}}</h1>
            <p class="text-muted">{{ResAddress}}</p>
        </div>
        <table class="table caption-top table-striped" v-if="listOfCategories.length > 0">
        <caption>All Categories: ({{listOfCategories.length}})
            <router-link :to="{name:'DeleteAllCategories' , params:{ResId: this.ResId}}"> 
                <button class="btn btn-danger float-end">Delete All</button>
            </router-link>
        </caption>
        <thead class="table-dark">
            <tr>
                <th>Name</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="category in listOfCategories" :key="category.id">
                <th>{{category.name}}</th>
                <td>
                    <router-link :to="{name:'UpdateCategory' ,
                    params: {ResId : this.ResId , catId : category.id}}">
                        <button class="btn btn-info">Update</button>
                    </router-link> &nbsp;
                    <router-link :to="{name:'DeleteCategory' , params: {ResId : this.ResId , catId : category.id}}">
                        <button class="btn btn-danger">Delete</button>
                    </router-link> &nbsp;

                    <!-- <router-link :to="{name:'DeleteRes' , params: {ResId : restaurant.id}}">
                        <button class="btn btn-danger">Delete</button>
                    </router-link> &nbsp;
                    <router-link :to="{name:'UpdateRes' , params: {ResId : restaurant.id}}">
                        <button class="btn btn-info">Update</button>
                    </router-link> &nbsp;
                    <router-link :to="{name:'MenuComponent' , params: {ResId : restaurant.id}}">
                        <button class="btn btn-success">Menu</button>
                    </router-link> -->
                </td>
            </tr>
        </tbody>
    </table>
    <div v-else class="alert alert-warning">No Categories Yet</div>
    </div>
</template>

<script>
import NavbarComponent from "@/components/Header/Navbar.vue";
import axios from "axios";

export default {
    components: { NavbarComponent },
    data() {
        return {
            userId: '',
            ResId : this.$route.params.ResId,
            ResName: '',
            ResAddress: '',
            listOfCategories:[]
        }
    },
    mounted() {
        let user = localStorage.getItem('userInfo');
        if(user) {
            this.userId = JSON.parse(user).id
            this.CanCurrentUserAccessThisLocation()
            this.getCategories()
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
        async getCategories() {
            await axios.get(`http://localhost:3000/categories?ResId=${this.ResId}`).then(res => {
                if(res.data.length > 0) {
                    this.listOfCategories = res.data
                }
            }).catch (error => {
                if(error) {
                    this.listOfCategories= ''
                }
            })
        }
    }
}
</script>