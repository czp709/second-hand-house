<template>
  <div class="Sidebar">
    <div class="searchWord">
      <el-input v-model="search" @input="searchName" style="display: inline-block;"placeholder="请输入搜索内容">
      </el-input>
      <button class="search_btn" @click="searchName">搜索</button>
    </div>
    <el-table :data="tableData">
        <el-table-column align="center" header-align="center" label="姓名" >
            <template slot-scope="{row,$index}">
            <span v-if="!showEdit[$index]">{{row.name}}</span>
            </template>
        </el-table-column>

        <el-table-column align="center" header-align="center" label="昵称" >
            <template slot-scope="{row,$index}">
            <span v-if="!showEdit[$index]">{{row.nickName}}</span>
            </template>
        </el-table-column>

        <el-table-column align="center" header-align="center" label="手机号" >
            <template slot-scope="{row,$index}">
            <span v-if="!showEdit[$index]">{{row.phone}}</span>
            </template>
        </el-table-column>

    </el-table>
  </div>
</template>
<script>
export default {
  data () {
        return {
            //控制修改显示隐藏
            showEdit: [],
            showName: [], //显示姓名
            showAge: [], //显示年龄
            search:'',
            name: "",
            age: "",
            tableData: [],
            data_copy:[]
        };
  },
  methods:{
      tab (index){
          this.num = index
      },
     menuShow (index) {
         this.menuIndex = index
         console.log(this.menuIndex)
     },
    searchName(){
        let that = this
        var dataSecond = []
        that.tableData = that.data_copy
        if(that.search){
            for(let i = 0;i<this.tableData.length;i++){
                if(that.tableData[i].name.includes(that.search)||that.tableData[i].nickName.includes(that.search)){
                    dataSecond.push(that.tableData[i])
                }
            }
            this.tableData = dataSecond
        }
        console.log(this.tableData)
    },
  },
    mounted () {
        let acc = localStorage.getItem('web_token')
        var that = this;
        const query="db.collection(\"UserList\").where({'userType':'中介'}).get()";
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
            that.data_copy = that.tableData
            console.log(that.tableData)
        })
    },
}
</script>
<style scoped>
.searchWord{
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
}
.search_btn{
    width: 100px;
    background-color: rgb(64,152,255);
}
</style>
