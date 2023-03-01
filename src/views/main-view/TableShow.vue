<template>
  <!-- 表单 -->
  <FormModal ref="childForm"/>
  <!-- 表格 -->
  <div style="width: 100%;padding-left:10%;padding-right:10%">
    <div style="margin-bottom: 16px">
      <a-button :disabled="!hasSelected" :loading="loading" @click="start">
        提交
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `选中了 ${selectedRowKeys.length} 条记录` }}
        </template>
      </span>
    </div>
    <a-table
      class="ant-table-striped"
      :columns="columns"
      :data-source="dataSource"
      :pagination="{ pageSize: 5}"
      show-less-items
      @resizeColumn="handleResizeColumn"
      :row-selection="rowSelection"
      :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
    > 
    <template
      #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
    >
      <div style="padding: 8px">
        <a-input
          ref="searchInput"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          <template #icon><SearchOutlined /></template>
          Search
        </a-button>
        <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
          Reset
        </a-button>
      </div>
    </template>
    <template #customFilterIcon="{ filtered }">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
      <template #bodyCell="{ text,record , column }">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              :key="i"
              class="highlight"
            >
              {{ fragment }}
            </mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-if="column.dataIndex === 'operation'">
          <a @click="onEdit(record)"><edit-outlined />&nbsp;&nbsp;</a>
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="realDelete(record.self_defining_id)"
          >
            <a><delete-outlined /></a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
  <!-- <div style="width: 35%; padding-left:10px;float:left">
    <SearchEntity/>
  </div> -->
</template>
<script>
import { EditOutlined, DeleteOutlined ,SearchOutlined  } from '@ant-design/icons-vue'
import { computed, defineComponent, ref, inject, provide ,toRefs,reactive} from 'vue'
import axios from 'axios'
import FormModal from './FormModal.vue'
import SearchEntity from './SearchEntity.vue'
import { useDatasetStore } from '@/stores/dataset'
import { message ,Table  } from 'ant-design-vue'

export default defineComponent({
  components: {
    EditOutlined,
    DeleteOutlined,
    FormModal,
    SearchEntity,
    SearchOutlined ,
  },
  setup () {
    // 表格
    const state = reactive({
      searchText: '',
      searchedColumn: '',
      selectedRowKeys: [],
      // Check here to configure the default column
      loading: false,
    });
    const searchInput = ref();
    const columns = ref([
      {
        title: '序号',
        dataIndex: 'self_defining_id',
        key: 'self_defining_id',
        resizable: true,
        width: '80px'
      },
      {
        title: '段编号',
        dataIndex: 'segment_id',
        resizable: true,
        width: '80px'
      },
      {
        title: '偏移',
        dataIndex: 'offset',
        resizable: true,
        width: '60px'
      },
      {
        title: '实体',
        dataIndex: 'entity',
        resizable: true,
        width: '100px',
        customFilterDropdown: true,
        onFilter: (value, record) => record.entity.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 100);
          }
        },
      },
      {
        title: '实体编号',
        dataIndex: 'subject_id',
        resizable: true,
        width: '90px'
      },
      {
        title: '文本',
        dataIndex: 'text',
        ellipsis: true,
        resizable: true,
        customFilterDropdown: true,
        onFilter: (value, record) => record.entity.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 100);
          }
        },
      }, 
      {
        title: '描述信息',
        dataIndex: 'data',
        width: '90px',
        ellipsis: true,
        resizable: true,
        customFilterDropdown: true,
        onFilter: (value, record) => record.entity.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 100);
          }
        },
      }, 
      {
        title: '操作',
        dataIndex: 'operation',
        resizable: true,
        width: '70px'
      }
    ])
    const dataSource = ref([])
    const dataDetName = ref('')
    const knowledgeBaseName = ref('')
    dataSource.value = inject('dataSource1').value
    dataDetName.value = inject('dataDetName')
    const changeCurrent =inject('changeCurrent')
    knowledgeBaseName.value = inject('knowledgeBaseName')
    const dataset = useDatasetStore()

    changeCurrent(1)
    // 数据库中删除
    const realDelete = self_defining_id => {
      axios({
        method: 'post',
        url: 'http://172.20.137.106:33004/test/deleteSingleTrainingData',
        data: {
          auto_increment_id: self_defining_id
        }
      })
      onDelete(self_defining_id)
    }
    // 前端删除
    const onDelete = self_defining_id => {
      dataSource.value = dataSource.value.filter(item => item.self_defining_id !== self_defining_id)
    }
    // 更新table
    const updateData = (FormState, OldId) => {
      Object.assign(dataSource.value.filter(item => OldId === item.self_defining_id)[0], FormState)
    }
    // 更新id
    const updateId = (NewId, OldId) => {
      dataSource.value.filter(item => OldId === item.self_defining_id)[0].self_defining_id = NewId
    }
    const hasSelected = computed(() => state.selectedRowKeys.length > 0);
    const start = () => {
      state.loading = true;
      var temp =reactive([])
      var templist = state.selectedRowKeys
      templist.push('-1')
      temp= dataSource.value.filter(item => item.self_defining_id in templist)
      console.log(temp);
      axios({
        method: 'post',
        url: 'http://172.20.137.106:33004/test/saveTrainingSet',
        data: {
          trainingData: temp,
          trainingSetName: dataset.datasetName,
          knowledgeBaseName: dataset.knowledgeBaseName
        }

      }).then(value => {
        // console.log(value)
        if (value.data.error_code === 200) {
          message.success('提交成功')
          var j = 0
          for(var i=value.data.data.min;i<=value.data.data.max;i++){
            updateId(i,state.selectedRowKeys[j])
            j++
          }
        } else {
          message.error('提交失败')
        }
        state.loading = false ;
        state.selectedRowKeys = [];
      })
    };
    const onSelectChange = selectedRowKeys => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      state.selectedRowKeys = selectedRowKeys;
    };
    const rowSelection = computed(() => {
      return {
        selectedRowKeys: state.selectedRowKeys,
        onChange: onSelectChange,
        hideDefaultSelections: true,
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE, {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            selectedRowKeys.value = newSelectedRowKeys;
          },
        }, {
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            selectedRowKeys.value = newSelectedRowKeys;
          },
        }],
      };
    });
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      state.searchText = selectedKeys[0];
      state.searchedColumn = dataIndex;
    };
    const handleReset = clearFilters => {
      clearFilters({
        confirm: true,
      });
      state.searchText = '';
    };

    // 表单
    const childForm = ref()
    // 弹出表单
    const onEdit = record => {
      childForm.value.initForm(record)
      childForm.value.showModal()
    }

    

    provide('dataDetName', {
      updateData,
      dataDetName,
      knowledgeBaseName
    })

    return {
      columns,
      dataSource,
      onDelete,
      onEdit,
      realDelete,
      updateData,
      childForm,
      dataDetName,
      handleResizeColumn: (w, col) => {
        col.width = w
      },
      handleSearch,
      handleReset,
      searchInput,
      ...toRefs(state),
      hasSelected,
      start,
      onSelectChange,
      updateId,
      rowSelection,
    }
  }

})
</script>
  <style scoped>
  .ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
  }
  .highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
  </style>
