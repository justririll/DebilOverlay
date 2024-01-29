import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: "/",
        name: "Main",
        props: true,
        component: () => import('./views/main.vue')
    },
    {
        path: "/overlay",
        name: "Overlay",
        props: true,
        component: () => import('./views/overlay.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router