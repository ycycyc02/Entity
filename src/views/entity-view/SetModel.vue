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
        label="模型选择"
        name="model"
        :rules="[{ required: true, message: '请选择模型!' }]"
      >
        <a-select
        v-model:value="formState.model"
        placeholder="Select a model"
        style="width: 200px"
        :options="options"
        ></a-select>
      </a-form-item>
      <br>

      <a-form-item
        label="超参数选择"
      >
        <a-form-item
        label="batchsize"
        name="batchsize"
        :rules="[{ required: true, message: '请输入batchsize!' }]"
      >
        <a-input v-model:value="formState.batchsize" />
        </a-form-item>
        
        <a-form-item
          label="epoch"
          name="epoch"
          :rules="[{ required: true, message: '请输入epoch!' }]"
        >
          <a-input v-model:value="formState.epoch" />
        </a-form-item>

        <a-form-item
          label="learning_rate"
          name="learning_rate"
          :rules="[{ required: true, message: '请输入learning_rate!' }]"
        >
          <a-input v-model:value="formState.learning_rate" />
        </a-form-item>
      </a-form-item>
      <br>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <span><a-button  danger @click="previousStep">上一步</a-button>&nbsp;&nbsp;&nbsp;</span>
        <a-button  type="primary" ghost html-type="submit">下一步</a-button>
      </a-form-item>
    </a-form>
  </template>
  <script>
  import axios from 'axios';
  import { defineComponent, reactive, ref, inject} from 'vue';
  import { useRouter } from "vue-router";

  export default defineComponent({
    setup() {
      const router = useRouter();

      const formState = reactive({});

      // 下拉框
      const options = ref([
        {
            label:'模型1',
            value:'模型1'
        }
      ]);
      
      const setData = ()=>{
        // axios('http://172.20.137.106:33004/test/getDataset')
        // .then(value=>{
        //   options.value=value.data.data;
        //   let i=0;
        //   for(i=0;i<options.value.length;i++){
        //     options.value[i].value=options.value[i].dataset_name;
        //     options.value[i].label=options.value[i].dataset_name;
        //   }
        // })
      }
      
      // 表单
      const current = inject('current');
      current.value=2;
      const auto_increment_id = inject('auto_increment_id');
      const formState1 = inject('formState');
      const onFinish = values => {
        router.push('confirm');
        let r = new Promise((resolve) =>{
          let timer = setInterval(() =>{
            if(auto_increment_id.value){
              clearInterval(timer)
              resolve(true)
            }
          },100)
        })
        r.then((res)=>{
          axios({
            method:'post',
            url:'http://172.20.137.106:33004/test/modelSelection',
            data:{
              model_name:formState.model,
              hyper_parameter:{
                  batchsize:formState.batchsize,
                  epoch:formState.epoch,
                  learning_rate:formState.learning_rate
              },
              auto_increment_id:auto_increment_id.value
            }
          })
        })
        formState1.model = formState.model;
        formState1.epoch = formState.epoch;
        formState1.learning_rate = formState.learning_rate;
      };
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };
      const previousStep = ()=>{
        router.push('selectkb')
      }

      setData();
      return {
        formState,
        onFinish,
        onFinishFailed,
        setData,
        previousStep,
        value: ref(undefined),
        options,
      };
    }
  });
  </script>