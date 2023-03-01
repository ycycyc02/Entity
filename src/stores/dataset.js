import { ref, computed ,reactive} from "vue";
import { defineStore } from "pinia";
import axios from 'axios';

export const useDatasetStore = defineStore('dataset', {
    state: () => ({
        datasetName: '',
        knowledgeBaseName: '',
        negativeProportion : 1 ,
        dataSource : [],
        entity_num_statistic: {
            train : 0,
            dev: 0, 
            test: 0,
        },
        text_length_statistic: {
            "1-5": 5000,
            "6-10": 2500,
            "10+": 2500
        },
        record: reactive({
            self_defining_id: '',
            segment_id: '',
            entity: '',
            subject_id: '',
            text: '',
            data:''
          }),
        training_set_num :0 ,
        training_set_pos_num :0 ,
        training_set_neg_num :0 ,
        dev_set_num :0 ,
        dev_set_pos_num :0 ,
        dev_set_neg_num :0 ,
        test_set_num :0 ,
        test_set_pos_num :0 ,
        test_set_neg_num :0 ,
        trainingSetPartition:0,
        validationSetPartition:0,
        testSetPartition:0,
        auto_increment_id:0,
    }),
    actions: {
      setDatasetName(dataset_name) {
        this.datasetName = dataset_name
      },
      setKnowledgeBaseName( knowledgeBaseName) {
        this.knowledgeBaseName = knowledgeBaseName
      },
      setNegativeProportion(negativeProportion ){
        this.negativeProportion = negativeProportion
      },
      setDataSource(dataSource ){
        this.dataSource = dataSource
      },
      addNegativeSample(){
        axios({
            method: 'post',
            url: 'http://172.20.137.106:33004/test/addNegativeSample',
            data: {
                datasetName: this.datasetName,
                negativeProportion: this.negativeProportion,
                knowledgeBaseName: this.knowledgeBaseName,
          }
        }).then(res=>{
            if(res.data.error_code === 200){
                this.training_set_num = res.data.data.training_set_num
                this.training_set_pos_num = res.data.data.training_set_pos_num
                this.training_set_neg_num = res.data.data.training_set_neg_num
                this.dev_set_num = res.data.data.dev_set_num
                this.dev_set_pos_num = res.data.data.dev_set_pos_num
                this.dev_set_neg_num = res.data.data.dev_set_neg_num
                this.test_set_num = res.data.data.test_set_num
                this.test_set_pos_num = res.data.data.test_set_pos_num
                this.test_set_neg_num = res.data.data.test_set_neg_num
              }
        })
      },
      setPartition(train,dev,test){
        this.trainingSetPartition = train
        this.validationSetPartition = dev
        this.testSetPartition =test
      },
      setAutoIncrementId(id){
        this.auto_increment_id = id
      },
      setRecord(formState){
        this.record = formState
      }
    },
  })