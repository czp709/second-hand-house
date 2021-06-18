<template>
  <div class="Sidebar">
    <el-table :data="tableData">
        <el-table-column align="center" header-align="center" label="昵称" >
            <template slot-scope="{row}">
            <span>{{row.nickname}}</span>
            </template>
        </el-table-column>

        <el-table-column align="center" header-align="center" label="手机号" >
            <template slot-scope="{row}">
            <span>{{row.phone}}</span>
            </template>
        </el-table-column>

        <el-table-column align="center" header-align="center" label="反馈内容" >
            <template slot-scope="{row}">
            <span>{{row.content}}</span>
            </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" width="200" label="回复内容">
            <template slot-scope="{row}">
            <span v-if="row.reply">{{row.reply}}</span>
            <span v-else>未回复</span>
            </template>
        </el-table-column>

        <el-table-column header-align="center" align="center" width="200" label="修改状态">
            <template slot-scope="{row,$index}">
            <el-button @click="reply($index)">回复</el-button>
            </template>
        </el-table-column>
    </el-table>
  </div>
</template>
<script>
import cloudbase from "@cloudbase/js-sdk";

const app = cloudbase.init({
  env: "zufang-4gej561k8ccf648d"
});
const db = app.database();
const collection = db.collection("Sugestion");
export default {
  data () {
        return {
            search:"",
            tableData: [],
            data_copy:[]
        };
  },
  methods:{
      reply(e) {
        var that= this
        this.$prompt('请输入回复内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
            that.setreply(that.tableData[e]._id,value)
            that.tableData[e].reply = value
          this.$message({
            type: 'success',
            message: '你的回复是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      setreply(id,value){
        collection
            .doc(id)
            .update({
                reply: value
            })
            .then(function (res) {console.log(res)});
      }
  },

    mounted () {
        let acc = localStorage.getItem('web_token')
        var that = this;
        const query="db.collection(\"Sugestion\").limit(100).get()";
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
            console.log(res)
            for(let i = 0;i<res.data.data.length;i++){
                let data = JSON.parse(res.data.data[i])
                that.tableData.push(data)
            }
            that.data_copy = that.tableData
        })
    },
    watch:{

    }
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
