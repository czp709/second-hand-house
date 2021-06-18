<template>
  <div class="Sidebar">
    <div class="btns">
        <a href="javascript:;" class="file">选择文件
            <input type="file" name="" id="" ref="upload" accept=".xls, .xlsx" class="outputlist_upload">
        </a>
        <el-button type="primary" icon="el-icon-document" class="daochu" @click="download">导入模板下载</el-button>
        <el-button type="primary" icon="el-icon-document" class="daochu" @click="exportExcel">导出</el-button>
    </div>
    <el-table :data="tableData2" id="out-table">
        <el-table-column align="center" header-align="center" label="图片" >
            <template slot-scope="{row,$index}">
           <img :src="row.photoInfo" v-if="row.photoInfo" width="40" height="40" @click="open($index )" class="head_pic"/>
            </template>
        </el-table-column>

        <el-table-column align="center" header-align="center" label="发布者" >
            <template slot-scope="{row}">
            <span>{{row.FormData.name}}</span>
            </template>
        </el-table-column>

        <el-table-column align="center" header-align="center" label="手机号" >
            <template slot-scope="{row}">
            <span>{{row.FormData.phonenumber}}</span>
            </template>
        </el-table-column>

        <el-table-column align="center" header-align="center" label="房型">
            <template slot-scope="{row}">
            <span>{{row.FormData.houseStyle}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="地理信息">
            <template slot-scope="{row}">
            <span>{{row.FormData.incity}},{{row.FormData.location}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="价格">
            <template slot-scope="{row}">
            <span>{{row.FormData.totalPrice}}</span>
            </template>
        </el-table-column>

        <el-table-column align="center" header-align="center" label="详细介绍">
            <template slot-scope="{row}">
            <span>{{row.FormData.Tags}}</span>
            </template>
        </el-table-column>

        <el-table-column header-align="center" align="center" width="200" label="看房时间">
            <template slot-scope="{row}">
            <span>{{row.FormData.LookUpStyle}}</span>
            </template>
        </el-table-column>

        <el-table-column header-align="center" align="center" width="200" label="上架状态">
            <template slot-scope="{row}">
            <span v-if="row.publish">已上架</span>
            <span v-else="row.publish">未上架</span>
            </template>
        </el-table-column>

        <el-table-column header-align="center" align="center" width="200" label="修改状态">
            <template slot-scope="{row,$index}">
            <el-button v-if="row.publish" @click="updata($index)">下架</el-button>
            <el-button v-else="row.publish" @click="updata($index)">上架</el-button>
            </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import cloudbase from "@cloudbase/js-sdk";

const app = cloudbase.init({
  env: "zufang-4gej561k8ccf648d"
});
const db = app.database();
const collection = db.collection("Entrust");
    export default {
        name: "DruidMonitor",
        // 其他组件依赖
        components: {},
        //数据模版
        data() {
            return {
                //控制修改显示隐藏
                showEdit: [],
                img:[],
                drawer: false,
                showName: [], //显示姓名
                showAge: [], //显示年龄
                name: "",
                age: "",
                tableData: [],
                tableData2:[]
            };
        },
         methods: {
            exportExcel() {
				/* generate workbook object from table */
				let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'));
				/* get binary string as output */
				let wbout = XLSX.write(wb, {
					bookType: 'xlsx',
					bookSST: true,
					type: 'array'
				});
				try {
					FileSaver.saveAs(new Blob([wbout], {
						type: 'application/octet-stream'
					}), '房屋信息.xlsx');
				} catch (e) {
					if (typeof console !== 'undefined')
						console.log(e, wbout)
				}
				return wbout
			},
            open(e) {
                var that = this
                this.$alert('<img src='+that.tableData2[e].photoInfo+' width="200" class="head_pic"/>', '图片预览', {
                    dangerouslyUseHTMLString: true
                });
            },
            download(){
                cloudbase
                .downloadFile({
                    fileID: "cloud://zufang-4gej561k8ccf648d.7a75-zufang-4gej561k8ccf648d-1301079356/xlsx/example.xlsx"
                })
                .then((res) => {});
            },
            getimg(){
                var that = this
                var img = []
                for(let i=0;i<this.tableData.length;i++){
                    if(that.tableData[i].photoInfo){
                        if(that.tableData[i].photoInfo[0].includes('cloud://zufang-4gej561k8ccf648d')){
                            img.push(that.tableData[i].photoInfo[0])
                        }
                    }
                }
                app
                .getTempFileURL({
                    fileList: img
                })
                .then((res) => {
                    for(let i=0;i<that.tableData.length;i++){
                        if(that.tableData[i].photoInfo){
                            that.tableData[i].photoInfo = res.fileList[i].download_url
                            img[i] = res.fileList[i].download_url
                        }
                        else{
                            continue
                        }
                    }
                    console.log(that.tableData)
                    that.tableData2 = that.tableData
                    that.img = img
                });
            },
            readExcel(e) {
                //表格导入
                var that = this;
                const files = e.target.files;
                if (files.length <= 0) {
                    //如果没有文件名
                    return false;
                } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
                    this.$Message.error("上传格式不正确，请上传xls或者xlsx格式");
                    return false;
                }

                const fileReader = new FileReader();
                fileReader.onload = ev => {
                    try {
                    const data = ev.target.result;
                    const workbook = XLSX.read(data, {
                        type: "binary"
                    });
                    const wsname = workbook.SheetNames[0]; //取第一张表
                    const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
                    console.log(ws,111111111);
                    that.outputs = []; //清空接收数据
                    //编辑数据
                    for (var i = 0; i < ws.length; i++) {
                        console.log(333333333333333)
                        var data_sheet = {'photoInfo':ws[i]['房屋照片(图片链接)'],'EntrustType':'rentout','HouseStyleSelected':ws[i]['房间类型(n室n厅n卫生)']}
                        var FormData ={'detailLocation':ws[i]['详细地址'],'location':ws[i]['所在小区'],'furniture':ws[i]['装修配置'],'area':ws[i]['房子面积'],'totalPrice':ws[i]['总价'],'averagePrice':ws[i]['均价'],'name':ws[i]['委托人姓名'],'phonenumber':ws[i]['委托人电话'],'Tags':ws[i]['房子标签(空调热水)'],'HouseType':ws[i]['出租类型'],'roomStyle':ws[i]['房间类型(n室n厅n卫生)'],'houseStyle':ws[i]['居室类型'],'LookUpStyle':ws[i]['看房方式'],'Invoice':ws[i]['契税发票时间是否满两年'],'Signing':ws[i]['网签是否满三年'],'incity':ws[i]['所在城市']}
                        data_sheet.FormData = FormData
                        console.log(data_sheet,2222222)
                        that.addhouse(data_sheet)
                        that.outputs.push(sheetData);
                        
                    }
                    this.$refs.upload.value = "";
                    } catch (e) {
                    return false;
                    }
                };
                fileReader.readAsBinaryString(files[0]);
            },
            addhouse(data_sheet){
                console.log(4444444)
                collection
                .add(data_sheet)
                .then(res=>{
                    console.log('添加成功',res)
                })  
            },
            updata(e){
                console.log(this.tableData[e]._id)
                var that = this;
                if(this.tableData[e].publish){
                    that.tableData2[e].publish = false
                    collection
                        .doc(that.tableData[e]._id)
                        .update({
                            publish: false
                        })
                        .then(function (res) {});
                }
                else{
                    that.tableData2[e].publish = true                   
                    collection
                        .doc(that.tableData[e]._id)
                        .update({
                            publish: true
                        })
                        .then(function (res) {});
                }

            }
        },
        //组件属性
        props: {},
        // 计算属性
        // 组件监听
        watch: {},
        // 组件方法
        // 生命周期函数：组件创建前
        beforeCreate: function () {
        },
        // 生命周期函数：组件创建后
        created: function () {
            let acc = localStorage.getItem('web_token')
            var that = this;
            const query="db.collection(\"Entrust\").limit(342).get()";
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
                console.log(that.tableData)
                that.getimg()
            })
        },
        // 生命周期函数：组件挂载完毕前
        beforeMount: function () {
        },
        // 生命周期函数：组件挂载完毕后
        mounted() {
            this.$refs.upload.addEventListener("change", e => {
            //绑定监听表格导入事件
            this.readExcel(e);
            });
        },
        // 生命周期函数：组件更新前
        beforeUpdate: function () {
        },
        // 生命周期函数：组件更新后
        updated: function () {
        },
        // 生命周期函数：组件销毁前
        beforeDestroy: function () {
        },
        // 生命周期函数：组件销毁后
        destroyed: function () {
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
.file {
    position: relative;
    display: inline-block;
    background: rgb(64,152,255);
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: white;
    text-decoration: none;
    text-indent: 0;
    height: 31px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.file input {
    position: absolute;
    font-size: 90px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    background-color: rgb(64,152,255);
    color: #004974;
    text-decoration: none;
}
.btns{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
}
</style>
