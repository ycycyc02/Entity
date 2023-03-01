<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
    style="width:80%;margin-top:20px;float:left;margin-left: 5%;"
  >
    
    <a-form-item
      label="训练模型名称"
      name="trainingRecordName"
      :rules="[{ required: true, message: '请输入训练模型名称!' }]"
    >
      <a-input v-model:value="formState.trainingRecordName" placeholder="input a trainingRecordName"/>
    </a-form-item>

    <a-form-item
      label="数据集名称"
      name="dataSetName"
      :rules="[{ required: true, message: '请选择数据集!' }]"
    >
      <a-select
      v-model:value="formState.dataSetName"
      show-search
      placeholder="Select a dataset"
      :options="options"
      :filter-option="filterOption"
      :loading="loading"
      ></a-select>
    </a-form-item>

    <a-form-item
      label="训练集比例"
      :rules="[{ required: true, message: '请选择训练集比例!' }]"
    >
      <a-radio-group v-model:value="formState.trainingSetPartition">
        <a-radio-button value="0.4">0.4</a-radio-button>
        <a-radio-button value="0.5">0.5</a-radio-button>
        <a-radio-button value="0.6">0.6</a-radio-button>
        <a-radio-button value="0.7">0.7</a-radio-button>
        <a-radio-button value="0.8">0.8</a-radio-button>
        <a-radio-button value="自定义" v-if="formState.trainingSetPartition!='自定义'">自定义</a-radio-button>
        <a-input 
          style="width:16.66%" v-if="formState.trainingSetPartition==='自定义'"
          v-model:value="formState.trainingSetPartition"
        ></a-input>
      </a-radio-group>
    </a-form-item>

    <a-form-item
      label="验证集比例"
      :rules="[{ required: true, message: '请选择验证集比例!' }]"
    >
      <a-radio-group v-model:value="formState.validationSetPartition">
        <a-radio-button value="0.1">0.1</a-radio-button>
        <a-radio-button value="0.2">0.2</a-radio-button>
        <a-radio-button value="0.3">0.3</a-radio-button>
        <a-radio-button value="0.4">0.4</a-radio-button>
        <a-radio-button value="0.5">0.5</a-radio-button>
        <a-radio-button value="自定义">自定义</a-radio-button>
      </a-radio-group>
    </a-form-item>

    <a-form-item
      label="测试集比例"
      :rules="[{ required: true, message: '请选择测试集比例!' }]"
    >
      <a-radio-group v-model:value="formState.testSetPartition">
        <a-radio-button value="0.1">0.1</a-radio-button>
        <a-radio-button value="0.2">0.2</a-radio-button>
        <a-radio-button value="0.3">0.3</a-radio-button>
        <a-radio-button value="0.4">0.4</a-radio-button>
        <a-radio-button value="0.5">0.5</a-radio-button>
        <a-radio-button value="自定义">自定义</a-radio-button>
      </a-radio-group>
    </a-form-item>

    <a-form-item 
      name="randomShuffle" 
      label="采样方式" 
      :rules="[{ required: true, message: '请选择采样方式!' }]"
    >
      <a-radio-group v-model:value="formState.randomShuffle" style="text-align:left;">
        <a-radio-button value="true" style="text-align:center;">是</a-radio-button>
        <a-radio-button value="false" style="text-align:center;">否</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <br>

    <a-form-item :wrapper-col="{ offset: 12, span: 12}">
      <a-button  type="primary" ghost html-type="submit">下一步</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { message } from 'ant-design-vue';
import axios from 'axios';
import { defineComponent, reactive, ref, inject} from 'vue';
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();

    const formState = reactive({
    });

    // 下拉框
    const options = ref([
    ]);
    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };    
    const loading = ref(true)
    const getData = ()=>{
      axios('http://172.20.137.106:33004/test/getDataset')
      .then((value)=>{
        options.value=value.data.data;
        let i=0;
        for(i=0;i<options.value.length;i++){
          options.value[i].value=options.value[i].dataset_name;
          options.value[i].label=options.value[i].dataset_name;
        }
        loading.value = false
      })
    }
    getData();

    
    // 表单
    const current = inject('current');
    current.value=0;
    const setId = inject('setId');
    const trainingRecordName = inject('trainingRecordName');
    const onFinish = values => {
      var result = parseFloat(formState.trainingSetPartition) + parseFloat(formState.validationSetPartition) + parseFloat(formState.testSetPartition)
      if (parseFloat(result.toFixed(10)) != 1) {
          message.error('训练集、验证集、测试集比例之和应为1')
          console.log(parseFloat(formState.trainingSetPartition) + parseFloat(formState.validationSetPartition) ,parseFloat(formState.testSetPartition));
        } else{
        router.push({name:'selectkb'});
        trainingRecordName.value = values.trainingRecordName;
        axios({
          method:'post',
          url:'http://172.20.137.106:33004/test/dataSetPartition',
          data:{
            trainingRecordName:formState.trainingRecordName,
            dataSetName:formState.dataSetName,
            trainingSetPartition:parseFloat(formState.trainingSetPartition),
            validationSetPartition:parseFloat(formState.validationSetPartition),
            testSetPartition:parseFloat(formState.testSetPartition),
            randomShuffle:Boolean(formState.randomShuffle)
          }
        }).then(res=>{
          let _id =res.data.data.auto_increment_id;
          console.log(_id);
          setId(_id);
        })
      }
    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    return {
      formState,
      loading,
      onFinish,
      onFinishFailed,
      getData,
      filterOption,
      options,
    };
  }
});
</script>
<style scoped>
.ant-radio-group {
  width:100%;
  text-align: center;
}

.ant-radio-button-wrapper{
  width:16.66%
}
</style>