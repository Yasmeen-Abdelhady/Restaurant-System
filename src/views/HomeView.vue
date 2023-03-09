<template>
    <div class="container">
        <NavbarComponent />
        <div class="text-end me-4">Welcome {{name}}
            <button class="profile"> 
                <router-link :to="{name:'ProfileView'}">Profile</router-link>
            </button>
        </div>
        <div class="text-start">
            <router-link :to="{name:'AddRestaurant'}">
                <button class="btn btn-primary">Add New Restaurant</button>
            </router-link>
        </div>
        <div class="text-start">
            <ResTable :allRestaurants='allRestaurants' />
        </div>
    </div>
</template>

<script>
import NavbarComponent from "@/components/Header/Navbar.vue";
import ResTable from "@/components/Restaurant/ResTable.vue";
import axios from "axios";

export default {
    name: 'HomeView',
    components: { NavbarComponent , ResTable},
    data() {
        return {
            name : '',
            userId : '',
            allRestaurants: [],
        }
    },
    async mounted() {
        let user = localStorage.getItem('userInfo');
        if(user){
            this.name = JSON.parse(user).name;
            this.userId = JSON.parse(user).id;
        }
        else{
            this.$router.push({name : 'SignUpView'});
        }
        await axios.get(`http://localhost:3000/restaurants?userId=${this.userId}`)
        .then(res => {
            this.allRestaurants = res.data
        })
    }
}
</script>

<style lang="scss" scoped>
.profile {
    border: none;
    outline: none;
    background-color: cyan;
    padding: 5px 10px;

    a{
        color : black;
        text-decoration: none;
    }
}
</style>