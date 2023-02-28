<template>
      <a-layout-header style="background: #fff; margin-top:1px; padding-left: 24px ">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>数据导入</a-breadcrumb-item>
          <a-breadcrumb-item>数据集管理</a-breadcrumb-item>
        </a-breadcrumb>
      </a-layout-header>
      <a-layout-content :style="{margin: '16px 16px', padding: '24px', background: '#fff', minHeight: '400px' }">
        <!-- 表格 -->
        <DataShow v-show="showDetail" ref='childCharts'/>
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
              <a @click="onDetail(record.dataset_name)"><edit-outlined />&nbsp;&nbsp;</a>
              <a-popconfirm
                  v-if="dataSource.length"
                  title="Sure to delete?"
                  @confirm="onDelete(record.dataset_name)"
              >
                  <a><delete-outlined /></a>
              </a-popconfirm>
            </template>
        </template>
        </a-table>
      </a-layout-content>
</template>
<script setup>
import { ref ,provide, inject} from 'vue';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue'
import axios from 'axios'
import DataShow from './DataShow.vue'

const columns = [
  {
    title: '数据集名称',
    dataIndex: 'dataset_name',
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

const handleResizeColumn = (w, col) => {
  col.width = w
}
axios({
  method: 'get',
  url: 'http://172.20.137.106:33004/test/getDataset'
}).then(value => {
  loading.value = false
  dataSource.value = value.data.data
})

const onDelete = (dataset_name) => {
  axios({
    method: 'post',
    url: 'http://172.20.137.106:33004/test/deleteDataset',
    data: {
      dataset_name
    }
  })
  dataSource.value = dataSource.value.filter(item => item.dataset_name !== dataset_name)
}

const childCharts = ref(null)
const showDetail = ref(false)
const onDetail = (dataset_name) => {
  axios({
    method: 'post',
    url: 'http://172.20.137.106:33004/test/getDatasetDetails',
    data: {
      datasetName: dataset_name
    }
  }).then(res => {
    if (res.data.error_code === 200) {
      showDetail.value = true
      // console.log(res.data)
      // console.log(childCharts.value)
      childCharts.value.getDatasetDetails(dataset_name)
    }
  })
}

const changePage = ()=>{
  showDetail.value = !showDetail.value
}
provide('changePage',changePage);

</script>
<style scoped>
  .ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
  }
</style>
