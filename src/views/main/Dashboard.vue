<template>
  <div class="box">
    <div class="top_change">
      <div class="change">
        <el-select v-model="prov" style="width:130px;margin-right: 5px;">
          <el-option v-for="option in arr" :value="option.name" :key="option.name">
            {{ option.name }}
          </el-option>
        </el-select>
        <el-select v-model="city" style="width:130px;margin-right: 5px;">
          <el-option v-for="option in cityArr" :value="option.name" :key="option.name">
            {{ option.name }}
          </el-option>
        </el-select>
        <button class="bttn" @click="addcity()">开通新城市</button>
      </div>
    </div>
    <el-table :data="database" border class="data_table">
      <el-table-column prop="province" label="省份">
      </el-table-column>
      <el-table-column prop="city" label="城市">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import area from '../../assets/city'
import cloudbase from "@cloudbase/js-sdk";
const app = cloudbase.init({
  env: "zufang-4gej561k8ccf648d"
});

export default {
  data() {
    return {
      arr: area.arrAll,
      provs:"想查询的省份",
      prov: '省份',
      city: '城市',
      district: '区域',
      cityArr: [],
      province:[],
      districtArr: [],
      flag: false,
      tableData: [],
      database:[]
    }
  },
  methods: {
    findprovince(){
        let acc = localStorage.getItem('web_token')
        var that = this;
        const query="db.collection(\"citys\").limit(342).get()";
        const querydata={
            env:'zufang-4gej561k8ccf648d',
            query:query
        };
        this.axios({
            url:'/lol/databasequery?access_token='+acc,
            method:'post',
            data:querydata
            }
            
        ).then(res=>{
            for(let i = 0;i<res.data.data.length;i++){
                let data = JSON.parse(res.data.data[i])
                that.tableData.push(data)
            }
            for(let k = 0;k<that.province.length;k++){
              let data = {}
              data['province']=that.province[k]
              let citys = []
              for(let l = 0;l<that.tableData.length;l++){
                if(that.province[k]==that.tableData[l].province){
                  citys.push(that.tableData[l].city+'，')
                }
              }
              data['city'] = citys
              if(data['city'].length!=0){
                that.database.push(data)
              }
            }
        })
    },
    addcity2(){
      var isClick = true;
      var that = this;
      let acc = localStorage.getItem('web_token')
      const query="db.collection('citys').add({data:{province:'"+that.prov+"',city:'"+that.city+"'}})";
      const querydata=JSON.stringify({
          'env':'zufang-4gej561k8ccf648d',
          'query':query
      });
      if(isClick == true){
        isClick = false
        this.axios({
            url:'/lol/databaseadd?access_token='+acc,
            method:'post',
            Headers:{'Content-Type': 'application/json'},
            data:querydata,
            json:true
            }
            
        ).then(res=>{
            alert("添加成功")
        })  
        setTimeout(function() {
          isClick = true;
        }, 3000);
      }
        
    },
    addcity(){
      var that = this;
      let acc = localStorage.getItem('web_token')
      const query1="db.collection(\"citys\").where({'city':'"+that.city+"'}).get()";
      const querydata1={
          env:'zufang-4gej561k8ccf648d',
          query:query1
      };
      this.axios({
          url:'/lol/databasequery?access_token='+acc,
          method:'post',
          data:querydata1
          }
          
      ).then(res=>{
        if(res.data.data.length!=0){
          alert("该城市已存在")
        }
        else{
          that.addcity2()
        }
      })


    },
    updateCity: function() {
      for (var i in this.arr) {
        var obj = this.arr[i]
        if (obj.name) {
          if (obj.name == this.prov) {
            this.cityArr = obj.sub
            break
          }
        }
      }
      this.city = this.cityArr[1].name
    },

    updateDistrict: function() {
      for (var i in this.cityArr) {
        var obj = this.cityArr[i]
        if (obj.name == this.city) {
          this.districtArr = obj.sub
          break
        }
      }
      if (
        this.districtArr &&
        this.districtArr.length > 0 &&
        this.districtArr[1].name
      ) {
        this.district = this.districtArr[1].name
      } else {
        this.district = ''
      }
    },
  },
  beforeMount() {
    this.updateCity()
    this.updateDistrict()
  },
  created:function(){
    let that = this
    for(let i =1;i<this.arr.length-2;i++){
      this.province.push(this.arr[i].name)
    }
    this.findprovince()
  },
  watch: {
    prov: function() {
      this.updateCity()
      this.updateDistrict()
    },
    city: function() {
      this.updateDistrict()
    },
  },
}
</script>
<style scoped>
.box {
  background-color: #fff;
}
.change {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
}
.top_change {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.bttn {
  height: 40px;
  width: 100px;
  margin-left: 5px;
  background-color: rgb(64, 152, 255);
  outline: none;
  border: none;
}
.tittle {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: small;
  height: 39px;
  width: 100px;
  background-color: white;
  border-radius: 5px;
  margin-right: 5px;
}
.already {
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: x-large;
  margin-top: 50px;
}


.city {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12.5%;
  font-size: large;
  margin-top: 5px;
}
.proName {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  font-size: x-large;
  margin-top: 40px;
  margin-bottom: 5px;
}

</style>
