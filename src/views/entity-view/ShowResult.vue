<template>
  <a-layout-header style="background: #fff; margin-top:1px; padding-left: 24px ">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>结果展示</a-breadcrumb-item>
    </a-breadcrumb>
  </a-layout-header>
  <a-layout-content
    :style="{ margin: '16px 16px', padding: '24px', background: '#fff', minHeight: '335px' }"
  >
      <a-layout-header style="background: #fff; padding-bottom:20px; height:68px">
        <h2 style="line-height: 48px;">数据展示</h2>
      </a-layout-header>
        <!-- 表格 -->
            <a-table
            :columns="columns"
            :data-source="dataSource"
            bordered
            :pagination="{ pageSize: 5}"
            show-less-items
            >
            <template #bodyCell="{ record , column }">
                <template v-if="column.dataIndex === 'operation'">
                    <a @click="onEdit(record)"><edit-outlined />&nbsp;&nbsp;</a>
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
<script>
import { defineComponent, ref, inject } from 'vue'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue'
import axios from 'axios'

export default defineComponent({
  components: {
    DeleteOutlined,
    EditOutlined
  },
  setup () {
    const columns = [
      {
        title: '序号',
        dataIndex: '_id',
        ellipsis: true
      },
      {
        title: 'accuracy',
        dataIndex: 'accuracy',
        ellipsis: true
      },
      {
        title: 'F1-score',
        dataIndex: 'score',
        ellipsis: true
      },
      {
        title: 'operation',
        dataIndex: 'operation'
      }
    ]
    const dataSource = ref([
      {
        _id: 1,
        accuracy: '',
        score: ''
      }
    ])

    const changeKeys = inject('changeKeys')
    changeKeys(['6'])
    // axios({
    //   method: 'get',
    //   url: 'http://172.20.137.106:33004/test/getDataset',
    //   data:{}
    // }).then(value=>{
    //   dataSource.value=value.data.data;
    // })

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

    return {
      columns,
      dataSource,
      onDelete
    }
  }
})
</script>
