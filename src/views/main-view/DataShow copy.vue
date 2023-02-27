<template>
  <!-- 表格 -->
  <div style="width: 100%; padding-left:10%;padding-right:10%;">
    <a-table
      class="ant-table-striped"
      :columns="columns"
      :data-source="dataSource"
      :pagination="{ pageSize: 5}"
      show-less-items
      @resizeColumn="handleResizeColumn"
      :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
      :loading="'loading'"
    >
    </a-table>
  </div>
</template>
<script>
import { defineComponent, ref, inject, provide } from 'vue'
import axios from 'axios'

export default defineComponent({
  components: {
  },
  setup () {
    // 表格
    const columns = ref([
      {
        title: '序号',
        dataIndex: '_id',
        key: '_id',
        resizable: true,
        width: '80px'
      },
      {
        title: '段编号',
        dataIndex: 'segment_id',
        resizable: true,
        width: '80px'
      },
      {
        title: '偏移',
        dataIndex: 'offset',
        resizable: true,
        width: '60px'
      },
      {
        title: '实体',
        dataIndex: 'entity',
        resizable: true,
        width: '160px'
      },
      {
        title: '实体编号',
        dataIndex: 'subject_id',
        resizable: true,
        width: '90px'
      },
      {
        title: '文本',
        dataIndex: 'text',
        ellipsis: true,
        resizable: true
      }
    ])
    const dataSource = ref([])
    const dataDetName = ref('')
    const loading = ref(true)
    dataDetName.value = inject('dataDetName')

    axios({
      method: 'post',
      url: 'http://172.20.137.106:33004/test/getTrainingSet',
      data: {
        trainingSetName: dataDetName.value
      }
    }).then(res => {
      dataSource.value = res.data.data
      let i = 1
      dataSource.value.forEach(data => {
        data._id = i
        i++
      })
      console.log(dataSource.value)
      loading.value = false
    })

    return {
      columns,
      dataSource,
      loading
    }
  }

})
</script>
<style>

</style>
