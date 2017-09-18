<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 商品</el-breadcrumb-item>
                <el-breadcrumb-item>商品分类</el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <el-col :span="12">
            <el-form ref="form" :model="form" label-width="80px">
                <!--<el-input v-model="form.category_id" name="category_name"type="hidden"></el-input>-->
                <el-form-item label="次卡名称">
                    <el-input v-model="form.title" name="title"></el-input>
                </el-form-item>
                <el-form-item label="次数">
                    <el-col :span="6">
                        <el-input v-model="form.times" placeholder="请填写数字"></el-input>
                    </el-col>

                </el-form-item>
                <el-form-item label="价格">
                    <el-col :span="6">
                        <el-input v-model="form.price" placeholder="请填写数字"></el-input>
                    </el-col>

                </el-form-item>
                <el-form-item label="描述">

                    <el-input v-model="form.desc" placeholder="文字描述" name="desc"></el-input>

                </el-form-item>
                    <el-input v-model="form.type" placeholder="" name="type" type="hidden"></el-input>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">{{btnMsg[type]}}</el-button>
                    <el-button>重置</el-button>
                </el-form-item>

            </el-form>


        </el-col>




    </div>
</template>
<style>

    .el-input{
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
</style>
<script>
import {card} from 'src/service/getData'
    export default {
        components: {},
        data(){
            return {
                type:'',
                form: {
                    type:1
                },
                btnMsg:{
                    'add':'提交',
                    'edit':'保存'
                },
            }
        },
        mounted(){
            //无论是添加还是编辑都要执行的代码
            this.initData()
            //如果url的params为空，则为编辑
            this.type = $.isEmptyObject(this.$route.params)?'add':'edit'
            if(this.type == 'add'){
                return
            }
            //判断是类型是添加还是编辑，如果是编辑，继续执行下面代码
            this.getCard()


        },
        methods: {
            async initData(){

            },
            async getCard(){
                let temp = await card('GET',this.$route.params.id)
                this.form = temp
            },
            async onSubmit(){
                let res = {}
                let form = $.extend({},true,this.form)
                if(this.type == 'add'){
                    //新增
                    res = await card('POST','',form)

                }else if(this.type == 'edit'){
                    res = await card('PUT',this.$route.params.id,form)
                }
                if(res.code =='201'){
                    this.$router.go(-1)
                }
            },
            handleChange(){
                console.log()
            }
        }
    }
</script>

<style scoped>

</style>
