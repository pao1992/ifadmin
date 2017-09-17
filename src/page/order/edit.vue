<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 商品</el-breadcrumb-item>
                <el-breadcrumb-item>商品分类</el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <el-tabs v-model="active" type="card" @tab-click="">
            <el-tab-pane label="基本信息" name="info">
                <el-col :span="12">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="商品名称">
                            <el-input v-model="form.product_name" name="category_name"></el-input>
                        </el-form-item>
                        <el-form-item label="英文名称">
                            <el-input v-model="form.product_name_en" name="category_name_en"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <el-col :span="11">
                                <el-select v-model="form.region" placeholder="请选择上级分类">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="2">&nbsp;</el-col>
                            <el-col :span="11">
                                <el-select v-model="form.region" placeholder="请选择商品分类">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="一口价">
                            <el-col :span="6">
                                <el-input v-model="form.shop_price" placeholder="填写数字"></el-input>
                            </el-col>

                        </el-form-item>
                        <el-form-item label="描述">

                            <el-input v-model="form.desc" placeholder="文字描述" name="sort"></el-input>

                        </el-form-item>
                        <el-form-item label="主图">
                            <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">立即创建</el-button>
                            <el-button>重置</el-button>
                        </el-form-item>


                    </el-form>


                </el-col>
            </el-tab-pane>
            <el-tab-pane label="商品规格" name="spec">
                <prod-spec :id="$route.params.id"></prod-spec>
            </el-tab-pane>
        </el-tabs>




    </div>
</template>
<style>

    .el-input{
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width:178px;
        height:178px;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
<script>
    import {products} from 'src/service/tempdata/product';
    import {default as prodSpec} from './prodSpec';
    export default {
        components: {prodSpec},
        data(){
            return {
                active:'info',
                form:{},
                imageUrl: ''
            }
        },
        mounted(){
           // console.log(this.$route.params.id)
            let id = this.$route.params.id
            products.forEach((e,i,arr)=>{
                if(e.product_id == id){
                this.form = e
                return
                }
            })

        },
        computed:{
        },
        methods: {
            onSubmit(){

            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style scoped>

</style>
