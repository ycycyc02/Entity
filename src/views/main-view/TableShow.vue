<template>
  <!-- 表单 -->
  <FormModal ref="childForm"/>
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
  import { EditOutlined , DeleteOutlined} from '@ant-design/icons-vue';
  import { defineComponent, ref, inject, provide } from 'vue';
  import axios from 'axios';
  import FormModal from './FormModal.vue';

  export default defineComponent({
    components: {
      EditOutlined,
      DeleteOutlined,
      FormModal,
    },
    setup() {
      //表格  
      let columns = ref([
        {
          title: '序号',
          dataIndex: 'self_defining_id',
          key: 'self_defining_id',
        },
        {
          title: '段编号',
          dataIndex: 'segment_id',
        },
        {
          title: '文本',
          dataIndex: 'text',
          ellipsis: true,
        },
        {
          title: '实体',
          dataIndex: 'entity',
        },
        {
          title: '知识库实体',
          dataIndex: 'entity_kb',
        },
        {
          title: '描述信息',
          dataIndex: 'data',
          ellipsis: true,
        },{
          title: 'operation',
          dataIndex: 'operation',
        }
      ]);
      let dataSource = ref([]);
      let dataDetName =ref('');
      dataSource = inject('dataSource1')
      dataDetName = inject('dataDetName')
      
      // 数据库中删除
      const realDelete = self_defining_id =>{
        axios({
          method: 'post',
          url: 'http://172.20.137.106:33004/test/deleteSingleTrainingData',
          data:{
            auto_increment_id: self_defining_id
          } 
        })
        onDelete(self_defining_id);
      }
      // 前端删除
      const onDelete = self_defining_id => {
        dataSource.value = dataSource.value.filter(item => item.self_defining_id !== self_defining_id);
      };
      // 更新自增id
      const updateData = (FormState , OldId) => {
        Object.assign(dataSource.value.filter(item => OldId === item.self_defining_id)[0], FormState);
      }

      
      // 表单
      const childForm = ref();
      // 弹出表单
      const onEdit = record => {
        childForm.value.initForm(record);
        childForm.value.showModal();
      };

      provide('dataDetName',{
        updateData,
        dataDetName
      })

      return {
        columns,
        dataSource,
        onDelete,
        onEdit,
        realDelete,
        updateData,
        childForm,
        dataDetName
      };
    },
    
  });
  </script>
  <style>

  </style>
  