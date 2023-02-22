<template>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 8 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      style="width:80%;margin-top:25px;float:left;margin-left: 20%;"
    >
      <a-form-item
        label="知识库"
        name="knowledge_base"
      >
        <a-input
          v-model:value="formState.knowledge_base"
        ></a-input>
      </a-form-item>

      <a-form-item
        label="数据集"
        name="dataset"
      >
        <a-input
          v-model:value="formState.dataset"
        ></a-input>
      </a-form-item>

      <a-form-item
        label="数据集比例"
        name="dataset_partition"
      >
        <a-input
          v-model:value="formState.dataset_partition"
        ></a-input>
      </a-form-item>

      <a-form-item
        label="模型"
        name="model"
      >
        <a-input
        v-model:value="formState.model"
        ></a-input>
      </a-form-item>

      <!-- <a-form-item
        label="batchsize"
        name="batchsize"
      >
        <a-input v-model:value="formState.batchsize" />
      </a-form-item> -->
        
      <a-form-item
        label="epoch"
        name="epoch"
      >
        <a-input v-model:value="formState.epoch" />
      </a-form-item>

      <a-form-item
        label="learning_rate"
        name="learning_rate"
      >
        <a-input v-model:value="formState.learning_rate" />
      </a-form-item>
      <br>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <span><a-button  danger @click="previousStep">上一步</a-button>&nbsp;&nbsp;&nbsp;</span>
        <a-button  type="primary" ghost html-type="submit">确&nbsp;&nbsp;&nbsp;&nbsp;认</a-button>
      </a-form-item>
    </a-form>
</template>
<script>
import axios from 'axios';
  import { defineComponent, reactive, inject} from 'vue';
  import { useRouter } from "vue-router";

  export default defineComponent({
    setup() {
      const router = useRouter();

      const formState = reactive({});
      
      // 表单
      const current = inject('current');
      current.value=3;
      const trainingRecordName = inject('trainingRecordName');
      const formState1 = inject('formState');
    //   const auto_increment_id = inject('auto_increment_id');
      const getData = ()=>{
        axios({
            url:"http://172.20.137.106:33004/test/getTrainingSetting",
            method:'post',
            data:{
                trainingRecordName:trainingRecordName.value
            }
        }).then(res =>{
            formState.knowledge_base = '知识库1';
            formState.dataset = res.data.data.dataset;
            formState.dataset_partition = res.data.data.dataset_partition;
            formState.model = formState1.model;
            formState.learning_rate = formState1.learning_rate.toString();
            formState.epoch = formState1.epoch;
        })
      }
      getData();
      const onFinish = values => {
        router.push('');
      };
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };
      const previousStep = ()=>{
        router.push('setmodel')
      }

      return {
        formState,
        onFinish,
        onFinishFailed,
        previousStep,

      };
    }
  });
  </script>