<template>
  <!-- 主页面 -->
  <a-layout style="{min-height:100vh}">
    <!-- 侧边栏部分 -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible :trigger="null" style="box-shadow: 2px 0 6px rgba(0,21,41,.35);" >
      <div class="logo" >
        <img src="../assets/logo.svg" style="margin-left: 18px;"/>
        Ant Design Vue
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" theme="dark" mode="inline">
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
          <a-menu-item key="3">
            <router-link  to="/kbmanage">知识库管理</router-link>
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
          <a-menu-item key="4">
            <router-link  to="/entity">训练模型</router-link>
          </a-menu-item>
          <a-menu-item key="5">
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
          <a-menu-item key="6">
            <router-link  to="/getdata">数据获取</router-link>
          </a-menu-item>
          <a-menu-item key="7">
            <router-link  to="/study">数据标注</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="8">
          <router-link  to="/result">
            <file-outlined />
            <span>
              结果展示
            </span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <!-- 顶部 -->
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 ;line-height: 40px;height: 40px;">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <!-- content部分 -->
          <router-view></router-view>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import { PieChartOutlined, DesktopOutlined, UserOutlined, FileOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref, provide } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    FileOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
  },
  setup () {
    const router = useRouter()
    router.push('/data')

    const selectedKeys = ref(['1'])
    const changeKeys = (key) => {
      selectedKeys.value = key
    }
    provide('changeKeys', changeKeys)

    const modelName = ref('')
    provide('modelName', modelName)

    return {
      collapsed: ref(false),
      selectedKeys,
      openKeys: ref(['sub1'])
    }
  }
})
</script>
<style>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height:24px;
  /* background: rgba(255, 255, 255, 0.3); */
  color:#ffffff;
  font-size: 16px;
  margin: 10px;
  /* font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif; */
  /* font-weight: 600; */
  vertical-align: middle;
  overflow:hidden;
}
.logo img {
  height:24px;
}
.site-layout .site-layout-background {
  background: #fff;
}
</style>
