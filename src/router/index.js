import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignUpView from '../views/SignUp.vue';
import LoginView from '../views/Login.vue';
import ProfileView from "../views/Profile.vue";
import UpdateProfile from "@/components/Profile/UpdateProfile.vue";
import AddRestaurant from "@/components/Restaurant/AddRestaurant.vue";
import DeleteRes from "@/components/Restaurant/DeleteRes.vue";
import DeleteAll from "@/components/Restaurant/DeleteAll.vue";
import UpdateRes from "@/components/Restaurant/UpdateRes.vue";
import DetailsRes from "@/components/Menu/DetailsRes.vue";
import MenuComponent from "@/components/Menu/MenuComponent.vue";
import AddCategories from "@/components/Menu/AddCategories.vue";
import UpdateCategory from "@/components/Menu/UpdateCategory.vue";
import DeleteCategory from "@/components/Menu/DeleteCategory.vue";
import DeleteAllCategories from "@/components/Menu/DeleteAllCategories.vue";
import AddNewItem from "@/components/Menu/AddNewItem.vue";
import UpdateItem from "@/components/Menu/UpdateItem.vue";
import DeleteItem from "@/components/Menu/DeleteItem.vue";
import DeleteAllItem from "@/components/Menu/DeleteAllItem.vue";
import PageNotFound from "../views/PageNotFound.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sign-up',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: ProfileView
  },
  {
    path: '/UpdateProfile',
    name: 'UpdateProfile',
    component: UpdateProfile
  },
  {
    path: '/AddRestaurant',
    name: 'AddRestaurant',
    component: AddRestaurant
  },
  {
    path: '/delete-restaurant/:ResId',
    name: 'DeleteRes',
    component: DeleteRes
  },
  {
    path: '/delete-all',
    name: 'DeleteAll',
    component: DeleteAll
  },
  {
    path: '/UpdateRes/:ResId',
    name: 'UpdateRes',
    component: UpdateRes
  },
  {
    path: '/DetailsRes/:ResId',
    name: 'DetailsRes',
    component: DetailsRes
  },
  {
    path: '/Menu/:ResId',
    name: 'MenuComponent',
    component: MenuComponent
  },
  {
    path: '/Menu/AddCategories/:ResId',
    name: 'AddCategories',
    component: AddCategories
  },
  {
    path: '/Menu/UpdateCategory/:ResId/:catId',
    name: 'UpdateCategory',
    component: UpdateCategory
  },
  {
    path: '/Menu/DeleteCategory/:ResId/:catId',
    name: 'DeleteCategory',
    component: DeleteCategory
  },
  {
    path: '/Menu/DeleteAllCategories/:ResId',
    name: 'DeleteAllCategories',
    component: DeleteAllCategories
  },
  {
    path: '/Menu/item/AddNewItem/:ResId',
    name: 'AddNewItem',
    component: AddNewItem
  },
  {
    path: '/Menu/item/UpdateItem/:ResId/:itemId',
    name: 'UpdateItem',
    component: UpdateItem
  },
  {
    path: '/Menu/item/DeleteItem/:ResId/:itemId',
    name: 'DeleteItem',
    component: DeleteItem
  },
  {
    path: '/Menu/item/DeleteAllItem/:ResId',
    name: 'DeleteAllItem',
    component: DeleteAllItem
  },
  {
    path: '/:catchAll(.*)',
    name: 'PageNotFound',
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
