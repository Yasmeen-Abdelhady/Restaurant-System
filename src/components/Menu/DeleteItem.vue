<template> 
    <div class="container">
        <NavbarComponent />
        <div>
            <p>Are You Sure You Want To Delete This Item ?</p>
            <p>{{itemName}}</p>
            <div>
                <router-link :to='{name: "DetailsRes" , params:{ResId:ResId}}'>
                    <button class="btn btn-info">Go Back To Menu</button>
                </router-link> &nbsp; &nbsp;
                <button class="btn btn-danger" @click="DeleteItem()">Delete</button>
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
            itemId: this.$route.params.itemId,
            ResName: '',
            ResAddress: '',
            userId: '',
            itemName: '',
            listOfItems:[]
        }
    },
    async mounted() {
        let user = localStorage.getItem('userInfo');
        if(user) {
            this.userId = JSON.parse(user).id;
            this.getItems();
        }
        else {
            this.$router.push({name : 'SignUpView'});
        }
    },
    methods: {
        async getItems() {
            let result = await axios.get(`http://localhost:3000/items?id=${this.itemId}&ResId=${this.ResId}&userId=${this.userId}`);
            if(result.status == 200 && result.data.length > 0){
                this.itemName = result.data[0].name
            }
            else {
                this.$router.push({name : 'home'});
            }
        },
        async DeleteItem() {
            await axios.delete(`http://localhost:3000/items/${this.itemId}`)
            .then(res => {
                if(res.status == 200){
                    this.$router.push({name: "DetailsRes" , params:{ResId:this.ResId}})
                }
            }).catch(error => {
                if(error) {
                    console.log(error)
                }
            })
        }
    }
}
</script>