import { createWebHistory, createRouter } from "vue-router";
import Login from "@/components/login.vue"
import Register from "@/components/register.vue"

const routes = [
    {
        name: "login",
        component: Login,
        path: "/login"
    },
    {
        name: "register",
        component: Register,
        path: "/register"
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;