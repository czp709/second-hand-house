<template>
  <div>
    <div class="top1 file-input-trigger">
        <input type="file" name="image" value="src"  id="image_upload" class="getImgUrl_file file-input-trigger" @change="preview($event)">
        <div :style="{backgroundImage:'url('+img_url+')'}" class="imgs" id="imgs" v-show="img_url!=''"></div>
    </div>
    <div class="top">
        <input class="tittle" value="" @change="tittle($event)" placeholder="请输入文章标题">
        <button class="save" @click="saveQuillEditorValue">发布文章</button>
    </div>
    <el-card style="height: 550px;">
      <quill-editor v-model="content" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
        <!-- 自定义toolar -->
        <div id="toolbar" slot="toolbar">
          <!-- Add a bold button -->
          <button class="ql-bold" title="加粗">Bold</button>
          <button class="ql-italic" title="斜体">Italic</button>
          <button class="ql-underline" title="下划线">underline</button>
          <button class="ql-strike" title="删除线">strike</button>
          <button class="ql-blockquote" title="引用"></button>
          <button class="ql-code-block" title="代码"></button>
          <button class="ql-header" value="1" title="标题1"></button>
          <button class="ql-header" value="2" title="标题2"></button>
          <!--Add list -->
          <button class="ql-list" value="ordered" title="有序列表"></button>
          <button class="ql-list" value="bullet" title="无序列表"></button>
          <!-- Add font size dropdown -->
          <select class="ql-header" title="段落格式">
            <option selected>段落</option>
            <option value="1">标题1</option>
            <option value="2">标题2</option>
            <option value="3">标题3</option>
            <option value="4">标题4</option>
            <option value="5">标题5</option>
            <option value="6">标题6</option>
          </select>
          <select class="ql-size" title="字体大小">
            <option value="10px">10px</option>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px" selected>16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
          </select>
          <select class="ql-font" title="字体">
            <option value="SimSun">宋体</option>
            <option value="SimHei">黑体</option>
            <option value="Microsoft-YaHei">微软雅黑</option>
            <option value="KaiTi">楷体</option>
            <option value="FangSong">仿宋</option>
            <option value="Arial">Arial</option>
          </select>
          <!-- Add subscript and superscript buttons -->
          <select class="ql-color" value="color" title="字体颜色"></select>
          <select class="ql-background" value="background" title="背景颜色"></select>
          <select class="ql-align" value="align" title="对齐"></select>
          <button class="ql-clean" title="还原"></button>
          <!-- You can also add your own -->
        </div>
      </quill-editor>
    </el-card>
  </div>
</template>

<script>
  import {
    Quill,
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  //引入font.css 
  import '../../../../assets/font.css'
  import cloudbase from "@cloudbase/js-sdk";

  const app = cloudbase.init({
    env: "zufang-4gej561k8ccf648d"
  });
  // 自定义字体大小
  let Size = Quill.import('attributors/style/size')
  Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px']
  Quill.register(Size, true)

  // 自定义字体类型
  var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif',
    '宋体', '黑体'
  ]
  var Font = Quill.import('formats/font')
  Font.whitelist = fonts
  Quill.register(Font, true)

  export default {
    name: 'FuncFormsEdit',
    components: {
      quillEditor
    },
    data() {
      return {
        w:'',
        h:'',
        tittles:'',
        pic_url:'',
        content:'',
        img_url:'',
        content: null,
        src:'',
        editorOption: {
          placeholder: "请输入",
          theme: "snow", // or 'bubble' 
          modules: {
            toolbar: {
              container: '#toolbar'
            }
          }
        }
      }
    },
    methods:{
        saveQuillEditorValue(){
          var that = this;
          var isClick = true;
          let acc = localStorage.getItem('web_token')
          const query="db.collection('News').add({data:{tittle:'"+that.tittles+"',content:'"+that.content+"',img:'"+that.pic_url+"'}})";
          const querydata=JSON.stringify({
              'env':'zufang-4gej561k8ccf648d',
              'query':query
          });
          if(isClick){
            isClick = false
            this.axios({
                url:'/lol/databaseadd?access_token='+acc,
                method:'post',
                Headers:{'Content-Type': 'application/json'},
                data:querydata,
                json:true
                }
                
            ).then(res=>{
                console.log('添加成功',res)
                alert("发布成功")
                that.tittles = ''
                that.img_url = ''
                that.content = ''
            }) 
          }
        },
        tittle(event){
          console.log(event.target.value)
          this.tittles = event.target.value
        },
        preview(event){
          let that =this
          var img = document.getElementById('image_upload')
          var imgFile = new FileReader();
          imgFile.readAsDataURL(img.files[0]);
          imgFile.onload = function () {
              var imgData = this.result; //base64数据  
              that.img_url = imgData
          }
          app
            .uploadFile({
              cloudPath: "test-admin.jpeg",
              filePath: document.getElementById("image_upload").files[0],
              onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              }
            })
            .then((result) => {
              console.log(result.fileID)
              that.pic_url = result.fileID
            });
        },
    },
  }
</script>

<style scoped>
.top{
    display: flex;
    flex-direction: row;
    width: 99.8%;
}
.top1{
  margin-bottom: 10px;
}
.imgs{
  width: 356px;
  height: 200px;
  background-repeat:no-repeat;
  background-size:100%;
}
/*美化自定义按钮*/
.file-input-trigger {
    padding: 2px 5px;
    border-radius: 5px;
    border: 1px solid #3888C7;
    background-color: #3888C7;
    outline: none;
    color: #fff;
    cursor: pointer;
}
.tittle{
    width: 90%;
    outline: none;
    height: 50px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: none;
    padding-left: 10px;
}

.save{
    border-radius: 5px;
    border: none;
    width: 10%;
    height: 50px;
    background-color: rgb(64,152,255);
}
</style>
