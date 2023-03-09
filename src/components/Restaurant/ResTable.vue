<template>
    <table class="table caption-top table-striped" v-if="allRestaurants.length > 0">
        <caption>All Restaurants: ({{allRestaurants.length}})
            <router-link :to="{name:'DeleteAll'}">
                <button class="btn btn-danger float-end">Delete All</button>
            </router-link>
        </caption>
        <thead class="table-dark">
            <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="restaurant in allRestaurants" :key="restaurant.id">
                <th>{{restaurant.name}}</th>
                <td>{{restaurant.phone}}</td>
                <td>{{restaurant.address}}</td>
                <td>
                    <router-link :to="{name:'DeleteRes' , params: {ResId : restaurant.id}}">
                        <button class="btn btn-danger">Delete</button>
                    </router-link> &nbsp;
                    <router-link :to="{name:'UpdateRes' , params: {ResId : restaurant.id}}">
                        <button class="btn btn-info">Update</button>
                    </router-link> &nbsp;
                    <router-link :to="{name:'MenuComponent' , params: {ResId : restaurant.id}}">
                        <button class="btn btn-success">Menu</button>
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
    <div v-else class="alert alert-warning">No Restaurants Yet</div>
</template>

<script>
export default {
    props: ["allRestaurants"],
}
</script>