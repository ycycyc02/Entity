<template>
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
          v-model:value="formState.knowledge_base"
        ></a-input>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button  type="primary" ghost html-type="submit">下一步</a-button>
      </a-form-item>
    </a-form>
</template>
<script>
    import router from '@/router';
    import axios from 'axios';
    import { defineComponent, reactive, inject} from 'vue';
    export default defineComponent({
    components: {
    },
    setup() {
        const formState = reactive({});
        const current = inject('current');
        current.value = 0

        const nextStep = ()=>{
            router.push("start")
        }

        return {
            formState,
            current,
            nextStep
        };
    }
    });
</script>