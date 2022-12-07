<template>
    <!-- 上传 -->
    <div style="width: 20%; float:left; padding-right: 20px">
      数据集名称:
      <p/>
      <a-input v-model:value="inputValue" placeholder="数据集名称"/>
      <p/>
      <a-upload :file-list="fileList" :before-upload="beforeUpload" @remove="handleRemove">
        <a-button>
          <upload-outlined></upload-outlined>
          导入数据
        </a-button>
      </a-upload>
      <p/>
      <a-button
        type="primary"
        :disabled="fileList.length === 0"
        :loading="uploading"
        
        @click="handleUpload"
      >
        {{ uploading ? 'Uploading' : 'Start Upload' }}
      </a-button>
      <!-- <a-upload
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
      </a-upload> -->
    </div>
</template>
<script>
  import axios from 'axios';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    components: {
      UploadOutlined,
    },

    setup() {
    const inputValue = ref('test')
    const fileList = ref([]);
    const uploading = ref(false);
    const dataSource1 = ref([]);

    const handleRemove = file => {
      const index = fileList.value.indexOf(file);
      const newFileList = fileList.value.slice();
      newFileList.splice(index, 1);
      fileList.value = newFileList;
    };
    const beforeUpload = file => {
      fileList.value = [...fileList.value, file];
      return false;
    };
    const handleUpload = () => {
      const formData = new FormData();
      fileList.value.forEach(file => {
        formData.append('trainingset', file);
        formData.append('dataDetName', inputValue.value);
      });
      uploading.value = true;

      // You can use any AJAX library you like
      axios('http://172.20.137.106:33004/test/getTable', {
        method: 'post',
        data: formData,
      }).then((res) => {
        fileList.value = [];
        uploading.value = false;
        inputValue.value = 'test';
        message.success('upload successfully.');
        dataSource1.value = res.data.data;
        // console.log(dataSource1.value);
      }).catch(() => {
        uploading.value = false;
        message.error('upload failed.');
      });
    };
    return {
      fileList,
      uploading,
      handleRemove,
      beforeUpload,
      handleUpload,
      inputValue,
      dataSource1
    };
  },
  });
</script>