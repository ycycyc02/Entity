<template>
    <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      style="width:80%;margin-top:20px;float:left;margin-left: 5%;"
    >
    <a-row :gutter=24>
        <a-col :span="24">
          <a-form-item
            label="模型选择"
            name="model"
            :label-col="{ span: 3 }"
            :wrapper-col="{ span: 21 }"
          >
            <a-select
            v-model:value="formState.model"
            placeholder="Select a model"
            :options="options"
            ></a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter=24>
        <a-col :span="12">
          <a-form-item
            label="学习率"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-radio-group v-model:value="formState.learningRate" style="width:100%" >
              <a-radio-button value="2e-5">2e-5</a-radio-button>
              <a-radio-button value="2e-6">2e-6</a-radio-button>
              <a-radio-button value="2e-7">2e-7</a-radio-button>
              <a-input 
                class = 'item4' 
                v-model:value="formState.learningRate"
                placeholder="自定义"
              >自定义</a-input>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12"  >
          <a-form-item
            label="最大字符长度"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 18 }"
          >
            <!-- <a-form-item> -->
            <a-radio-group v-model:value="formState.maxCharLength">
              <a-radio-button value="32">32</a-radio-button>
              <a-radio-button value="64">64</a-radio-button>
              <a-radio-button value="128">128</a-radio-button>
              <a-input 
                class = 'item4' 
                v-model:value="formState.maxCharLength"
                placeholder="自定义"
              >自定义</a-input>
            </a-radio-group>
            <!-- </a-form-item> -->
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <a-col  :span="12">
          <a-form-item
            name="batch"
            label="训练批量"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-radio-group v-model:value="formState.batch">
              <a-radio-button value="16" >16</a-radio-button>
              <a-radio-button value="32">32</a-radio-button>
              <a-radio-button value="48">48</a-radio-button>
              <a-radio-button value="64">64</a-radio-button>
              <a-input 
                class = 'item4' 
                v-model:value="formState.batch"
                placeholder="自定义"
              >自定义</a-input>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col  :span="12">
          <a-form-item
            name="epoch"
            label="训练轮次"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-radio-group v-model:value="formState.epoch">
              <a-radio-button value="10">10</a-radio-button>
              <a-radio-button value="20">20</a-radio-button>
              <a-radio-button value="50">50</a-radio-button>
              <a-radio-button value="100">100</a-radio-button>
              <a-input 
                class = 'item4' 
                v-model:value="formState.epoch"
                placeholder="自定义"
              >自定义</a-input>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter=24>
        <a-col :span="24">
          <a-form-item
            label="随即失活"
            :label-col="{ span: 3 }"
            :wrapper-col="{ span: 21 }"
          >
            <a-radio-group v-model:value="formState.dropout">
              <a-radio-button value="0">0</a-radio-button>
              <a-radio-button value="0.1">0.1</a-radio-button>
              <a-radio-button value="0.2">0.2</a-radio-button>
              <a-radio-button value="0.3">0.3</a-radio-button>
              <a-radio-button value="0.4">0.4</a-radio-button>
              <a-radio-button value="0.5">0.5</a-radio-button>
              <a-input 
                class = 'item4' 
                v-model:value="formState.dropout"
                placeholder="自定义"
              >自定义</a-input>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter=24>
        <a-col :span="24">
          <a-form-item
            label="损失函数"
            :label-col="{ span: 3 }"
            :wrapper-col="{ span: 21 }"
          >
            <a-radio-group v-model:value="formState.loss">
              <a-radio-button value="categorical_crossentropy">categorical_crossentropy</a-radio-button>
              <a-radio-button value="sparse_categorical_crossentropy">sparse_categorical_crossentropy</a-radio-button>
              <a-radio-button value="binary_crossentropy">binary_crossentropy</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="24"  >
        <a-form-item
          label="	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "
          :colon="false"
          :label-col="{ span: 3 }"
            :wrapper-col="{ span: 14 }"
          >
              <a-radio-group v-model:value="formState.loss">
                <a-radio-button value="mean_squared_error">mean_squared_error</a-radio-button>
                <a-radio-button value="mean_absolute_error">mean_absolute_error</a-radio-button>
              </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>

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
        label: '模型1',
        value: '模型1'
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
    current.value = 2
    const auto_increment_id = inject('auto_increment_id')
    const formState1 = inject('formState')
    const onFinish = values => {
      router.push('confirm')
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
          url: 'http://172.20.137.106:33004/test/modelSelection',
          data: {
            model_name: formState.model,
            hyper_parameter: {
              batchsize: formState.batchsize,
              epoch: formState.epoch,
              learning_rate: formState.learning_rate
            },
            auto_increment_id: auto_increment_id.value
          }
        })
      })
      formState1.model = formState.model
      formState1.epoch = formState.epoch
      formState1.learning_rate = formState.learning_rate
    }
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo)
    }
    const previousStep = () => {
      router.push('selectkb')
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
