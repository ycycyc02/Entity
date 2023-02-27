<template>
  <a-layout-header style="background: #fff; margin-top:1px; padding-left: 24px ">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>数据导入</a-breadcrumb-item>
      <a-breadcrumb-item>数据集上传</a-breadcrumb-item>
    </a-breadcrumb>
  </a-layout-header>
  <a-layout-content
    :style="{ margin: '16px 16px', padding: '24px', background: '#fff', minHeight: '335px' }"
  >
    <a-layout>
      <a-layout-header style="background: #fff; height:48px;padding-bottom: 20px;">
        <div style="width: 600px; margin: 0 auto;">
          <a-steps :current="current" size="small" >
            <a-step title="上传excel" />
            <a-step title="修改内容" />
            <a-step title="知识库查询" />
            <a-step title="确认" />
          </a-steps>
        </div>
      </a-layout-header>
      <a-layout-content>
        <div :style="{background: '#fff', minHeight: '335px'}">
            <!-- upload -->
            <UploadData ref="childUpload" v-if="current === 0"/>
            <!-- table -->
            <router-view/>
            <!-- 表单 -->
            <a-modal v-model:visible="visible" width="40%" title="数据集">
              <p>确认提交数据集{{dataDetName}}？</p>
              <template #footer>
                <a-button key="back" @click="cancelOk">取消</a-button>
                <a-button key="submit" type="primary" @click="handleOk">提交</a-button>
              </template>
            </a-modal>
        </div>
        <!-- 上一步 下一步 -->
        <div class="space-align-block" :style="{background:'#fff', width:'100%',paddingBottom:'0px',}">
          <center>
            <a-space>
              <a-button danger @click="previousStep" :disabled="current === 0">上一步</a-button><span>&nbsp;</span>
            </a-space>
            <a-space>
              <a-button type="primary" ghost @click="nextStep">下一步</a-button>
            </a-space>
          </center>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout-content>
</template>
<script>
import { defineComponent, ref, provide } from 'vue'
import UploadData from './UploadData.vue'
import router from '@/router'
import axios from 'axios'

export default defineComponent({
  components: {
    UploadData
  },
  setup () {
    const childUpload = ref()
    const childTable = ref()
    const current = ref(0)
    const dataSource1 = ref([])
    const dataDetName = ref('')
    const knowledgeBaseName = ref('')
    const datasetDetails = ref(null)

    const getDatasetDetails = ()=>{
      axios({
        method: 'post',
        url: 'http://172.20.137.106:33004/test/getDatasetDetails',
        data: {
          datasetName : dataDetName.value
        }
      }).then(res => {
        if(res.data.error_code === 200){
          datasetDetails.value = res.data.data
        }
      })
    }
    // 下一步
    const nextStep = () => {
      if (current.value < 3) {
        current.value = current.value + 1
      } else if (current.value === 3) {
        showModal()
      }
      if (current.value === 1) {
        dataSource1.value = childUpload.value.dataSource1
        dataDetName.value = childUpload.value.dataDetName
        knowledgeBaseName.value = childUpload.value.inputValue
        router.push({ name: 'table' })
      }
      if (current.value === 2) {
        router.push({ name: 'search' })
      }
      if (current.value === 3) {
        getDatasetDetails()
        router.push({ name: 'datashow' })
      }
    }
    const previousStep = () => {
      if (current.value > 0) {
        current.value = current.value - 1
      }
      if (current.value === 0) {
        router.push({ name: 'data' })
      }
      if (current.value === 1) {
        router.push({ name: 'table' })
        // dataSource1.value = childUpload.value.dataSource1;
        // dataDetName.value = childUpload.value.formState.dataDetName;
        // knowledgeBaseName.value = childUpload.value.formState.inputValue;
      }
      if (current.value === 2) {
        router.push({ name: 'search' })
      }
    }
    const changeCurrent = (number)=>{
      current.value = number
    }
    // 表格
    provide('dataSource1', dataSource1)
    provide('dataDetName', dataDetName)
    provide('changeCurrent',changeCurrent)
    provide('knowledgeBaseName', knowledgeBaseName)
    provide('datasetDetails',datasetDetails)

    // 表单
    const visible = ref(false)
    const showModal = () => {
      visible.value = true
    }
    const handleOk = e => {
      console.log(e)
      visible.value = false
    }
    const cancelOk = e => {
      console.log(e)
      visible.value = false
    }

    return {
      collapsed: ref(false),
      selectedKeys: ref(['1']),
      current,
      childUpload,
      childTable,
      dataDetName,
      visible,
      showModal,
      handleOk,
      cancelOk,
      nextStep,
      previousStep
    }
  }
})
</script>
