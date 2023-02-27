<template>
  <div style="width:100%; padding-left: 10%;padding-right: 10%;">
    <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-row :gutter=24>
        <a-col :span="12">
          <a-form-item
            label="学习率"
          >
            <a-radio-group v-model:value="formState.randomShuffle">
              <a-radio-button value="2e-5">2e-5</a-radio-button>
              <a-radio-button value="2e-6">2e-6</a-radio-button>
              <a-radio-button value="2e-7">2e-7</a-radio-button>
              <a-radio-button value="自定义">自定义</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12"  >
          <a-form-item
            label="最大字符长度"
          >
            <!-- <a-form-item> -->
            <a-radio-group v-model:value="formState.randomShuffle">
              <a-radio-button value="32">32</a-radio-button>
              <a-radio-button value="64">64</a-radio-button>
              <a-radio-button value="128">128</a-radio-button>
              <a-radio-button value="自定义">自定义</a-radio-button>
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
          >
            <a-radio-group v-model:value="formState.batch">
              <a-radio-button value="16">16</a-radio-button>
              <a-radio-button value="32">32</a-radio-button>
              <a-radio-button value="48">48</a-radio-button>
              <a-radio-button value="64">64</a-radio-button>
              <a-radio-button name='diy_batch' value="自定义">自定义</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col  :span="12">
          <a-form-item
            name="epoch"
            label="训练轮次"
          >
            <a-radio-group v-model:value="formState.epoch">
              <a-radio-button value="10">10</a-radio-button>
              <a-radio-button value="20">20</a-radio-button>
              <a-radio-button value="50">50</a-radio-button>
              <a-radio-button value="100">100</a-radio-button>
              <a-radio-button name='diy_batch' value="自定义">自定义</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item
        label="随即失活"
      >
        <a-radio-group v-model:value="formState.loss">
          <a-radio-button value="0">0</a-radio-button>
          <a-radio-button value="0.1">0.1</a-radio-button>
          <a-radio-button value="0.2">0.2</a-radio-button>
          <a-radio-button value="0.3">0.3</a-radio-button>
          <a-radio-button value="0.4">0.4</a-radio-button>
          <a-radio-button value="0.5">0.5</a-radio-button>
          <a-radio-button value="自定义">自定义</a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-row :gutter=24>
        <a-col :span="24">
          <a-form-item
            label="损失函数"
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
          >
              <a-radio-group v-model:value="formState.loss">
                <a-radio-button value="mean_squared_error">mean_squared_error</a-radio-button>
                <a-radio-button value="mean_absolute_error">mean_absolute_error</a-radio-button>
              </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- <a-form-item
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
      </a-form-item> -->

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button  type="primary" ghost html-type="submit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>

  </template>
<script>
import { message } from 'ant-design-vue'
import axios from 'axios'
import { defineComponent, reactive, ref, inject } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const router = useRouter()

    const formState = reactive({
      randomShuffle: true
    })

    // 下拉框
    const options = ref([
    ])
    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    const loading = ref(true)
    const getData = () => {
      axios('http://172.20.137.106:33004/test/getDataset')
        .then((value) => {
          options.value = value.data.data
          let i = 0
          for (i = 0; i < options.value.length; i++) {
            options.value[i].value = options.value[i].dataset_name
            options.value[i].label = options.value[i].dataset_name
          }
          loading.value = false
        })
    }
    getData()

    // 表单
    const current = inject('current')
    current.value = 0
    const setId = inject('setId')
    const trainingRecordName = inject('trainingRecordName')
    const onFinish = values => {
      if ((parseFloat(formState.trainingSetPartition) + parseFloat(formState.validationSetPartition) + parseFloat(formState.testSetPartition)) != 1) {
        console.log('不正确')
        // console.log(typeof values.trainingSetPartition);
      } else {
        router.push({ name: 'selectkb' })
        trainingRecordName.value = values.trainingRecordName
        axios({
          method: 'post',
          url: 'http://172.20.137.106:33004/test/dataSetPartition',
          data: {
            trainingRecordName: formState.trainingRecordName,
            dataSetName: formState.dataSetName,
            trainingSetPartition: parseFloat(formState.trainingSetPartition),
            validationSetPartition: parseFloat(formState.validationSetPartition),
            testSetPartition: parseFloat(formState.testSetPartition),
            randomShuffle: Boolean(formState.randomShuffle)
          }
        }).then(res => {
          const _id = res.data.data.auto_increment_id
          console.log(_id)
          setId(_id)
        })
      }
    }
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo)
    }

    return {
      formState,
      loading,
      onFinish,
      onFinishFailed,
      getData,
      filterOption,
      options
    }
  }
})
</script>
