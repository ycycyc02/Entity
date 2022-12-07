<template>
    <!-- 表格 -->
  <div style="width: 80%; float:left">
    <a-input-search
          placeholder="请输入搜索实体名称"
          class="header_input"
          @search="onSearch"
          style="width: 200px; margin-bottom: 20px;"          
        />
    <a-table 
      :columns="columns" 
      :data-source="dataSource" 
      bordered 
      :pagination="{ pageSize: 5}"
      show-less-items
    >
    </a-table>
  </div>
</template>
<script>
//   import { EditOutlined , DeleteOutlined} from '@ant-design/icons-vue';
  import { defineComponent, ref ,inject } from 'vue';
  import axios from 'axios';

  export default defineComponent({
    components: {
    },
    setup() {
      //表格  
      let columns = ref([
        {
          title: 'Subject',
          dataIndex: 'Subject',
          key: 'Subject',
        }
      ]);
      let dataSource = ref([]);
      let dataDetName =ref('');
      dataDetName = inject('dataDetName')
      
    // 搜索
    const onSearch = (searchValue) => {
        axios({
            method: 'post',
            url: 'http://172.20.137.106:33004/test/searchKnowledgeBaseByName',
            data:{
            entityName: searchValue,
            dataDetName:dataDetName.value
            } 
        }).then(value => {
            console.log(value);
        })
        }

      return{
        dataSource,
        columns,
        dataDetName,
        onSearch
      }
    }
  });
</script>