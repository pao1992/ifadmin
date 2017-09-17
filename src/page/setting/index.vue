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
                    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                        <el-form-item label="备案号" prop="record_number">
                            <el-input v-model="form.record_number" name="category_name"></el-input>
                        </el-form-item>
                        <el-form-item label="APP名称" prop="app_name">
                            <el-input v-model="form.app_name" name="category_name_en"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人" prop="linkman">
                            <el-col :span="6">
                                <el-input v-model="form.linkman"></el-input>
                            </el-col>

                        </el-form-item>
                        <el-form-item label="联系电话" prop="tel">
                            <el-col :span="12">
                                <el-input v-model="form.tel" type="number"></el-input>
                            </el-col>

                        </el-form-item>
                        <el-form-item label="商家地址" prop="address">
                            <el-input v-model="form.address" placeholder=""></el-input>

                        </el-form-item>
                        <el-form-item label="描述" prop="desc">

                            <el-input v-model="form.desc" placeholder="文字描述" name="sort"></el-input>

                        </el-form-item>
                        <el-form-item label="LOGO">
                            <el-upload
                                class="avatar-uploader"
                                :action="baseUrl+'/system/logo'"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="form.logo_url" :src="imgBaseUrl+'/'+form.logo_url" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">保存</el-button>
                        </el-form-item>


                    </el-form>


                </el-col>
            </el-tab-pane>
            <el-tab-pane label="daiding" name="swiper">

            </el-tab-pane>
        </el-tabs>


    </div>
</template>

<script type="text/ecmascript-6">
    import {imgBaseUrl, baseUrl} from '../../config/env'
    import {system} from '../../service/getData'
    export default {
        data(){
            return {
                active: 'info',
                form: {},
                imageUrl: '',
                baseUrl,
                imgBaseUrl,
                rules: {
                    record_number: [
                        {required: true, message: '请输入域名备案号', trigger: 'blur'}
                    ],
                    app_name: [
                        {required: true, message: '请输入app名称', trigger: 'blur'},
                        {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
                    ],
                    linkman: [
                        {required: true, message: '请输入管理员名称', trigger: 'blur'},
                    ],
                    tel: [
                        {required: true, message: '请输入联系方式', trigger: 'blur'},
                        {min: 8, max: 11, message: '长度在 8 到 11 个字符', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '请输入商家地址', trigger: 'blur'},
                        {min: 10, max: 30, message: '长度在 10 到 30 个字符', trigger: 'blur'}
                    ],
                    desc: [
                        {required: true, message: '请输入业务描述', trigger: 'blur'},
                        {min: 10, max: 100, message: '长度在 10 到 100 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted(){
            this.initData()
        },
        methods: {
            async initData(){
                this.form = await system('GET', '')
            },
            async onSubmit(){
                console.log(JSON.stringify(this.form))
                let res = await system('PUT','',this.form)
                if(res.code == '201'){
                    this.$message('更新成功！')
                }
            },
            handleAvatarSuccess(res, file) {
//                this.form.cover_url = URL.createObjectURL(file.raw);
                this.form.logo_url = res
            },
            beforeAvatarUpload(file) {
                let type = ['image/jpeg','image/png','image/gif']
                let isJPG = false
                type.forEach((e)=>{
                    file.type === e && (isJPG = true)
                })
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
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 178px;
        height: 178px;
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
