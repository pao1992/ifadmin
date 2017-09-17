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
                <el-form-item label="分类名称">
                    <el-input v-model="form.category_name" name="category_name"></el-input>
                </el-form-item>
                <el-form-item label="英文名称">
                    <el-input v-model="form.category_name_en" name="category_name_en"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-col :span="6">
                        <el-input v-model="form.sort" placeholder="填写数字"></el-input>
                    </el-col>

                </el-form-item>
                <el-form-item label="描述">

                    <el-input v-model="form.info" placeholder="文字描述" name="sort"></el-input>

                </el-form-item>
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
import {category,createOrUpdateCategory} from 'src/service/getData'
    export default {
        components: {},
        data(){
            return {
                type:'',
                form: {},
                props:{
                    value: 'category_id',
                    children: 'children',
                    label:'category_name'
                },
                btnMsg:{
                    'add':'提交',
                    'edit':'保存'
                },
                categorys:[]
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
            this.getCategory()


        },
        methods: {
            async initData(){

            },
            async getCategory(){
                let temp = await category('GET',this.$route.params.id)
                this.form = temp
            },
            async onSubmit(){
                let res = {}
                let form = $.extend({},true,this.form)
                if(this.type == 'add'){
                    //新增
                    res = await category('POST','',form)

                }else if(this.type == 'edit'){
                    res = await category('PUT',this.$route.params.id,form)
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
