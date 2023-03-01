<template>
  <div>
    <div style="background:#fff;width: 100%;float:left;padding:-24">
      <a-tabs v-model:activeKey="activeKey" type="card" centered>
        <a-tab-pane key="1" tab="数据集概览" >
          <div style="width:50% ;float:left;height:300px;">
            <a-row justify="center" align="middle" style="height:100px;">
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
            <a-row justify="center" align="middle" style="height:100px;">
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
            <a-row align="middle" style="height:100px;">
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
            <!-- <a-row align="middle" >
              <a-col :span="8">
                <a-statistic title="训练集实体数量" :value="train" />
              </a-col>
              <a-col :span="8">
                <a-statistic title="验证集实体数量" :value="dev" />
              </a-col>
              <a-col :span="8">
                <a-statistic title="测试集实体数量" :value="test" />
              </a-col>
            </a-row> -->
          </div>
          <div style="width:50% ;float:right" >
            <v-chart class="chart" :option="option" style="height:300px;width:100%;" autoresize />
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="数据构成">
          <div style="background:#fff;width: 100%;float:left;border-width: 2px;box-shadow: #f5f5f5;">
            <!-- <a-card
              style="border-width: 2px;box-shadow: #f5f5f5;"
            > -->
            <v-chart class="chart" :option="option3" style="width:50%;height:300px;float:left;" autoresize />
            <v-chart class="chart" :option="option2" style="width:50%;height:300px;float:left;" autoresize />
            <!-- </a-card> -->
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="数据集详情">
          <DataShow />
        </a-tab-pane>
        <template #rightExtra>
          <button 
            @click="changePage"
            style="border:none;background-color:transparent;"
          ><close-outlined /></button>
        </template>
      </a-tabs>
  </div>

  </div>
</template>
<script setup>
import { reactive, ref,inject } from 'vue'
import VChart from 'vue-echarts'
import * as echarts from 'echarts';
import axios from 'axios';
import { defineExpose } from 'vue';
import {CloseOutlined} from '@ant-design/icons-vue';
import { useDatasetStore } from '@/stores/dataset';
import DataShow from './DataShow.vue'


// const changeCurrent =inject('changeCurrent')
// const datasetName =inject('dataDetName')
// changeCurrent(3);
const activeKey = ref('1')

const dataset = useDatasetStore()

const option = reactive({
  title: {
    text: '数据集分析',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },

  legend: {
    top: '8%',
    left:'4%',
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
    data: ['正样本', '负样本', '总数量']
  },
  series: [
    {
      name: '训练集',
      type: 'bar',
      data: [18203, 23489, 29034],
      label: {
        show: true,
        position: 'right'
      },
      // stack: 'Total'
    },
    {
      name: '验证集',
      type: 'bar',
      data: [19325, 23438, 31000],
      label: {
        show: true,
        position: 'right'
      },
      // stack: 'Total'
    },
    {
      name: '测试集',
      type: 'bar',
      data: [18203, 23489, 29034],
      label: {
        show: true,
        position: 'right'
      },
      // stack: 'Total'
    },
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
      // name: 'Access From',
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
const option3 = reactive({
  title: {
    text: '文本长度统计',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },

  legend: {
    top: '8%',
    left:'4%',
    show:false
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
  yAxis: {
    type: 'value'
  },
  xAxis: {
    type: 'category',
    data: ['0-5', '5-10', '10+']
  },
  series: [
    {
      name: '数据',
      type: 'bar',
      data: [1,2 ,3 ],
      label: {
        // show: true,
        position: 'right'
      },
      itemStyle:{
        color:function(params){
          var colorlist = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
          return colorlist[params.dataIndex];
        }
      }
    }
  ]
})
const changeOptionData = (number, data) => {
  if (number === 1) {
    option.series[0].data = data[0]
    option.series[1].data = data[1]
    option.series[2].data = data[2]
  } else if (number === 2) {
    for(var i=0;i<option2.series[0].data.length;i++){
      option2.series[0].data[i].value = data[i]
    }
    // option2.series[1].data = data2
  }
}

const training_set_num = ref(null); const training_set_pos_num = ref(null); const training_set_neg_num = ref(null)
const dev_set_num = ref(null); const dev_set_pos_num = ref(null); const dev_set_neg_num = ref(null)
const test_set_num = ref(null); const test_set_pos_num = ref(null); const test_set_neg_num = ref(null)
const train =ref(null);const dev = ref(null);const test = ref(null)
const getDatasetDetails = (datasetName)=>{
  axios({
    method: 'post',
    url: 'http://172.20.137.106:33004/test/getDatasetDetails',
    data: {
      datasetName : datasetName
    }
  }).then(res => {
    if(res.data.error_code === 200){
      // console.log(res.data.data);
      training_set_num.value = res.data.data.training_set_num
      training_set_pos_num.value = res.data.data.training_set_pos_num
      training_set_neg_num.value = res.data.data.training_set_neg_num
      dev_set_num.value = res.data.data.dev_set_num
      dev_set_pos_num.value = res.data.data.dev_set_pos_num
      dev_set_neg_num.value = res.data.data.dev_set_neg_num
      test_set_num.value = res.data.data.test_set_num
      test_set_pos_num.value = res.data.data.test_set_pos_num
      test_set_neg_num.value = res.data.data.test_set_neg_num
      // console.log(res.data.data.entity_num_statistic);
      if(res.data.data.entity_num_statistic.length != 0){
        train.value = res.data.data.entity_num_statistic[0].train
        dev.value = res.data.data.entity_num_statistic[0].dev
        test.value = res.data.data.entity_num_statistic[0].test
      }else{
        train.value = 0;
        dev.value = 0;
        test.value = 0;
      }
      if(res.data.data.text_length_statistic.length != 0){
        res.data.data.text_length_statistic[0].forEach(item => {
          console.log('text_length_statistic不为空');
        });
      }
      changeOptionData(2,[train.value,dev.value,test.value])
      changeOptionData(1,[    
      [training_set_pos_num.value,dev_set_pos_num.value,test_set_pos_num.value],
      [training_set_neg_num.value,dev_set_neg_num.value,test_set_neg_num.value],
      [training_set_num.value,dev_set_num.value,test_set_num.value]
    ])
    }
  })
}
getDatasetDetails(dataset.datasetName)
const changePage =inject('changePage')


defineExpose({
  changeOptionData,
  option,
  option2,
  getDatasetDetails
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
.ant-layout-content{
  padding:0 !important;
}
</style>
