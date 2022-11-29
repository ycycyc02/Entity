<template>
  <!-- 上传 -->
  <div style="width: 20%; float:left; padding-right: 20px">
    <a-upload
      v-model:file-list="fileList"
      name="trainingset"
      action="http://172.20.137.106:33004/test/getTable"
      :headers="headers"
      @change="handleChange"
    >
        导入excel:
      <a-button>
        <upload-outlined></upload-outlined>
        导入数据
      </a-button>
    </a-upload>
  </div>
  <!-- 表格 -->
  <div style="width: 80%; float:left" height="500px">
    <a-table 
      :columns="columns" 
      :data-source="dataSource" 
      bordered 
      :pagination="{ pageSize: 6 }"
    >
      <template #bodyCell="{ record , column }">
        <template v-if="column.dataIndex === 'operation'">
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="onDelete(record.self_defining_id)"
          >
            <a>Delete</a>
          </a-popconfirm>
          <a @click="onEdit(record)"> Edit</a>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script>
  import { message } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { defineComponent, ref, inject } from 'vue';

  export default defineComponent({
    components: {
      UploadOutlined,
    },
    setup() {
      //表格  
      const columns = [
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
          title: '实体',
          dataIndex: 'entity',
        },
        {
          title: '知识库实体',
          dataIndex: 'entity_kb',
        },
        {
          title: '文本',
          dataIndex: 'text',
          ellipsis: true,
        },
        {
          title: '数据',
          dataIndex: 'data',
          ellipsis: true,
        },{
          title: 'operation',
          dataIndex: 'operation',
        }
      ];
      let dataSource = ref([]);
      
      const onDelete = self_defining_id => {
        dataSource.value = dataSource.value.filter(item => item.self_defining_id !== self_defining_id);
      };
      
      // 弹出表单
      const { changeFormState ,changeCurrent } = inject('key')
      const onEdit = record => {
        changeFormState(record);
        onDelete(record.self_defining_id);
      };

      //上传
      const handleChange = info => {
        if (info.file.status !== 'uploading') {
          console.log(info);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          dataSource.value = info.file.response.data
          changeCurrent(1);

        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      };
      const fileList = ref([]);

      return {
        fileList,
        headers: {
          authorization: 'authorization-text',
        },
        handleChange,
        columns,
        dataSource,
        onDelete,
        onEdit,
      };
    },
    
  });
  </script>
  <style>

  </style>
  