<template>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 8 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      style="width:60%;margin-top:25px;float:left;margin-left: 20%;"
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
        style="width: 200px"
        :options="options"
        :filter-option="filterOption"
        :loading="loading"
        ></a-select>
      </a-form-item>
      <br>

      <a-form-item
        label="数据集划分"
        name="trainingSetPartition"
      >
        <a-form-item
        label="训练集比例"
        name="trainingSetPartition"
        :rules="[{ required: true, message: '请输入训练集比例!' }]"
      >
        <a-input v-model:value="formState.trainingSetPartition" />
        </a-form-item>
        
        <a-form-item
          label="验证集比例"
          name="validationSetPartition"
          :rules="[{ required: true, message: '请输入验证集比例!' }]"
        >
          <a-input v-model:value="formState.validationSetPartition" />
        </a-form-item>

        <a-form-item
          label="测试集比例"
          name="testSetPartition"
          :rules="[{ required: true, message: '请输入测试集比例!' }]"
        >
          <a-input v-model:value="formState.testSetPartition" />
        </a-form-item>
      </a-form-item>

      <a-form-item 
        name="randomShuffle" 
        label="采样方式" 
        :rules="[{ required: true, message: '请选择采样方式!' }]"
      >
        <!-- <a-form-item> -->
          <a-radio-group v-model:value="formState['randomShuffle']">
          <a-radio value="true">随机shuffle</a-radio>
          <a-radio value="false">顺序切片</a-radio>
        </a-radio-group>
        <!-- </a-form-item> -->
      </a-form-item>
      <br>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
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
        if((parseFloat(formState.trainingSetPartition)+parseFloat(formState.validationSetPartition)+parseFloat(formState.testSetPartition)) != 1){
          console.log('不正确');
          // console.log(typeof values.trainingSetPartition);
        }else{
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