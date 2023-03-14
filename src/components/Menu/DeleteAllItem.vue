<template>
    <div class="container">
        <NavbarComponent />
        <p>Are You Sure You Want To Delete All Items ?</p>
        <div class="mb-3">
            <div v-for="item in listOfItems" :key="item.id">- {{item.name}}</div>
        </div>
        <div class="mb-3">
            <router-link :to='{name: "DetailsRes" , params:{ResId:ResId}}'>
                <button class="btn btn-info">Go Back To Menu</button>
            </router-link> &nbsp; &nbsp;
            <button class="btn btn-danger" @click="DeleteAllItems()">Delete</button>
        </div>
        <div class="alert alert-success" v-if="successMessage">{{successMessage}}</div>
        <div class="alert alert-danger" v-if="errorMessage">{{errorMessage}}</div>
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
            listOfItems:[],
            successMessage:'',
            errorMessage:''
        }
    },
    async mounted() {
        let user = localStorage.getItem('userInfo');
        if(user) {
            this.userId = JSON.parse(user).id;

            let result = await axios.get(`http://localhost:3000/items?userId=${this.userId}&ResId=${this.ResId}`);
            if(result.status == 200 && result.data.length > 0){
                this.listOfItems = result.data
            }
            else {
                this.$router.push({name: "DetailsRes" , params:{ResId:this.ResId}});
            }
        }
        else {
            this.$router.push({name : 'SignUpView'});
        }
    },
    methods: {
        async DeleteAllItems() {
            for(let i=0; i<this.listOfItems.length; i++){
                await axios.delete(`http://localhost:3000/items/${this.listOfItems[i].id}`)
                .then(res => {
                    if(res.status == 200) {
                        this.successMessage = "Items is Deleted successfully";
                        this.errorMessage = '';
                        setTimeout(() => {
                            this.$router.push({name: "DetailsRes" , params:{ResId:this.ResId}})
                        }, 1000)
                    }
                }).catch(error => {
                    if(error) {
                        this.successMessage = "";
                        this.errorMessage = "Something went Wrong";
                        setTimeout(() => {
                            this.$router.push({name : 'home'});
                        }, 1000)
                    }
                })
            }
        }
    }
}
</script>


// {
//       "name": "chicken pizza ",
//       "price": 66,
//       "qty": 1666,
//       "description": "gggggggggggggggggggggggggggg",
//       "userId": 4,
//       "ResId": "1",
//       "catId": 1,
//       "id": 1
//     }