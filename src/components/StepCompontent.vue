<template>
    <a-steps :current="current" size="small" >
    <a-step title="上传excel" />
    <a-step title="修改内容" />
    <a-step title="知识库查询" />
    <a-step title="数据集修改" />
  </a-steps>
</template>
<script>
  import { defineComponent, ref  } from 'vue';
  export default defineComponent({
    setup(){
      let current = ref(0);

      return {
        current
      }
    }
  })
</script>