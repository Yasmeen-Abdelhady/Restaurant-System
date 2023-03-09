<template>
    <NavbarComponent />
    <div>
        <p>Are You Sure You Want To Delete All Restaurants ?</p>
        <div>
            <router-link :to="{name:'home'}">
                <button class="btn btn-info">Go Back</button>
            </router-link> &nbsp; &nbsp;
            <button class="btn btn-danger" @click="DeleteAll()">Delete All</button>
        </div>
    </div>
</template>

<script>
import NavbarComponent from "@/components/Header/Navbar.vue";
import axios from 'axios';

export default {
    components: {NavbarComponent},
    data() {
        return {
            userId: '',
            AllResData:[]
        }
    },
    async mounted() {
        let user = localStorage.getItem('userInfo');
        if(user){
            this.userId = JSON.parse(user).id;
            await axios.get(`http://localhost:3000/restaurants?userId=${this.userId}`).then(res => {
                this.AllResData = res.data
            })
        }else{
            this.$router.push({name : 'SignUpView'});
        }
    },
    methods: {
        async DeleteAll() {
            for(let i = 0 ; i < this.AllResData.length ; i++){
                let x = this.AllResData[i].id;
                await axios.delete(`http://localhost:3000/restaurants/${x}`).then(res => {
                    if(res.status == 200) {
                        this.$router.push({name : 'home'});
                    }
                })
            }
        }
    }
}
</script>
