<template>
  <!-- 主页面 -->
  <a-layout style="{min-height:100vh}">
    <!-- 侧边栏部分 -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <pie-chart-outlined />
              <span>
                数据导入
              </span>
            </span>
          </template>
          <a-menu-item key="1">
            <router-link  to="/">数据集上传</router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link  to="/manage">数据集管理</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <desktop-outlined />
              <span>
                实体链接
              </span>
            </span>
          </template>
          <a-menu-item key="3">
            <router-link  to="/entity">训练模型</router-link>
          </a-menu-item>
          <a-menu-item key="4">
            <router-link  to="/linking">进行链接</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <template #title>
            <span>
              <user-outlined />
              <span>主动学习</span>
            </span>
          </template>
          <a-menu-item key="5">
            <router-link  to="/getdata">数据获取</router-link>
          </a-menu-item>
          <a-menu-item key="6">
            <router-link  to="/study">数据标注</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="7">
          <router-link  to="/result">
            <file-outlined />
            <span>
              结果展示
            </span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <!-- content部分 -->
    <router-view></router-view>
  </a-layout>
</template>
<script>
import { PieChartOutlined, DesktopOutlined, UserOutlined, FileOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref ,provide,reactive} from 'vue';
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    FileOutlined,
  },
  setup() {
    const router = useRouter();
    router.push('/data')
    
    const selectedKeys = ref(['1'])
    const changeKeys = (key)=>{
      selectedKeys.value=key
    }
    provide('changeKeys',changeKeys)

    const model_name = ref('')
    provide('model_name',model_name)

    return {
      collapsed: ref(false),
      selectedKeys,
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
