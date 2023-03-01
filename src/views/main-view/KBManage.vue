<template>
      <a-layout-header style="background: #fff; margin-top:1px; padding-left: 24px ">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>数据导入</a-breadcrumb-item>
          <a-breadcrumb-item>知识库管理</a-breadcrumb-item>
        </a-breadcrumb>
      </a-layout-header>
      <a-layout-content :style="{margin: '16px 16px', padding: '24px', background: '#fff', minHeight: '400px' }">
        <!-- 表格 -->
        <div v-if="showDetail">
          <div style="width:100% ;float:center;">
            <a-card
              :title="'当前知识库：'+currentKbName + '&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;实体数量：'+num_entity"
              :bordered="false"
              :size ='small'
            >
              <v-chart class="chart" :option="option1" style="width:50%;height:280px;float:left;" autoresize />
              <v-chart class="chart" :option="option2" style="width:50%;height:280px;float:left;" autoresize />
              <template #extra>
                <button 
                  @click="showDetail = !showDetail"
                  style="border:none;background-color:transparent;"
                ><close-outlined /></button>
              </template>
            </a-card>
          </div>
        </div>
        <a-table
          v-if="!showDetail"
          class="ant-table-striped"
          :columns="columns"
          :data-source="dataSource"
          :pagination="{ pageSize: 5}"
          show-less-items
          :loading="loading"
          @resizeColumn="handleResizeColumn"
          :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
        >
        <template #bodyCell="{ record , column }">
            <template v-if="column.dataIndex === 'operation'">
              <a @click="onDetail(record.kbName)"><edit-outlined />&nbsp;&nbsp;</a>
              <a-popconfirm
                  v-if="dataSource.length"
                  title="Sure to delete?"
                  @confirm="onDelete(record.kbName)"
              >
                  <a><delete-outlined /></a>
              </a-popconfirm>
            </template>
        </template>
        </a-table>
      </a-layout-content>
</template>
<script setup>
import { ref ,reactive, inject} from 'vue';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue'
import axios from 'axios'
import VChart from 'vue-echarts'
import * as echarts from 'echarts';
import {CloseOutlined} from '@ant-design/icons-vue';

// 图
const option1 = reactive({
  title: {
    text: '相似实体数量统计',
    left: 'center'
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }

  },
  grid: {
    left: '2%',
    right: '2%',
    bottom: '2%',
    containLabel: true
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '8%',
    left: 'center'
  },
  series: [
    {
      // name: 'Access From',
      type: 'pie',
      radius: ['30%', '65%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false
      },
      data: [
        { value: 1048, name: '1-2' },
        { value: 735, name: '3-4' },
        { value: 580, name: '5+' }
      ]
    }
  ]
})
const option2 = reactive({
  title: {
    text: '实体描述属性数量统计',
    left: 'center'
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }

  },
  grid: {
    left: '2%',
    right: '2%',
    bottom: '2%',
    containLabel: true
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '8%',
    left: 'center'
  },
  series: [
    {
      // name: 'Access From',
      type: 'pie',
      radius: ['30%', '65%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false
      },
      data: [
        { value: 1048, name: '1-2' },
        { value: 735, name: '3-4' },
        { value: 580, name: '5+' }
      ]
    }
  ]
})
const changeOptionData = (number, data) => {
  if (number === 1) {
    for(var i=0;i<option1.series[0].data.length;i++){
      option1.series[0].data[i].value = data[i]
    }
  } else if (number === 2) {
    for(var i=0;i<option2.series[0].data.length;i++){
      option2.series[0].data[i].value = data[i]
    }
    // option2.series[1].data = data2
  }
}

// 表格
const columns = [
  {
    title: '知识库名称',
    dataIndex: 'kbName',
    resizable: true
  },
  // {
  //   title: '数据集大小',
  //   dataIndex: 'size',
  //   ellipsis: true,
  // },
  {
    title: '操作',
    dataIndex: 'operation',
    resizable: true,
    width: '70px'
  }
]
const dataSource = ref([])
const loading = ref(true)
const currentKbName = ref('')

const handleResizeColumn = (w, col) => {
  col.width = w
}
axios({
  method: 'get',
  url: 'http://172.20.137.106:33004/test/getAllKnowledgeBases'
}).then(value => {
  loading.value = false
  value.data.data.name_list.forEach(item=>{
    dataSource.value.push({'kbName':item[0]}) 
  })
})
const num_entity = ref(0)
const num_entity_attribute_statistic =ref([])
const similar_entity_statistic =ref([])
const showDetail = ref(false)
const onDetail = (kbName) => {
  currentKbName.value = kbName
  axios({
    method: 'post',
    url: 'http://172.20.137.106:33004/test/getKnowledgeBaseDetails',
    data: {
      knowledgeBaseName : kbName
    }
  }).then(res=>{
    if(res.data.error_code ===200){
      num_entity.value = res.data.data.num_entity
      res.data.data.num_entity_attribute_statistic.map(item=>{
        num_entity_attribute_statistic.value = [item['1-2'],item['3-4'],item['5+']]
        changeOptionData(2,[item['1-2'],item['3-4'],item['5+']])
      })
      res.data.data.similar_entity_statistic.map(item=>{
        similar_entity_statistic.value = [item['1-2'],item['3-4'],item['5+']]
        changeOptionData(1,[item['1-2'],item['3-4'],item['5+']])
      })
    }
  })
  showDetail.value =true
}
const onDelete = (kbName) => {
  // axios({
  //   method: 'post',
  //   url: 'http://172.20.137.106:33004/test/deleteDataset',
  //   data: {
  //     knowledgeBaseName : kbName
  //   }
  // })
  dataSource.value = dataSource.value.filter(item => item.dataset_name !== dataset_name)
}


</script>
<style scoped>
  .ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
  }
  .a-statistic{
    
  }
</style>
