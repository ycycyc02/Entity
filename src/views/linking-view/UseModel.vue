<template>
    <!-- 文本链接 -->
    <div style="width: 50%; float:left; padding-right: 20px; padding-left: 20px">
        <p>
            待链接文本<br/>
        </p>
        <p>
            <a-input v-model:value="text" style="height:40px"></a-input><br/>
        </p>

        <p>
            文本待链接实体<br/>
        </p>
        <p>
            <a-input v-model:value="entity" style="height:40px"></a-input><br/>
        </p>
        <p>
            <br/>
            <a-button
                type="primary"
                @click="onSubmit"
                style = "float:right"
            >
                提交
            </a-button>
        </p>
    </div>
    <div style="width: 50%; float:left; padding-right: 20px; padding-left: 20px">
        <p>
            链接结果<br/>
        </p>
        <p>
            <a-input v-model:value="kbentity" style="height:40px"></a-input><br/>
        </p>
        <p>
            <a-textarea
                v-model:value="property"
                :auto-size="{ minRows: 4, maxRows: 10 }"
            />
        </p>
    </div>
</template>
<script>
import axios from 'axios'
import { defineComponent, ref, inject } from 'vue'
export default defineComponent({
  components: {
  },
  setup () {
    const text = ref(null)
    const entity = ref(null)
    const kbentity = ref(null)
    const property = ref(null)

    const current = inject('current')
    current.value = 1

    const onSubmit = () => {
      kbentity.value = '腹泻'
      property.value = '知识库描述信息: related_ symptom 低烧\n\
related_ symptom 低血钾\n\
related_ symptom 恶心\n\
belong- department 内科\n\
belong. department 消化内科\n\
possible_ disease 肺、胸膜阿米巴病'
      // axios({
      //     method:'post',
      //     url:'http://172.20.137.106:33004/test/useModel',
      //     data:{
      //         entity:entity.value,
      //         text:text.value
      //     }
      // }).then(res=>{
      //     kbentity.value = res.data.data.entity;
      // })
    }

    return {
      current,
      text,
      entity,
      kbentity,
      property,
      onSubmit
    }
  }
})
</script>
