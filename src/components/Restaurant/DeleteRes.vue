<template>
    <NavbarComponent />
    <div>
        <div>
            <h1>Delete Restaurant #{{ResId}}</h1>
            <p>Are You Sure You Want To Delete This Restaurant ?</p>
        </div>
        <div>
            <p>{{name}}</p>
            <p>{{address}}</p>
            <p>{{phone}}</p>
        </div>
        <div>
            <button @click="goBack()" class="btn btn-info">Go Back</button> &nbsp; &nbsp;
            <button @click="Delete()" class="btn btn-danger">Delete</button>
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
            userId:'',
            name: '',
            address: '',
            phone: '',
            LocationData: '',
            ItemDeleted : ''
        }
    },
    async mounted() {
        let user = localStorage.getItem('userInfo');
        if(user){
            this.userId = JSON.parse(user).id;
            this.CanCurrentUserAccessThisLocation()
        }
        else{
            this.$router.push({name : 'SignUpView'});
        }
    },
    methods: {
        goBack() {
            this.$router.push({name : 'home'});
        },
        async Delete() {
            await axios.delete(`http://localhost:3000/restaurants/${this.ResId}`).then(
                this.$router.push({name : 'home'})
            )
        },
        async CanCurrentUserAccessThisLocation() {
            let result = await axios.get(
            `http://localhost:3000/restaurants?id=${this.ResId}&userId=${this.userId}`
            );
            if(result.status == 200 && result.data.length > 0){
                this.LocationData = result.data;
                this.name = this.LocationData[0].name;
                this.address = this.LocationData[0].address;
                this.phone = this.LocationData[0].phone;
            }
            else { 
                this.$router.push({name : 'home'});
            }
        }
    }
}
</script>

<style>

</style>