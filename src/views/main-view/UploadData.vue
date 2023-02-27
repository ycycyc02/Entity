<template>
    <!-- 上传 -->
    <div style=" padding-right: 20%;padding-left: 20%;width:100%;">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        style="minHeight: '280px'"
      >
        <a-form-item
          label="数据集名称"
          name="数据集名称"
        >
          <a-input v-model:value="formState.datasetName"></a-input>
        </a-form-item>

        <a-form-item
          label="选择知识库"
          name="知识库名称"
        >
          <a-select v-model:value="formState.kbBaseName">
            <a-select-option value="script_ccks2019_kb">script_ccks2019_kb</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="上传数据集"
        >
          <a-upload-dragger
            v-model:fileList="fileList"
            height="200px"
            :action="handleUpload"
            :handleChange ='handleChange'
            :multiple="false"
            :showUploadList='false'
          >
            <p class="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p class="ant-upload-text">点击或拖拽文件到这里上传</p>
            <p class="ant-upload-hint">Support for a single or bulk upload.</p>
          </a-upload-dragger>
        </a-form-item>
      </a-form>
    </div>
</template>
<script>
import axios from 'axios'
import { InboxOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  components: {
    // UploadOutlined,
    InboxOutlined
  },

  setup () {
    const formState = reactive({
      inputValue: '',
      dataDetName: ''
    })
    const fileList = ref([])
    const dataSource1 = ref([])
    const dataDetName = ref('')
    const inputValue = ref('')

    const handleRemove = file => {
      const index = fileList.value.indexOf(file)
      const newFileList = fileList.value.slice()
      newFileList.splice(index, 1)
      fileList.value = newFileList
    }
    const handleChange = info => {
      const status = info.file.status
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
    const handleUpload = (file) => {
      dataDetName.value = formState.datasetName
      inputValue.value = formState.kbBaseName
      if (inputValue.value === '') {
        message.error('请选择知识库')
        fileList.value = []
      } else if (dataDetName.value === '') {
        message.error('请输入数据集名称')
        fileList.value = []
      } else {
        const formData = new FormData()
        fileList.value = [...fileList.value, file]
        fileList.value.forEach((file) => {
          formData.append('trainingset', file)
          formData.append('knowledgeBaseName', inputValue.value)
        })
        // You can use any AJAX library you like
        axios('http://172.20.137.106:33004/test/getTable', {
          method: 'post',
          data: formData
        }).then((res) => {
          if (res.data.errorCode === 200) {
            fileList.value = []
            message.success('上传成功')
            dataSource1.value = res.data.data;
            dataSource1.value.forEach(item=>{
              var temp1 = ''
              if(item.data != null){
                item.data.forEach(smallItem =>{
                  temp1 = temp1 + smallItem.predicate + ':' +smallItem.object +'|'
                })
                item.data = temp1
              }else{
                item.data = '无'
              }
            })
          } else {
            fileList.value = []
            message.error('上传失败,请检查文件格式是否正确！')
          }
        })
      }
    }

    return {
      fileList,
      handleRemove,
      handleUpload,
      dataSource1,
      formState,
      handleChange,
      inputValue,
      dataDetName
    }
  }
})
</script>
