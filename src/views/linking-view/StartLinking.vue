<template>
    <a-layout-header style="background: #fff; margin-top:1px; padding-left: 24px ">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>实体链接</a-breadcrumb-item>
      <a-breadcrumb-item>进行链接</a-breadcrumb-item>
    </a-breadcrumb>
  </a-layout-header>
  <a-layout-content
    :style="{ margin: '16px 16px', padding: '24px', background: '#fff', minHeight: '335px' }"
  >
      <a-layout-header style="background: #fff; padding: 0; height:48px">
        <div style="width: 400px; margin: 0 auto;">
          <a-steps :current="current" size="small" >
            <a-step title="选择模型" />
            <a-step title="知识库链接" />
          </a-steps>
        </div>
      </a-layout-header>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '500px'}">
            <!-- table -->
            <router-view />
        </div>
      </a-layout-content>
</template>
<script>
import { defineComponent, ref, provide } from 'vue'

export default defineComponent({
  components: {
  },
  setup () {
    const current = ref(0)

    provide('current', current)

    return {
      current
    }
  }
})
</script>
