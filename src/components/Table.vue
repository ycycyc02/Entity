<template>
    <!-- 表格 -->
    <div style="width: 80%; float:left">
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
import { UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref, inject } from 'vue'
import axios from 'axios'

export default defineComponent({
  components: {
    UploadOutlined,
    EditOutlined,
    DeleteOutlined
  },
  setup () {
    // 表格
    const columns = ref([])
    const dataSource = ref([])

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

    // 弹出表单
    const { changeFormState, changeCurrent } = inject('key')
    const onEdit = record => {
      changeFormState(record)
    }

    return {
      columns,
      dataSource,
      onDelete,
      onEdit,
      realDelete,
      updateData
    }
  }

})
</script>
