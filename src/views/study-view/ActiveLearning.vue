<template>
  <a-layout-header style="background: #fff; margin-top:1px; padding-left: 24px ">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>主动学习</a-breadcrumb-item>
      <a-breadcrumb-item>数据标注</a-breadcrumb-item>
    </a-breadcrumb>
  </a-layout-header>
  <a-layout-content
    :style="{ margin: '16px 16px', padding: '24px', background: '#fff', minHeight: '335px' }"
  >
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
        <div :style="{width:'55%', padding: '24px', background: '#fff', minHeight: '540px',float:'left'}">

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
                  label="选择链接知识库"
                  name="知识库名称"
                >
                  <a-select
                    v-model:value="formState.kbBaseName"
                    show-search
                    :loading="loading"
                    placeholder="请选择知识库"
                    :options="options"
                    :filter-option="filterOption"
                  ></a-select>
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
        <div :style="{width:'45%', padding: '24px', background: '#fff', minHeight: '500px',float:'right'}">
            <!-- {{content}} -->
            <a-table
                :columns="columns1"
                :data-source="dataSource1"
                class="components-table-demo-nested"
                :loading="tableloading"
            >
                <template #expandedRowRender="{ record }">
                    <a-table
                    :columns="innerColumns1"
                    :data-source="[{name:'id',value:record.subject_id},{name:'alias',value:record.alias},{name:'type',value:record.type}]"
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
</template>
<script>
import { defineComponent, reactive, inject, ref } from 'vue'
import axios from 'axios'
import { message } from 'ant-design-vue'

export default defineComponent({
  components: {
  },
  setup () {
    const formState = reactive({})
    let content = ''
    let i = 0; let length = 0
    const percent = ref(0)
    const modelName = inject('modelName')

    axios({
      url: 'http://172.20.137.106:33004/test/getAnnotationData',
      method: 'post',
      data: {
        model_name: modelName.value
      }
    }).then(res => {
      console.log(res.data.data)
      formState.raw_text = res.data.data[0].raw_text
      formState.entity_to_annotate = res.data.data[0].entity_to_annotate
      formState.auto_increment_id = res.data.data[0].auto_increment_id
      content = res.data.data
      length = res.data.data.length
      percent.value = 0 / length * 100
    })

    const columns1 = [
      {
        title: 'entity',
        dataIndex: 'subject',
        key: 'subject'
      },      
    ]
    const dataSource1 = ref([])

    const innerColumns = [
      {
        title: 'predicate',
        dataIndex: 'predicate',
        key: 'predicate',
        width:'50%',
      },
      {
        title: 'object',
        dataIndex: 'object',
        key: 'object',
        ellipsis: true
      }
    ]
    const innerColumns1 = [
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width:'15%',
      },
      {
        title: 'value',
        dataIndex: 'value',
        key: 'value'
      }
    ]
    const innerData1 = ref([])
    const data = ref()
    const tableloading = ref(false)
    const onSearch = (value) => {
      tableloading.value = true
      axios({
        method: 'post',
        url: 'http://172.20.137.106:33004/test/searchKnowledgeBaseByName',
        data: {
          entityName: value,
          knowledgeBaseName: formState.kbBaseName
        }
      }).then(res => {
        if(res.data.error_code === 200){
          // content.value = res.data.data
          data.value = res.data.data
          let i = 0
          for (i = 0; i < data.value.length; i++) {
            data.value[i].key = i
            data.value[i].alias="["+data.value[i].alias+"]"
            data.value[i].type = '[' + data.value[i].type + ']'
            // data.value[i].subject = data.value[i].subject + ' '+ data.value[i].subject_id
          }
          dataSource1.value = data.value
          tableloading.value =false
        }
        else{
          message.error('发生了一些错误，请检查输入是否正确！')
        }
      })
    }
    const onFinish = value => {
      axios({
        method: 'post',
        url: 'http://172.20.137.106:33004/test/dataAnnotation',
        data: {
          modelName: modelName.value,
          data: [
            {
              auto_increment_id: formState.auto_increment_id,
              entity: formState.entity,
              entity_id: formState.entity_id
            }
          ]
        }
      })
      i = i + 1
      formState.raw_text = content[i].raw_text
      formState.entity_to_annotate = content[i].entity_to_annotate
      formState.auto_increment_id = content[i].auto_increment_id
      formState.entity = ''
      formState.entity_id = ''
      percent.value = (i) / length * 100
    }

    // 知识库选择
    const loading = ref(true)
    const options = ref([])
    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }; 
    const setData = () => {
      axios('http://172.20.137.106:33004/test/getAllKnowledgeBases')
      .then(value=>{
        var temp = []
        temp=value.data.data.name_list;
        let i=0;
        formState.kbBaseName = temp[i][0];
        for(i=0;i<temp.length;i++){
          console.log(temp[0]);
          options.value.push({value:temp[i][0],label:temp[i][0]})
        }
        loading.value = false
      })
    }
    setData()


    return {
      formState,
      onSearch,
      dataSource1,
      columns1,
      innerColumns,
      innerData1,
      innerColumns1,
      tableloading,
      content,
      i,
      length,
      onFinish,
      percent,
      options,
      loading,
      filterOption,
      setData,
    }
  }
})
</script>
