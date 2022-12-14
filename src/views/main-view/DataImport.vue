<template>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0; height:44px">
        <div style="width: 600px; margin: 0 auto; padding-top: 20px;">
          <a-steps :current="current" size="small" >
            <a-step title="上传excel" />
            <a-step title="修改内容" />
            <a-step title="知识库查询" />
            <a-step title="确认" />
          </a-steps>
        </div>
      </a-layout-header>
      <a-layout-content>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '480px', maxHeight: '480px'}">
            <!-- upload -->
            <UploadData ref="childUpload"/>
            <!-- table -->
            <router-view/>
        </div>
        <!-- 上一步 下一步 -->
        <div class="space-align-block" :style="{background:'#fff', width:'100%',paddingBottom:'20px',}">
          <center>
            <a-space>
              <a-button danger @click="previousStep">上一步</a-button><span>&nbsp;</span>
            </a-space>
            <a-space>
              <a-button type="primary" ghost @click="nextStep">下一步</a-button>
            </a-space>
          </center>
        </div>
      </a-layout-content>
    </a-layout>
</template>
<script>
import { defineComponent, ref, provide } from 'vue';
import UploadData from './UploadData.vue'
import router from '@/router';

export default defineComponent({
  components: {
    UploadData,
  },
  setup() {
    // 表单
    const childUpload = ref();
    const childTable = ref();
    const current = ref(0);
    const dataSource1 =ref([]);
    const dataDetName = ref('');

    // 下一步
    const nextStep = () =>{
      if(current.value<3){
        current.value = current.value + 1
      }
      if(current.value == 1){
        dataSource1.value = childUpload.value.dataSource1;
        dataDetName.value = childUpload.value.inputValue;
        router.push({name:'table'})
      }
      if(current.value == 2){
        router.push({name:'search'})
      }
      if(current.value == 3){
        router.push({name:'datashow'})
      }
    }
    const previousStep = () =>{
      if(current.value > 0){
        current.value = current.value - 1
      }
      if(current.value == 0){
        router.push({name:'data'})
      }
      if(current.value == 1){
        dataSource1.value = childUpload.value.dataSource1;
        dataDetName.value = childUpload.value.inputValue;
        router.push({name:'table'})
      }
      if(current.value == 2){
        router.push({name:'search'})
      }
    }

    provide('dataSource1',dataSource1);
    provide('dataDetName',dataDetName);
    

    return {
      collapsed: ref(false),
      selectedKeys: ref(['1']),
      current,
      childUpload,
      childTable,
      nextStep,
      previousStep
    };
  }
});
</script>