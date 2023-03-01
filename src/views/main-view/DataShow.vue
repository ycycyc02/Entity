<template>
  <!-- 表格 -->
  <div style="width: 100%;">
    <a-table
      class="ant-table-striped"
      :columns="columns"
      :data-source="dataSource"
      :pagination="{ pageSize: 5}"
      show-less-items
      @resizeColumn="handleResizeColumn"
      :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
      :loading="loading"
    >
    </a-table>
  </div>
</template>
<script setup>
import { defineComponent, ref ,watch } from 'vue'
import axios from 'axios'
import { useDatasetStore } from '@/stores/dataset'
import { defineExpose } from 'vue';


// 表格
const columns = ref([
  {
    title: '序号',
    dataIndex: '_id',
    key: '_id',
    resizable: true,
    width: '80px',
    sorter: {
      compare: (a, b) => a._id - b._id,
      multiple: 4,
    },
  },
  {
    title: '段编号',
    dataIndex: 'segment_id',
    resizable: true,
    width: '90px',
    sorter: {
      compare: (a, b) => a.segment_id - b.segment_id,
      multiple: 4,
    },
  },
  {
    title: '偏移',
    dataIndex: 'offset',
    resizable: true,
    width: '80px',
    sorter: {
      compare: (a, b) => a.offset - b.offset,
      multiple: 4,
    },
  },
  {
    title: '实体',
    dataIndex: 'entity',
    resizable: true,
    width: '160px',
  },
  {
    title: '实体编号',
    dataIndex: 'subject_id',
    resizable: true,
    width: '110px',
    sorter: {
      compare: (a, b) => a.subject_id - b.subject_id,
      multiple: 4,
    },
  },
  {
    title: '文本',
    dataIndex: 'text',
    ellipsis: true,
    resizable: true,
  },
  {
    title: 'pos_label',
    dataIndex: 'pos_label',
    ellipsis: true,
    resizable: true,
    width:'100px'
  },
])
const dataSource = ref([])
const loading = ref(true)
const dataset = useDatasetStore()

const getDataSource =(dataset_name)=>{
  axios({
    method: 'post',
    url: 'http://172.20.137.106:33004/test/getTrainingSet',
    data: {
      trainingSetName: dataset_name
    }
  }).then(res => {
    dataSource.value = res.data.data
    let i = 1
    dataSource.value.forEach(data => {
      data._id = i
      data.pos_label = String(data.pos_label)
      i++
    })
    console.log(dataSource.value)
    loading.value = false
  })
}
getDataSource(dataset.datasetName)

watch(()=> dataset.datasetName,(newValue,oldValue)=>{
  console.log('yes');
  getDataSource(dataset.datasetName)
})

defineExpose({
  getDataSource
})
</script>
<style>

</style>
