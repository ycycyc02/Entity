<template>
  <!-- 上传 -->
  <div style="width: 20%; float:left">
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
      <template #bodyCell="{ column, text, record }">
        <template v-if="['data', 'text', 'self_defining_id','entity','entity_kb','segment_id'].includes(column.dataIndex)">
          <div>
            <a-input
              v-if="editableData[record.self_defining_id]"
              v-model:value="editableData[record.self_defining_id][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span v-if="editableData[self_defining_id]">
              <a-typography-link @click="save(record.self_defining_id)">Save</a-typography-link>
              <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.self_defining_id)">
                <a>Cancel</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.self_defining_id)">Edit</a>
            </span>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script>
  import { message } from 'ant-design-vue';
  import { cloneDeep } from 'lodash-es';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { defineComponent, ref ,reactive, } from 'vue';

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
      const editableData = reactive({});
      const edit = key => {
      editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
      };
      const save = key => {
        Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
        delete editableData[key];
      };
      const cancel = key => {
        delete editableData[key];
      };

      //上传
      const handleChange = info => {
        if (info.file.status !== 'uploading') {
          console.log(info);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          dataSource.value = info.file.response.data
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
        editingKey: '',
        editableData,
        edit,
        save,
        cancel,
      };
    },
    
  });
  </script>
  <style>

  </style>
  