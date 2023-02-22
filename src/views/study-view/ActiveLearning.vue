<template>
    <a-layout style="background: #fff">
      <a-layout-header style="background: #fff; padding: 0; height:64px">
        <div style="margin-left:20px;margin-bottom: 20px;">
                <h2>主动学习数据标注</h2>
            </div>
        <!-- <div style="width: 400px; margin: 0 auto; padding-top: 20px;">
          <a-steps :current="1" size="small" >
            <a-step title="选择模型" />
            <a-step title="知识库链接" />
          </a-steps>
        </div> -->
      </a-layout-header>
      <a-layout-content>
        <div :style="{width:'60%', padding: '24px', background: '#fff', minHeight: '540px',float:'left'}">
 
            <a-form
                :model="formState"
                name="basic"
                :label-col="{ span: 6 }"
                labelAlign = "left"
                :wrapper-col="{ span: 24 }"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
                >
                
                <a-form-item
                    label="原始文本"
                    name="raw_text"
                >
                    <a-input v-model:value="formState.raw_text"/>
                </a-form-item>

                <a-form-item
                    label="待链接实体"
                    name="entity_to_annotate"
                >
                    <a-input v-model:value="formState.entity_to_annotate"/>
                </a-form-item>

                <a-form-item
                    label="知识库查询输入框"
                    name="trainingSetPartition"
                >
                    <a-input-search
                        placeholder="请输入搜索实体名称"
                        class="header_input"
                        @search="onSearch"         
                        />
                </a-form-item>
                
                <a-form-item
                label="标注输入框"
                name="validationSetPartition"
                >
                <a-input v-model:value="formState.entity_id" placeholder="链接到的实体id"/><br/><br/>
                <a-input v-model:value="formState.entity" placeholder="链接到的实体名称"/>

                </a-form-item>

                <a-form-item 
                    :label-col="{ span: 4}"
                    :wrapper-col="{span: 20 }"
                    name="randomShuffle" 
                    label="进度条" 
                >
                    <a-progress :percent="percent" status="active" style="width: 70%;margin-right:10%"/>
                    <a-button  type="primary" ghost html-type="submit">下一步</a-button>
                </a-form-item>
                <br>

                <a-form-item :wrapper-col="{ offset: 12, span: 16 }">
                    
                </a-form-item>
            </a-form>    
        </div>
        <div :style="{width:'40%', padding: '24px', background: '#fff', minHeight: '500px',float:'right'}">
            <!-- {{content}} -->
            <a-table
                :columns="columns1"
                :data-source="dataSource1"
                class="components-table-demo-nested"
            >
                <template #expandedRowRender="{ record }">
                    <a-table
                    :columns="innerColumns1"
                    :data-source="[{name:'entity_id',value:record.entity_id},{name:'type',value:record.type}]"
                    :showHeader="false"
                    :pagination="false"
                    size="small"
                    >
                    </a-table>
                    <a-table
                    :columns="innerColumns1"
                    :data-source="[{name:'data'}]"
                    :showHeader="false"
                    :pagination="false"
                    size="small"
                    >
                    <template #expandedRowRender>
                        <a-table
                        :columns="innerColumns"
                        :data-source="record.data"
                        :pagination="{ pageSize: 5}"
                        show-less-items
                        size="small"
                        >
                        </a-table>
                    </template>
                    </a-table>
                </template>
            </a-table>
        </div>
      </a-layout-content>
    </a-layout>
</template>
<script>
import { defineComponent, reactive,inject,ref} from 'vue';
import axios from 'axios';

export default defineComponent({
  components: {
  },
  setup() {
    const formState = reactive({});
    let content = '';
    let i= 0, length=0;
    const percent = ref(0);
    const model_name = inject('model_name')

    axios({
        url:"http://172.20.137.106:33004/test/getAnnotationData",
        method:'post',
        data:{
            model_name:model_name.value
        }
    }).then(res=>{
        console.log(res.data.data);
        formState.raw_text = res.data.data[0].raw_text;
        formState.entity_to_annotate = res.data.data[0].entity_to_annotate;
        formState.auto_increment_id = res.data.data[0].auto_increment_id;
        content = res.data.data;
        length = res.data.data.length;
        percent.value = 0/length*100;
    })

    const columns1 = [
    {
      title: "entity",
      dataIndex: "entity",
      key: "entity",
    },
  ];
    const dataSource1 = ref([]);
    
    const innerColumns = [
        {
        title: "predicate",
        dataIndex: "predicate",
        key: "predicate",
        },
        {
        title: "object",
        dataIndex: "object",
        key: "object",
        ellipsis: true,
        },
    ];
    const innerColumns1 = [
        {
        title: "name",
        dataIndex: "name",
        key: "name",
        },
        {
        title: "value",
        dataIndex: "value",
        key: "value",
        },
    ];
    const innerData1 = ref([]);
    const data=ref();
    const onSearch = (value)=>{
        axios({
            method:'post',
            url:'http://172.20.137.106:33004/test/searchKnowledgeBaseByAlias',
            data:{
                user_input:value
            }
        }).then(res=>{
            // content.value = res.data.data
            data.value = res.data.data;
            let i=0;
            for(i=0;i<data.value.length;i++){
              data.value[i].key=i;
            //   data.value[i].entity_id="["+data.value[i].entity_id+"]"
              data.value[i].type="["+data.value[i].type+"]"
            }
            dataSource1.value = data.value;
        })
    }
    const onFinish = value =>{
        axios({
            method:'post',
            url:'http://172.20.137.106:33004/test/dataAnnotation',
            data:{
                model_name:model_name.value,
                data:[
                    {
                        auto_increment_id:formState.auto_increment_id,
                        entity:formState.entity,
                        entity_id:formState.entity_id
                    }
                ]
            }
        })
        i=i+1;
        formState.raw_text = content[i].raw_text;
        formState.entity_to_annotate = content[i].entity_to_annotate;
        formState.auto_increment_id = content[i].auto_increment_id;
        formState.entity = '';
        formState.entity_id = '';
        percent.value = (i)/length*100;
    }

    return {
        formState,
        onSearch,
        dataSource1,
        columns1,
        innerColumns,
        innerData1,
        innerColumns1,
        content,
        i,length,
        onFinish,
        percent
    };
  }
});
</script>