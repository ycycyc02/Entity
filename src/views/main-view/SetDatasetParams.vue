<template>
  <div style="width:90%; padding-left: 0%;padding-right: 10%;">
    <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      style="padding-top:20px"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item
        label="训练集比例"
      >
        <a-radio-group v-model:value="formState.trainingSetPartition">
          <a-radio-button value="0.4">0.4</a-radio-button>
          <a-radio-button value="0.5">0.5</a-radio-button>
          <a-radio-button value="0.6">0.6</a-radio-button>
          <a-radio-button value="0.7">0.7</a-radio-button>
          <a-radio-button value="0.8">0.8</a-radio-button>
          <a-input 
                class = 'item4' 
                v-model:value="formState.trainingSetPartition"
                placeholder="自定义"
              >自定义</a-input>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        label="验证集比例"
      >
        <a-radio-group v-model:value="formState.validationSetPartition">
          <a-radio-button value="0.1">0.1</a-radio-button>
          <a-radio-button value="0.2">0.2</a-radio-button>
          <a-radio-button value="0.3">0.3</a-radio-button>
          <a-radio-button value="0.4">0.4</a-radio-button>
          <a-radio-button value="0.5">0.5</a-radio-button>
          <a-input 
            class = 'item4' 
            v-model:value="formState.validationSetPartition"
            placeholder="自定义"
          >自定义</a-input>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        label="测试集比例"
      >
        <a-radio-group v-model:value="formState.testSetPartition">
          <a-radio-button value="0.1">0.1</a-radio-button>
          <a-radio-button value="0.2">0.2</a-radio-button>
          <a-radio-button value="0.3">0.3</a-radio-button>
          <a-radio-button value="0.4">0.4</a-radio-button>
          <a-radio-button value="0.5">0.5</a-radio-button>
          <a-input 
                class = 'item4' 
                v-model:value="formState.testSetPartition"
                placeholder="自定义"
              >自定义</a-input>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        label="是否随机划分"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 6 }"
      >
        <a-radio-group v-model:value="formState.randomShuffle">
          <a-radio-button value="是">是</a-radio-button>
          <a-radio-button value="否">否</a-radio-button>
        </a-radio-group>
      </a-form-item>

    </a-form>
  </div>
  </template>
<script>
import { message } from 'ant-design-vue'
import axios from 'axios'
import { defineComponent, reactive, ref, watch} from 'vue'
import { useRouter } from 'vue-router'
import { useDatasetStore } from '@/stores/dataset'

export default defineComponent({
 
  setup () {
    const router = useRouter()

    const formState = reactive({
    })

    // 表单
    const dataset = useDatasetStore()

    const onFinish = values => {
      if(formState.trainingSetPartition!= undefined && formState.validationSetPartition!= undefined && formState.testSetPartition!=undefined && formState.randomShuffle!= undefined){
        var result = parseFloat(formState.trainingSetPartition) + parseFloat(formState.validationSetPartition) + parseFloat(formState.testSetPartition)
      if (parseFloat(result.toFixed(10)) != 1) {
          message.error('训练集、验证集、测试集比例之和应为1')
          console.log(parseFloat(formState.trainingSetPartition) + parseFloat(formState.validationSetPartition) ,parseFloat(formState.testSetPartition));
        } else {
          // router.push({ name: 'selectkb' })
          // trainingRecordName.value = values.trainingRecordName
          axios({
            method: 'post',
            url: 'http://172.20.137.106:33004/test/dataSetPartition',
            data: {
              trainingRecordName: dataset.datasetName,
              dataSetName: dataset.datasetName,
              trainingSetPartition: parseFloat(formState.trainingSetPartition),
              validationSetPartition: parseFloat(formState.validationSetPartition),
              testSetPartition: parseFloat(formState.testSetPartition),
              randomShuffle: Boolean(formState.randomShuffle)
            }
          }).then(res=>{
            if(res.data.error_code === 200){
              dataset.setAutoIncrementId(res.data.data.auto_increment_id)
            }
          })
        }
      }
      
    }
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo)
    }

    // 监听proxy对象
    watch(formState, (newValue, oldValue) => {
      onFinish()
    });

    return {
      formState,
      onFinish,
      onFinishFailed,
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
