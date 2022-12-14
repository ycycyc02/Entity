<template>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0; height:44px">
      </a-layout-header>
      <a-layout-content style="background: #fff; padding: 24px; height:510px">
        <!-- 表格 -->
            <a-table 
            :columns="columns" 
            :data-source="dataSource" 
            bordered 
            :pagination="{ pageSize: 5}"
            show-less-items
            >
            <template #bodyCell="{ record , column }">
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
      </a-layout-content>
    </a-layout>
</template>
<script>
import { defineComponent} from 'vue';

export default defineComponent({
  components: {
  },
  setup() {
    const columns=[
        {
            
        }
    ]

    return {
    };
  }
});
</script>