/* eslint-disable no-var */
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomePage.vue"),
      redirect: "/data",
    },
    {
      path: "/data",
      name: "data",
      component: ()=>import("../views/main-view/DataImport.vue"),
      children:[
        {
          path: "/table",
          name: "table",
          component: () => import("../views/main-view/TableShow.vue"),
        },
        {
          path: "/search",
          name: "search",
          component: () => import("../views/main-view/SearchEntity.vue"),
        },
      ]
    },

  ],
});

// router.beforeEach((to,from,next)=>{
//     console.log(to);
//     console.log(from);
//     next()
//   })

export default router;
