<template>
  <!-- 表格 -->
  <div style="width: 80%; float:left">
    <a-table 
      :columns="columns" 
      :data-source="dataSource" 
      bordered 
      :pagination="{ pageSize: 5}"
      show-less-items
      :loading="loading"
    >
    </a-table>
  </div>
</template>
<script>
    import { defineComponent, ref, inject, provide } from 'vue';
    import axios from 'axios';
  
    export default defineComponent({
      components: {
      },
      setup() {
        //表格  
        let columns = ref([
        {
          title: '序号',
          dataIndex: '_id',
          key: '_id',
        },
        {
          title: '段编号',
          dataIndex: 'segment_id',
        },
        {
          title: '文本',
          dataIndex: 'text',
          ellipsis: true,
        },
        {
          title: '实体',
          dataIndex: 'entity',
        },
        {
          title: '知识库实体',
          dataIndex: 'subject',
        },
        {
          title: '描述信息',
          dataIndex: 'entity_description',
          ellipsis: true,
        },
        ]);
        let dataSource = ref([]);
        let dataDetName =ref('');
        const loading = ref(true)
        dataDetName = inject('dataDetName')
        
        axios({
            method: 'post',
            url: 'http://172.20.137.106:33004/test/getTrainingSet',
            data:{
              trainingSetName: dataDetName.value,
            } 
        }).then(res=>{
          dataSource.value=res.data.data;
          var i=1;
          dataSource.value.forEach(data => {
            data._id = i;
            i++;
          });
          console.log(dataSource.value);
          loading.value = false
        })

        return {
          columns,
          dataSource,
          loading
        };
      },
      
    });
</script>
<style>
  
</style>
    