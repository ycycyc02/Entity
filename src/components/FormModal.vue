<template>
    <div>
      <!-- <a-button type="primary" @click="showModal"
        >Open Modal with customized footer</a-button
      > -->
      <a-modal v-model:visible="visible" title="表单" @ok="handleOk" centered>
        <template #footer>
          <a-button key="back" @click="handleCancel">Return</a-button>
          <a-button key="submit" type="primary" @click="handleOk">Submit</a-button
          >
        </template>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </a-modal>
    </div>
  </template>
  <script>
  import { defineComponent, ref , inject,} from "vue";

  export default defineComponent({
    setup() {
      const { changeFormState } = inject('key')
      
      let visible = ref(false);
      const showModal = record =>{
        console.log('yes');
        visible.value = true;
      }

      const handleOk = () => {
        visible.value = false;
      };
      const handleCancel = () => {
        visible.value = false;
      };
      return {
        visible,
        handleOk,
        handleCancel,
        showModal,

      };
    },
  });
  </script>
  