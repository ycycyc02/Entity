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
            <a-row justify="center" align="middle">
            <a-col :span="8">
              <a-statistic title="实体数量" :value="num_entity" />
            </a-col>
            <a-col :span="8">
              <a-statistic title="相似实体数量统计" :value="similar_entity_statistic"/>
            </a-col>
            <a-col :span="8">
              <a-statistic title="实体描述属性数量统计" :value="num_entity_attribute_statistic"/>
            </a-col>
            </a-row>
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
import { ref ,provide, inject} from 'vue';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue'
import axios from 'axios'

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
const num_entity_attribute_statistic =ref({})
const similar_entity_statistic =ref([])
const showDetail = ref(false)
const onDetail = (kbName) => {
  axios({
    method: 'post',
    url: 'http://172.20.137.106:33004/test/getKnowledgeBaseDetails',
    data: {
      knowledgeBaseName : kbName
    }
  }).then(res=>{
    if(res.data.error_code ===200){
      num_entity.value = res.data.data.num_entity
      num_entity_attribute_statistic.value = res.data.data.num_entity_attribute_statistic[0]
      res.data.data.num_entity_attribute_statistic[0].forEach(item=>{
        console.log(item.key);
      })
      console.log(res.data.data.num_entity_attribute_statistic[0]);
      similar_entity_statistic.value = res.data.data.similar_entity_statistic
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
</style>
