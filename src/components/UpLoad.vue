<template>
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
  </template>
  <script>
  import { message } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    components: {
      UploadOutlined,
    },
    setup() {
      const handleChange = info => {
        if (info.file.status !== 'uploading') {
          console.log(info);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          console.log(info.file.response.data)
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
      };
    },
  });
  </script>
  