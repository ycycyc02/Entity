<template>
    <div>
      <a-modal v-model:visible="visible" title="详情" centered>
        <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
        >
          <a-form-item
            label="段编号"
            name="segment_id"
            :rules="[{ required: true, message: '请输入段编号!' }]"
          >
            <a-input v-model:value="formState.segment_id" />
          </a-form-item>

          <a-form-item
            label="偏移"
            name="offset"
            :rules="[{ required: true, message: '请输入编号!' }]"
          >
            <a-input v-model:value="formState.offset" />
          </a-form-item>

          <a-form-item
            label="实体名称"
            name="entity"
            :rules="[{ required: true, message: 'Please input entity!' }]"
          >
            <a-input v-model:value="formState.entity" />
          </a-form-item>

          <a-form-item
            label="实体编号"
            name="subject_id"
            :rules="[{ required: true, message: 'Please input entity_kb!' }]"
          >
            <a-input v-model:value="formState.subject_id" />
          </a-form-item>

          <a-form-item
            label="文本"
            name="text"
            :rules="[{ required: true, message: 'Please input text!' }]"
          >
            <a-textarea
              v-model:value="formState.text"
              :auto-size="{ minRows: 1, maxRows: 3 }"
            />
          </a-form-item>
          
          <a-form-item
            label="描述信息"
            name="data"
            :rules="[{ required: true, message: 'Please input text!' }]"
          >
            <a-textarea
              v-model:value="formState.data"
              :auto-size="{ minRows: 1, maxRows: 5 }"
            />
          </a-form-item>

          <!-- <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
          </a-form-item> -->
        </a-form>
        <template #footer>
          <a-button key="back" @click="onFinishFailed">取消</a-button>
          <a-button key="submit" type="primary" @click="onFinish">保存</a-button>
        </template>
      </a-modal>
    </div>
  </template>
<script>
import { defineComponent, ref, reactive, inject } from 'vue'
import axios from 'axios'
import { message } from 'ant-design-vue'
import { useDatasetStore } from '@/stores/dataset'

export default defineComponent({
  setup () {
    // Inject
    const { updateData, dataDetName, knowledgeBaseName } = inject('dataDetName')

    // 弹出modal
    const visible = ref(false)
    const showModal = () => {
      visible.value = true
    }
    const initForm = record => {
      formState.segment_id = record.segment_id
      formState.entity = record.entity
      formState.subject_id = record.subject_id
      formState.offset = record.offset
      formState.text = record.text
      formState.data = record.data
      formState.self_defining_id = record.self_defining_id
      // console.log(typeof formState.self_defining_id)
    }

    // 表单
    const formState = reactive({
      self_defining_id: '',
      segment_id: '',
      entity: '',
      subject_id: '',
      text: '',
      data:''
    })
    // 提交表单
    const dataset = useDatasetStore()
    const onFinish = () => {
      message.info('保存成功')
      visible.value = false
      // dataset.setRecord(formState)
      updateData(formState, formState.self_defining_id)         
    }
    // 提交失败
    const onFinishFailed = errorInfo => {
      console.log('Canceled:', errorInfo)
      visible.value = false
    }

    return {
      visible,
      showModal,
      onFinish,
      onFinishFailed,
      formState,
      initForm
    }
  }
})
</script>
