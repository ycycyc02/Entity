<template>
    <a-layout style="background: #fff">
        <a-layout-header style="background: #fff; padding: 0; height:64px">
            <!-- <div style="width: 400px; margin: 0 auto; padding-top: 20px;">
            <a-steps :current="0" size="small" >
                <a-step title="选择模型" />
                <a-step title="知识库链接" />
            </a-steps>
            </div> -->
      </a-layout-header>
      <a-layout-content style="minHeight:500px">
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
            v-model:value="formState.model_name"
            ></a-input>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button  type="primary" ghost html-type="submit">下一步</a-button>
        </a-form-item>
        </a-form>
      </a-layout-content>
    </a-layout>
</template>
<script>
    import router from '@/router';
    import axios from 'axios';
    import { defineComponent, reactive ,inject} from 'vue';
    export default defineComponent({
    components: {
    },
    setup() {
        const formState = reactive({});
        const model_name = inject('model_name');
        const changeKeys = inject('changeKeys');
        const nextStep = ()=>{
            model_name.value = formState.model_name;
            changeKeys(['6'])
            router.push({path:"study"})
        }

        return {
            formState,

            nextStep
        };
    }
    });
</script>