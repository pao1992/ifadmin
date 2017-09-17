<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 商品</el-breadcrumb-item>
                <el-breadcrumb-item>商品分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="tip">
            <p>请上传400*300的图片</p>
        </div>
        <ul class="el-upload-list el-upload-list--picture-card">
            <draggable v-model="banner.data">
                <li class="el-upload-list__item is-success" v-for="item in banner.data"
                    @click="currentBannerItem = item">
                    <img :src="imgBaseUrl+item.url" class="el-upload-list__item-thumbnail">
                    <label class="el-upload-list__item-status-label">
                        <i class="el-icon-upload-success el-icon-check"></i>
                    </label>
                    <i class="el-icon-close"></i>
                    <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-delete">
                            <i class="el-icon-delete2" @click="itemRemove(item)"></i>
                        </span>
                    </span>
                </li>
            </draggable>
        </ul>
        <div>
            <el-upload
                class="avatar-uploader"
                :action="baseUrl+'/banner'"
                :show-file-list="false"
                :on-success="bannerUploadSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="false">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <div style="margin-top: 50px;width: 250px;">
            <el-input placeholder="请输入链接到的商品ID" v-model="currentBannerItem.link">
                <template slot="prepend">商品id</template>
            </el-input>
        </div>
        <div style="text-align: right;padding-top: 50px">
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import {imgBaseUrl, baseUrl} from '../../config/env'
    import draggable from 'vuedraggable'
    import {banner} from '../../service/getData'
    export default {
        components: {
            draggable
        },
        data(){
            return {
                banner: {
                    data: []
                },
                baseUrl,
                imgBaseUrl,
                currentBannerItem: {}
            }
        },
        mounted(){
            this.initData()
        },
        methods: {
            async initData(){
                this.banner = await banner('GET', '1')
                console.log(this.banner)
            },
            async onSubmit(){
               let res =  await banner('PUT','1',this.banner)
                this.$message('保存成功！')
            },
            bannerUploadSuccess(res, file){
                let item = {
                    link: '',
                    url: res.thumb
                }
                if(!this.banner.data){
                    this.banner.data = []
                }
                this.banner.data.push(item)
            },
            itemRemove(item){
                let cofirm = window.confirm('是否删除？')
                if (!cofirm) return false
                let index = $.inArray(item, this.banner.data)
                if (index > -1) this.banner.data.splice(index, 1)
            },
            handleAvatarSuccess(res, file) {
//                this.form.cover_url = URL.createObjectURL(file.raw);
                this.form.logo_url = res.thumb
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
    .el-upload--picture-card {
        width: 200px;
        height: 150px;
    }

    .el-upload-list--picture-card .el-upload-list__item {
        width: 200px;
        height: 150px;
    }

    .tip {
        margin: 10px 0px 20px 0px;
    }

    .tip > p {
        color: #8492a6;
    }

</style>
<style scoped>

    .avatar-uploader-icon {
        line-height: 178px;
    }



</style>

