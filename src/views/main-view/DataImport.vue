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
        <div style="width: 80%; margin: 0 auto;">
          <a-steps :current="current" size="small" >
            <a-step title="上传excel" />
            <a-step title="修改内容" />
            <a-step title="知识库查询" />
            <a-step title="划分数据集" />
            <a-step title="统计结果" />
          </a-steps>
        </div>
      </a-layout-header>
      <a-layout-content>
        <div :style="{background: '#fff', minHeight: '335px'}">
            <!-- upload -->
            <UploadData ref="childUpload" v-if="current === 0"/>
            <!-- table -->
            <router-view ref="childView"/>
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
        <div style="width:100%;background-color: #fff;">
          <a-row justify="center" :gutter="24" type="flex" style="width:100%">
            <a-col :span =2>
              <a-button danger @click="previousStep" :disabled="current === 0">上一步</a-button><span>&nbsp;</span>
            </a-col>
            <a-col :span =1></a-col>
            <a-col :span =2>
              <a-button type="primary" ghost @click="nextStep" html-type="submit">下一步</a-button>
            </a-col>
          </a-row>
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
import { useDatasetStore } from '@/stores/dataset'

export default defineComponent({
  components: {
    UploadData
  },
  setup () {
    const childUpload = ref()
    const childView = ref()
    const current = ref(0)
    const dataSource1 = ref([])
    const dataDetName = ref('')
    const knowledgeBaseName = ref('')
    const datasetDetails = ref(null)
    const dataset = useDatasetStore();

    const addNegativeSample =()=>{
      axios({
            method: 'post',
            url: 'http://172.20.137.106:33004/test/addNegativeSample',
            data: {
                datasetName: dataset.datasetName,
                negativeProportion: dataset.negativeProportion,
                knowledgeBaseName: dataset.knowledgeBaseName,
          }
        })
    }
    // 下一步
    const nextStep = () => {
      if (current.value < 4) {
        current.value = current.value + 1
      } else if (current.value === 4) {
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
        addNegativeSample();
        router.push({ name: 'setparams' })
      }
      if (current.value === 4) {
        router.push({ name: 'chart' })
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
      if (current.value === 3) {
        router.push({ name: 'setparams' })
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
      childView,
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
