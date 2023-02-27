<template>
  <a-layout-header style="background: #fff; margin-top:1px; padding-left: 24px ">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>主动学习</a-breadcrumb-item>
      <a-breadcrumb-item>数据获取</a-breadcrumb-item>
    </a-breadcrumb>
  </a-layout-header>
  <a-layout-content
    :style="{ margin: '16px 16px', padding: '24px', background: '#fff', minHeight: '335px' }"
  >
    <!-- <a-layout-header style="background: #fff; padding: 0; height:64px"> -->
            <!-- <div style="width: 400px; margin: 0 auto; padding-top: 20px;">
            <a-steps :current="0" size="small" >
                <a-step title="选择模型" />
                <a-step title="知识库链接" />
            </a-steps>
            </div> -->
    <!-- </a-layout-header> -->
    <a-form
    :model="formState"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 8 }"
    @finish="nextStep"
    @finishFailed="onFinishFailed"
    style="width:80%;margin-top:25px;float:left;margin-left: 20%;"
    >
    <a-form-item
        label="选择模型"
        name="knowledge_base"
    >
        <a-input
        v-model:value="formState.modelName"
        ></a-input>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button  type="primary" ghost html-type="submit">下一步</a-button>
    </a-form-item>
    </a-form>
  </a-layout-content>
</template>
<script>
import router from '@/router'
import { defineComponent, reactive, inject } from 'vue'
export default defineComponent({
  components: {
  },
  setup () {
    const formState = reactive({})
    const modelName = inject('modelName')
    const changeKeys = inject('changeKeys')
    const nextStep = () => {
      modelName.value = formState.modelName
      changeKeys(['6'])
      router.push({ path: 'study' })
    }

    return {
      formState,

      nextStep
    }
  }
})
</script>
