<template>
    <div class="login-wrap">
        <div class="ms-title">用户登录</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-checkbox v-model="checked"
                             class="remember">记住账号</el-checkbox>

                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>

            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data: function(){
            return {
                checked:false,
                ruleForm: {
                    username: '',
                    password: '',
                    verifycode:''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    verifycode: [
                        { required:false, message: '请输入验证码', trigger:'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                let that = this
                this.axios.get('/ls/token?grant_type=client_credential&appid=wxeb73fda05f2dbb76&secret=0ad5881577fd01fcd166dd8dd9311f5c')
                    .then(res=>{
                        localStorage.setItem('web_token',res.data.access_token)
                        that.database(res.data.access_token,formName)
                    })
            },
            database(acc,formName){
                var that = this;
                const query="db.collection(\"rootuser\").where({'id':'"+String(this.ruleForm.username)+"'}).get()";
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
                    let data = JSON.parse(res.data.data[0])
                    this.$refs[formName].validate((valid) => {
                        if (data.password == that.ruleForm.password) {
                            if(that.checked == true){
                                localStorage.setItem('password',that.ruleForm.password)
                            }
                            else{
                                if(localStorage.getItem('password')){
                                    localStorage.removeItem('password')
                                }
                            }
                            localStorage.setItem('ms_username',this.ruleForm.username);
                            this.$router.push('/Dashboard');
                        } else {
                            alert('账号或密码错误！')
                            return false;
                        }
                    });

                })
                
            },
            adddata(acc){
                var that = this;
                const query="db.collection(\"users\").add({data:{city:\"郑州\",age:\"38\"}})";
                const querydata=JSON.stringify({
                    'env':'python-5gl7sf0kcabe4449',
                    'query':query
                });
                this.axios({
                    url:'/lol/databaseadd?access_token='+acc,
                    method:'post',
                    Headers:{'Content-Type': 'application/json'},
                    data:querydata,
                    json:true
                    }
                    
                ).then(res=>{
                    console.log('添加成功',res)
                }) 

            }
        },
        created:function(){
            let flag = localStorage.getItem('password')
            if(flag){
                this.checked = true
                this.ruleForm.username = localStorage.getItem('ms_username')
                this.ruleForm.password = localStorage.getItem('password')
            }
        }
    }
</script>
<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        /*background:cornflowerblue;*/
        background:steelblue;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:250px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
        border:1px solid #ccc;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
    .remember{
        margin:3px 0 10px 0;
    }
</style>
