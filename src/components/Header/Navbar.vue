<template>
    <nav>
        <router-link to="/">Home</router-link> |
        <a href="#" @click="logout()">Logout</a>
    </nav>
</template>

<script>
export default {
    name : 'NavbarComponent',
    methods: {
        logout() {
            localStorage.removeItem('userInfo');
            this.$router.push({ name: 'LoginView' });
        }
    }
}
</script>

<style lang="scss" scoped>
nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;
        text-decoration: none;

        &.router-link-exact-active {
        color: #42b983;
        }
    }
}
</style>