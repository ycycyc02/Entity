/* eslint-disable no-var */
import { createRouter, createWebHashHistory } from "vue-router";

import HomePage from "../views/HomePage.vue";
import DataImport from "../views/main-view/DataImport.vue";
import TableShow from "../views/main-view/TableShow.vue";
import SearchEntity from "../views/main-view/SearchEntity.vue";
import DataShow from "../views/main-view/DataShow.vue";
import SearchDataset from "../views/main-view/SearchDataset.vue";
import SelectDataset from "../views/entity-view/SelectDataset.vue";
import DatasetPartition from "../views/entity-view/DatasetPartition.vue";
const SelectKnowledgeBase =()=>import("../views/entity-view/SelectKnowledgeBase.vue");
const SetModel =()=>import("../views/entity-view/SetModel.vue");
const ShowResult = ()=>import("../views/entity-view/ShowResult.vue");
const ConfirmParams = () => import("../views/entity-view/ConfirmParams.vue");
const StartLinking = () => import("../views/linking-view/StartLinking.vue");
const UseModel = () => import("../views/linking-view/UseModel.vue");
const SelectModel = () => import("../views/linking-view/SelectModel.vue");
const ActiveLearning = ()=> import("../views/study-view/ActiveLearning.vue");
const GetData = ()=> import("../views/study-view/GetData.vue");


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
    {
      path: "/entity",
      name: "entity",
      component: SelectDataset,
      redirect: "/entity/dataset",
      children:[
        {
          path: "dataset",
          name: "dataset",
          component: DatasetPartition,
        },
        {
          path: "selectkb",
          name: "selectkb",
          component: SelectKnowledgeBase,
        },
        {
          path: "setmodel",
          name: "setmodel",
          component: SetModel,
        },
        {
          path: "confirm",
          name: "confirm",
          component: ConfirmParams,
        },
      ]
    },
    {
      path: "/result",
      name: "result",
      component: ShowResult,
    },
    {
      path: "/linking",
      name: "linking",
      component: StartLinking,
      redirect: "/linking/model",
      children:[
        {
          path: "start",
          name: "start",
          component: UseModel
        },
        {
          path: "model",
          name: "model",
          component: SelectModel
        }
      ]
    },
    {
      path:"/study",
      name:"study",
      component:ActiveLearning
    },
    {
      path:'/getdata',
      name:'getdata',
      component:GetData
    }
  ],
});

// router.beforeEach((to,from,next)=>{
//     console.log(to);
//     console.log(from);
//     next()
//   })

export default router;
