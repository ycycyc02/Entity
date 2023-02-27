<template>
  <!-- 表单 -->
  <FormModal ref="childForm"/>
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
    >
      <template #bodyCell="{ record , column }">
        <template v-if="column.dataIndex === 'operation'">
          <a @click="onEdit(record)"><edit-outlined />&nbsp;&nbsp;</a>
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="realDelete(record.self_defining_id)"
          >
            <a><delete-outlined /></a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script>
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref, inject, provide } from 'vue'
import axios from 'axios'
import FormModal from './FormModal.vue'

export default defineComponent({
  components: {
    EditOutlined,
    DeleteOutlined,
    FormModal
  },
  setup () {
    // 表格
    const columns = ref([
      {
        title: '序号',
        dataIndex: 'self_defining_id',
        key: 'self_defining_id',
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
        width: '100px'
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
      }, 
      {
        title: '描述信息',
        dataIndex: 'data',
        width: '90px',
        ellipsis: true,
        resizable: true
      }, 
      {
        title: '操作',
        dataIndex: 'operation',
        resizable: true,
        width: '70px'
      }
    ])
    const dataSource = ref([])
    const dataDetName = ref('')
    const knowledgeBaseName = ref('')
    dataSource.value = inject('dataSource1').value
    dataDetName.value = inject('dataDetName')
    const changeCurrent =inject('changeCurrent')
    knowledgeBaseName.value = inject('knowledgeBaseName')

    changeCurrent(1)
    // 数据库中删除
    const realDelete = self_defining_id => {
      axios({
        method: 'post',
        url: 'http://172.20.137.106:33004/test/deleteSingleTrainingData',
        data: {
          auto_increment_id: self_defining_id
        }
      })
      onDelete(self_defining_id)
    }
    // 前端删除
    const onDelete = self_defining_id => {
      dataSource.value = dataSource.value.filter(item => item.self_defining_id !== self_defining_id)
    }
    // 更新自增id
    const updateData = (FormState, OldId) => {
      Object.assign(dataSource.value.filter(item => OldId === item.self_defining_id)[0], FormState)
    }

    // 表单
    const childForm = ref()
    // 弹出表单
    const onEdit = record => {
      childForm.value.initForm(record)
      childForm.value.showModal()
    }

    provide('dataDetName', {
      updateData,
      dataDetName,
      knowledgeBaseName
    })

    return {
      columns,
      dataSource,
      onDelete,
      onEdit,
      realDelete,
      updateData,
      childForm,
      dataDetName,
      handleResizeColumn: (w, col) => {
        col.width = w
      }
    }
  }

})
</script>
  <style scoped>
  .ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
  }
  </style>
