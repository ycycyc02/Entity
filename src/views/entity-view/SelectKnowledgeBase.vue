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
        label="知识库选择"
        name="knowledge_base"
        :rules="[{ required: true, message: '请选择知识库!' }]"
      >
        <a-select
        v-model:value="formState.knowledge_base"
        placeholder="Select a knowledge_base"
        style="width: 200px"
        :options="options"
        ></a-select>
      </a-form-item>
      <br>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <span><a-button  danger @click="previousStep">上一步</a-button>&nbsp;&nbsp;&nbsp;</span>
        <a-button  type="primary" ghost html-type="submit">下一步</a-button>
      </a-form-item>
    </a-form>
  </template>
<script>
import axios from 'axios'
import { defineComponent, reactive, ref, inject } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const router = useRouter()

    const formState = reactive({})

    // 下拉框
    const options = ref([
      {
        label: '知识库1',
        value: '知识库1'
      }
    ])
    const setData = () => {
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
    const current = inject('current')
    current.value = 1
    const setId = inject('setId')
    const auto_increment_id = inject('auto_increment_id')
    const onFinish = values => {
      // console.log('Success:', values);
      const r = new Promise((resolve) => {
        const timer = setInterval(() => {
          if (auto_increment_id.value) {
            clearInterval(timer)
            resolve(true)
          }
        }, 100)
      })
      r.then((res) => {
        axios({
          method: 'post',
          url: 'http://172.20.137.106:33004/test/knowledgeBaseSelection',
          data: {
            knowledge_base: formState.knowledge_base,
            auto_increment_id: auto_increment_id.value
          }
        })
      })
      router.push('setmodel')
    }
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo)
    }

    const previousStep = () => {
      router.push('dataset')
      setId(null)
    }

    setData()
    return {
      formState,
      onFinish,
      onFinishFailed,
      setData,
      previousStep,
      value: ref(undefined),
      options
    }
  }
})
</script>
