<template>
    <form @click.prevent>
        <h1>Your Profile</h1>
        <div class="mb-3 text-start">
        <label for="name" class="form-label">UserName</label>
        <input
            class="form-control"
            type="text"
            id="name"
            disabled
            v-model="name"
        />
        </div>
        <div class="mb-3 text-start">
        <label class="form-label" for="email">Email</label>
        <input
            type="email"
            class="form-control"
            disabled
            id="email"
            v-model="email"
        />
        </div>
        <div class="mb-3 text-start">
        <label class="form-label" for="password">Password</label>
        <input
            type="password"
            id="password"
            disabled
            class="form-control"
            v-model="password"
        />
        </div>
        <div class="mb-3">
        <button type="submit" class="btn btn-primary" @click="UpdateProfile">
            Update Your Profile 
        </button>
        </div>
    </form>
</template>

<script>
export default {
    name : 'ProfileForm',
    data() {
        return {
            name : '',
            email : '',
            password :''
        }
    },
    mounted() {
        let user = localStorage.getItem('userInfo');
        if(user) {
            this.name = JSON.parse(user).name;
            this.email = JSON.parse(user).email;
            this.password = JSON.parse(user).password;
        }
        else {
            this.$router.push({name: 'sign-up'});
        }
    },
    methods: {
        UpdateProfile() {
            this.$router.push({name : 'UpdateProfile'})
        }
    }
}
</script>