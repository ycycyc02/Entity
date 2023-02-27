<template>
  <div>
    <div style="background:#f5f5f5;width: 90%;margin-left:5%;float:left;border-width: 2px;box-shadow: #f5f5f5;">
    <a-card
      style="border-width: 2px;box-shadow: #f5f5f5;"
      title="指标"
      :tab-list="tabList"
      :active-tab-key="key"
      @tabChange="key => onTabChange(key, 'key')"
    >
      <a-tabs v-model:activeKey="activeKey" type="card" centered>
        <a-tab-pane key="1" tab="数据集概览" size="small">
          <div style="width:50% ;float:left;">
            <a-row justify="center" align="middle" style="height:100px">
            <a-col :span="8">
              <a-statistic title="训练集数量" :value="training_set_num" />
            </a-col>
            <a-col :span="8">
              <a-statistic title="训练集正样本" :value="training_set_pos_num"/>
            </a-col>
            <a-col :span="8">
              <a-statistic title="训练集负样本" :value="training_set_neg_num"/>
            </a-col>
            </a-row>
            <a-row justify="center" align="middle" style="height:100px">
              <a-col :span="8">
                <a-statistic title="验证集数量" :value="dev_set_num"/>
              </a-col>
              <a-col :span="8">
                <a-statistic title="验证集正样本" :value="dev_set_pos_num"/>
              </a-col>
              <a-col :span="8">
                <a-statistic title="验证集负样本" :value="dev_set_neg_num"/>
              </a-col>
            </a-row>
            <a-row align="middle" style="height:100px">
              <a-col :span="8">
                <a-statistic title="测试集数量" :value="test_set_num" />
              </a-col>
              <a-col :span="8">
                <a-statistic title="测试集正样本" :value="test_set_pos_num" />
              </a-col>
              <a-col :span="8">
                <a-statistic title="测试集负样本" :value="test_set_neg_num" />
              </a-col>
            </a-row>
          </div>
          <div style="width:50% ;float:left" >
            <v-chart class="chart" :option="option" style="height:300px;float:left;"/>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="模型指标概览">Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane key="3" tab="性能图">Content of Tab Pane 3</a-tab-pane>
      </a-tabs>
      <template #extra>
        <button 
         @click="changePage"
         style="border:none;background-color:transparent;"
        ><close-outlined /></button>
      </template>
    </a-card>
  </div>
  <div style="background:#f5f5f5;width: 90%;margin-left:5%;float:left;border-width: 2px;box-shadow: #f5f5f5;">
    <a-card
      style="border-width: 2px;box-shadow: #f5f5f5;"
    >
    <v-chart class="chart" :option="option" style="width:50%;height:300px;float:left;"/>
    <v-chart class="chart" :option="option2" style="width:50%;height:300px;float:left;"/>
    </a-card>
  </div>
  </div>
</template>
<script setup>
import { reactive, ref,inject } from 'vue'
import VChart from 'vue-echarts'
import * as echarts from 'echarts';
import {CloseOutlined} from '@ant-design/icons-vue';

const changeCurrent =inject('changeCurrent')
changeCurrent(3);

const option = reactive({
  title: {
    text: '导入实体的前后对比',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },

  legend: {
    top: '8%'
  },

  grid: {
    left: '2%',
    right: '2%',
    bottom: '2%',
    containLabel: true
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    },
    top: '7%'
  },
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
  },
  series: [
    {
      name: '导入前',
      type: 'bar',
      data: [18203, 23489, 29034, 104970, 131744, 630230],
      label: {
        // show: true,
        position: 'right'
      },
      stack: 'Total'
    },
    {
      name: '导入后',
      type: 'bar',
      data: [19325, 23438, 31000, 121594, 134141, 681807],
      label: {
        show: true,
        position: 'right'
      },
      stack: 'Total'
    }
  ]
})
const option2 = reactive({
  title: {
    text: '数据构成',
    left: 'center'
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }

  },
  grid: {
    left: '2%',
    right: '2%',
    bottom: '2%',
    containLabel: true
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '8%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['30%', '65%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false
      },
      data: [
        { value: 1048, name: '训练集' },
        { value: 735, name: '验证集' },
        { value: 580, name: '测试集' }
      ]
    }
  ]
})
const changeOptionData = (number, data1, data2) => {
  if (number === 1) {
    option.series[0].data = data1
    option.series[1].data = data2
  } else if (number === 2) {
    option2.series[0].data = data1
    option2.series[1].data = data2
  }
}

const training_set_num = ref(null); const training_set_pos_num = ref(null); const training_set_neg_num = ref(null)
const dev_set_num = ref(null); const dev_set_pos_num = ref(null); const dev_set_neg_num = ref(null)
const test_set_num = ref(null); const test_set_pos_num = ref(null); const test_set_neg_num = ref(null)

const setDataset = (list) => {
  training_set_num.value = list[0]
  training_set_pos_num.value = list[1]
  training_set_neg_num.value = list[2]
  dev_set_num.value = list[3]
  dev_set_pos_num.value = list[4]
  dev_set_neg_num.value = list[5]
  test_set_num.value = list[6]
  test_set_pos_num.value = list[7]
  test_set_neg_num.value = list[8]
}

const changePage =inject('changePage')


defineExpose({
  changeOptionData,
  setDataset,
  option,
  option2
})
</script>
<style scoped>
.ant-statistic {
    text-align: center;
    box-sizing: border-box;
    margin: 0;
}
body {
  text-align: center;
}
</style>
