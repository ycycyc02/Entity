<template>
    <a-layout style="background: #fff">
      <a-layout-header style="background: #fff; padding: 0; height:44px">
        <div style="width: 600px; margin: 0 auto; padding-top: 20px;">
          <a-steps :current="current" size="small" >
            <a-step title="数据集配置" />
            <a-step title="知识库选择" />
            <a-step title="模型配置" />
            <a-step title="确认参数" />
          </a-steps>
        </div>
      </a-layout-header>
      <a-layout-content>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '500px'}">
            <!-- table -->
            <router-view />
        </div>
        <!-- 上一步 下一步
        <div class="space-align-block" :style="{background:'#fff', width:'100%',paddingBottom:'20px',}">
          <center>
            <a-space>
              <a-button danger @click="previousStep">上一步</a-button><span>&nbsp;</span>
            </a-space>
            <a-space>
              <a-button type="primary" ghost @click="nextStep">下一步</a-button>
            </a-space>
          </center>
        </div> -->
      </a-layout-content>
    </a-layout>
</template>
<script>
import { defineComponent, ref, provide,reactive } from 'vue';
import router from '@/router';

export default defineComponent({
  components: {
  },
  setup() {

    const current = ref(0);
    const auto_increment_id = ref(null);
    const trainingRecordName = ref(null);
    const formState = reactive({});
    // router.push({name:'dataset'});


    // 下一步
    const nextStep = () =>{
      if(current.value<5){
        current.value = current.value + 1
      }
      if(current.value == 1){
       
        router.push({name:'dataset'})
      }
      if(current.value == 2){
        router.push({})
      }
      if(current.value == 3){
        router.push({})
      }
    }
    const previousStep = () =>{
      if(current.value > 0){
        current.value = current.value - 1
      }
      if(current.value == 0){
        router.push()
      }
      if(current.value == 1){
        router.push()
      }
      if(current.value == 2){
        router.push()
      }
    }
    provide('current',current);

    // auto_increment_id
    const setId = (id)=>{
      auto_increment_id.value = id;
    }
    provide('setId',setId);
    provide('auto_increment_id',auto_increment_id);
    provide('trainingRecordName',trainingRecordName);
    provide('formState',formState);
    

    return {
      current,
      nextStep,
      previousStep
    };
  }
});
</script>