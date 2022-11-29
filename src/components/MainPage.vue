<template>
  <!-- 表单 -->
  <FormModal ref="childForm"/>
  <!-- 主页面 -->
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <desktop-outlined />
          <span>Option 2</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>User</span>
            </span>
          </template>
          <a-menu-item key="3">Tom</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>Team</span>
            </span>
          </template>
          <a-menu-item key="6">Team 1</a-menu-item>
          <a-menu-item key="8">Team 2</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <file-outlined />
          <span>File</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div style="width: 600px; margin: 0 auto; padding-top: 20px;">
          <a-steps :current="current" size="small" >
            <a-step title="上传excel" />
            <a-step title="修改内容" />
            <a-step title="知识库查询" />
            <a-step title="数据集修改" />
          </a-steps>
        </div>
      </a-layout-header>
      <a-layout-content>
        <!-- upload and table -->
        <div :style="{ padding: '24px', background: '#fff', minHeight: '510px' }">
            <UploadAndTable ref="childTable"/>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, provide } from 'vue';
import UploadAndTable from './UploadAndTable.vue';
import FormModal from './FormModal.vue';

export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    UploadAndTable,
    FormModal
  },
  setup() {
    // 表单
    const childForm = ref();
    const childTable = ref();
    const current = ref(0);

    // 步骤条更新
    const changeCurrent = (value) => {
      current.value = value;
    }

    // 表单
    const changeFormState = (record) => {
      childForm.value.initForm(record);
      childForm.value.showModal();
    }
    const delteData = (_id) =>{
      childTable.value.onDelete(_id);
    }

    provide('key',{
      changeFormState ,
      changeCurrent ,
      delteData
    })

    return {
      collapsed: ref(false),
      selectedKeys: ref(['1']),
      current,
      childForm,
      childTable
    };
  }
});
</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
