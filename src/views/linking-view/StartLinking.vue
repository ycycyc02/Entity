<template>
    <a-layout style="background: #fff">
      <a-layout-header style="background: #fff; padding: 0; height:44px">
        <div style="width: 400px; margin: 0 auto; padding-top: 20px;">
          <a-steps :current="current" size="small" >
            <a-step title="选择模型" />
            <a-step title="知识库链接" />
          </a-steps>
        </div>
      </a-layout-header>
      <a-layout-content>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '500px'}">
            <!-- table -->
            <router-view />
        </div>
      </a-layout-content>
    </a-layout>
</template>
<script>
import { defineComponent, ref, provide} from 'vue';

export default defineComponent({
  components: {
  },
  setup() {

    const current = ref(0);

    provide('current',current);

    return {
      current,
    };
  }
});
</script>