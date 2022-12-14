/* eslint-disable no-var */
import { createRouter, createWebHashHistory } from "vue-router";

import HomePage from "../views/HomePage.vue";
import DataImport from "../views/main-view/DataImport.vue";
import TableShow from "../views/main-view/TableShow.vue";
import SearchEntity from "../views/main-view/SearchEntity.vue";
import DataShow from "../views/main-view/DataShow.vue";
import SearchDataset from "../views/main-view/SearchDataset.vue";


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: HomePage,
      redirect: "/data",
    },
    {
      path: "/data",
      name: "data",
      component: DataImport,
      children:[
        {
          path: "/data/table",
          name: "table",
          component: TableShow,
        },
        {
          path: "/data/search",
          name: "search",
          component: SearchEntity,
        },
        {
          path: "/data/show",
          name: "datashow",
          component: DataShow,
        },
      ]
    },
    {
      path: "/manage",
      name: "manage",
      component: SearchDataset,
    },
  ],
});

// router.beforeEach((to,from,next)=>{
//     console.log(to);
//     console.log(from);
//     next()
//   })

export default router;
