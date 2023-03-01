<template>
    <!-- 上传 -->
    <div style=" padding-left: 10%;width:60%;float:left">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 18 }"
        autocomplete="off"
        style="minHeight: 280px;width:100%"
      >
        <a-form-item
          label="数据集名称"
          name="数据集名称"
        >
          <a-input v-model:value="formState.datasetName" placeholder="请输入数据集名称"></a-input>
        </a-form-item>

        <a-form-item
          label="负样本比例"
        > 
          <a-row>
            <a-col :span="24">
              <a-radio-group v-model:value="formState.negativeProportion" >
                <a-radio-button value="0.2">0.2</a-radio-button>
                <a-radio-button value="0.4">0.4</a-radio-button>
                <a-radio-button value="0.6">0.6</a-radio-button>
                <a-radio-button value="0.8">0.8</a-radio-button>
                <a-input 
                  class = 'item4' 
                  v-model:value="formState.negativeProportion"
                  placeholder="自定义"
                >自定义</a-input>              
              </a-radio-group>
            </a-col>
          </a-row>
          <!-- <a-input v-model:value="formState.negativeProportion" placeholder="比如: 0.8表示对于每个正例生成4个负例"></a-input> -->
        </a-form-item>

        <a-form-item
          label="选择知识库"
          name="知识库名称"
        >
          <a-select
            v-model:value="formState.kbBaseName"
            show-search
            :loading="loading"
            placeholder="请选择知识库"
            :options="options"
            :filter-option="filterOption"
          ></a-select>
        </a-form-item>

        <a-form-item
          label="上传数据集"
        >
          <a-upload-dragger
            v-model:fileList="fileList"
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
    <div style=" padding-right:10%;width:40%; float:right">
      <a-alert 
          message="数据集名称不能重复" 
          type="info" 
          show-icon 
          closable
          style=""
          />
      <a-alert 
          message="负样本比例: 0.8表示对于每个正例生成4个负例" 
          type="info" 
          show-icon 
          closable
          style="margin-top: 10px;"
          />
      <a-alert 
        message="请选择选择已有知识库" 
        type="info" 
        show-icon 
        closable
        style="margin-top: 10px;"
      />
      <a-alert 
        message="请正确上传文件，文件类型为xlsx，列名为auto_increment_id，segment_id，text，entity，subject_id，offset" 
        type="info" 
        show-icon 
        closable
        style="margin-top: 10px;height:150px"
      />
    </div>
</template>
<script>
import axios from 'axios'
import { InboxOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { defineComponent, ref, reactive } from 'vue'
import { useDatasetStore } from '@/stores/dataset'

export default defineComponent({
  components: {
    // UploadOutlined,
    InboxOutlined
  },

  setup () {
    const formState = reactive({
      inputValue: '',
      datasetName: ''
    })
    const fileList = ref([])
    const dataSource1 = ref([])
    const dataDetName = ref('')
    const inputValue = ref('')
    const dataset = useDatasetStore()

    // 上传
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
      dataset.setDatasetName(formState.datasetName)
      dataset.setKnowledgeBaseName(formState.kbBaseName)
      dataset.setNegativeProportion(parseFloat(formState.negativeProportion))
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
              item.key = item.self_defining_id
            })
            dataset.setDataSource(dataSource1.value)
          } else {
            fileList.value = []
            message.error('上传失败,请检查文件格式是否正确！')
          }
        },reason =>{
          message.error('上传失败，请检查所用知识库是否正确!')
        })
      }
    }
    // 知识库选择
    const loading = ref(true)
    const options = ref([])
    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }; 
    const setData = () => {
      axios('http://172.20.137.106:33004/test/getAllKnowledgeBases')
      .then(value=>{
        var temp = []
        temp=value.data.data.name_list;
        let i=0;
        for(i=0;i<temp.length;i++){
          console.log(temp[0]);
          options.value.push({value:temp[i][0],label:temp[i][0]})
        }
        loading.value = false
      })
    }
    setData()



    return {
      fileList,
      handleRemove,
      handleUpload,
      dataSource1,
      formState,
      handleChange,
      inputValue,
      dataDetName,
      options,
      loading,
      filterOption,
      setData,
    }
  }
})
</script>
<style scoped>
.ant-radio-group {
  width:100%;
  text-align: center;
  display: flex;
}

.ant-radio-button-wrapper{
  border-radius: 0 0 0 0;
  width:500px;
}
.item4 ,.item5{
  width:500px;
  border-radius: 0 2px 2px 0;
}
</style>
