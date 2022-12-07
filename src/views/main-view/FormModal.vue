<template>
    <div>
      <a-modal v-model:visible="visible" title="表单" centered>
        <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
        >
          <a-form-item
            label="self_defining_id"
            name="self_defining_id"
            :rules="[{ required: true, message: 'Please input self_defining_id!' }]"
          >
            <a-input v-model:value="formState.self_defining_id" />
          </a-form-item>

          <a-form-item
            label="segment_id"
            name="segment_id"
            :rules="[{ required: true, message: 'Please input segment_id!' }]"
          >
            <a-input v-model:value="formState.segment_id" />
          </a-form-item>

          <a-form-item
            label="entity"
            name="entity"
            :rules="[{ required: true, message: 'Please input entity!' }]"
          >
            <a-input v-model:value="formState.entity" />
          </a-form-item>

          <a-form-item
            label="entity_kb"
            name="entity_kb"
            :rules="[{ required: true, message: 'Please input entity_kb!' }]"
          >
            <a-input v-model:value="formState.entity_kb" />
          </a-form-item>

          <a-form-item
            label="text"
            name="text"
            :rules="[{ required: true, message: 'Please input text!' }]"
          >
            <a-input v-model:value="formState.text" />
          </a-form-item>

          <a-form-item
            label="data"
            name="data"
            :rules="[{ required: true, message: 'Please input data!' }]"
          >
            <!-- <a-input v-model:value="formState.data" /> -->
            <a-textarea
              v-model:value="formState.data"
              placeholder="Please input data!"
              :auto-size="{ minRows: 2, maxRows: 5 }"
            />
          </a-form-item>

          <!-- <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
          </a-form-item> -->
        </a-form>
        <template #footer>
          <a-button key="back" @click="onFinishFailed">取消</a-button>
          <a-button key="submit" type="primary" @click="onFinish">提交</a-button>
        </template>
      </a-modal>
    </div>
  </template>
  <script>
  import { defineComponent, ref , reactive, inject} from "vue";
  import axios from 'axios';

  export default defineComponent({
    setup() {

      // Inject
      const { updateData, dataDetName } = inject('dataDetName');

      // 弹出modal
      let visible = ref(false);
      const showModal = () =>{
        visible.value = true;
      };
      const initForm = record =>{
        formState.self_defining_id = record.self_defining_id;
        formState.segment_id = record.segment_id;
        formState.entity = record.entity;
        formState.entity_kb = record.entity_kb;
        formState.text = record.text;
        formState.data = record.data;
        // console.log(typeof formState.self_defining_id)
      };

      // 表单
      const formState = reactive({
        self_defining_id:'',
        segment_id:'',
        entity:'',
        entity_kb:'',
        text:'',
        data:''
      });
      // 提交表单
      const onFinish = () => {
        // console.log(dataDetName);
        axios({
          method: 'post',
          url: 'http://172.20.137.106:33004/test/saveTrainingSet',
          data:{
            trainingData: [formState],
            trainingSetName : dataDetName.value
          }
            
        }).then(value=>{
          visible.value = false;
          // console.log(value)
          if(value.data.error_code == 200){
            // delteData(formState.self_defining_id);
            let OldId = formState.self_defining_id;
            formState.self_defining_id = value.data.data.min;
            updateData(formState , OldId);
            console.log('Success:', formState);
          }else{
            console.log('提交失败')
          } 
        })
      };
      // 提交失败
      const onFinishFailed = errorInfo => {
        console.log('Canceled:', errorInfo);
        visible.value = false;
      };

      return {
        visible,
        showModal,
        onFinish,
        onFinishFailed,
        formState,
        initForm,
      };
    },
  });
  </script>
  