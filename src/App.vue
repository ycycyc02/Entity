<template>
  <div>
    <MainPage/>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import MainPage from "./components/MainPage.vue";

export default defineComponent({
  name: 'App',
  components: {
    MainPage
  }
})
</script>

<style>

</style>
