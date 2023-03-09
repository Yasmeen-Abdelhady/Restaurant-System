<template>
    <div class="container">
        <NavbarComponent />
        <div>
            <p>Are You Sure You Want To Delete All Categories For Restaurant #{{ResId}}</p>
            <div>
                <router-link :to='{name: "MenuComponent" , params:{ResId:this.ResId}}'>
                    <button class="btn btn-info">Go Back To Menu</button>
                </router-link> &nbsp; &nbsp;
                <button class="btn btn-danger" @click="DeleteAllCategory()">Delete All</button>
            </div>
        </div>
    </div>
</template>

<script>
import NavbarComponent from "@/components/Header/Navbar.vue";
import axios from "axios";

export default {
    components: { NavbarComponent },
    data() {
        return {
            ResId: this.$route.params.ResId,
            userId: '',
            categories: []
        }
    },
    async mounted() {
        let user = localStorage.getItem('userInfo');
        if (user) {
            this.userId = JSON.parse(user).id;
            await axios.get(`http://localhost:3000/categories?userId=${this.userId}&ResId=${this.ResId}`).then(res => {
                this.categories = res.data;
            })
        } 
        else {
            this.$router.push({name : 'SignUpView'});
        }
    },
    methods: {
        async DeleteAllCategory() {
            for(let i=0 ; i<this.categories.length ; i++){
                let categoryID = this.categories[i].id;
                await axios.delete(`http://localhost:3000/categories/${categoryID}`)
                .then(res => {
                    if(res.status == 200){
                        setTimeout(() => {
                            this.$router.push({name : 'MenuComponent',params:{ResId:this.ResId}});
                        } , 1000)
                    }
                })
            }
        }
    }
}
</script>

<style>

</style>