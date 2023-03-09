<template>
    <div class="container">
        <NavbarComponent />
        <div>
            <p>Are You Sure You Want To Delete This Category ?</p>
            <p>{{categoryName}}</p>
            <div>
                <router-link :to='{name: "MenuComponent" , params:{ResId:this.ResId}}'>
                    <button class="btn btn-info">Go Back To Menu</button>
                </router-link> &nbsp; &nbsp;
                <button class="btn btn-danger" @click="DeleteCategory()">Delete</button>
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
            catId: this.$route.params.catId,
            userId: '',
            categoryName: '',
        }
    },
    async mounted() {
        let user = localStorage.getItem('userInfo');
        if(user) {
            this.userId = JSON.parse(user).id;
            await axios.get(`http://localhost:3000/categories?id=${this.catId}&userId=${this.userId}&ResId=${this.ResId}`).then( res => {
                this.categoryName = res.data[0].name
            }).catch(error => {
                if(error) {
                    this.$router.push({name : 'home'});
                }
            })
        }
        else{
            this.$router.push({name : 'SignUpView'});
        }
    },
    methods: {
        async DeleteCategory() {
            await axios.delete(`http://localhost:3000/categories/${this.catId}`)
            .then(res => {
                if(res.status == 200) {
                    this.$router.push({name : 'MenuComponent',params:{ResId:this.ResId}});
                }
            })
        }
    }
}
</script>

<style>

</style>