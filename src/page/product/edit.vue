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
                    <!--<el-form ref="form" :model="form" label-width="80px">-->
                        <!--<el-form-item label="商品名称">-->
                            <!--<el-input v-model="form.product_name" name="category_name"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="英文名称">-->
                            <!--<el-input v-model="form.product_name_en" name="category_name_en"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="上级分类">-->
                            <!--<el-cascader-->
                                <!--:options="options"-->
                                <!--:props="props"-->
                                <!--v-model="selectedOptions"-->
                                <!--@change="handleChange">-->
                            <!--</el-cascader>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="一口价">-->
                            <!--<el-col :span="6">-->
                                <!--<el-input v-model="form.shop_price" placeholder="填写数字"></el-input>-->
                            <!--</el-col>-->

                        <!--</el-form-item>-->
                        <!--<el-form-item label="描述">-->

                            <!--<el-input v-model="form.desc" placeholder="文字描述" name="sort"></el-input>-->

                        <!--</el-form-item>-->
                        <!--<el-form-item label="人数限制">-->

                            <!--<el-checkbox v-model="numSet">设置</el-checkbox>-->
                            <!--<div  class="numbox" v-if="numSet">-->
                                <!--<el-input class="num" v-model="form.num[0]" placeholder="最少" name="numberLimit" type="number"></el-input>-->
                                <!--<el-input class="num" v-model="form.num[1]" placeholder="默认" name="numberLimit" type="number"></el-input>-->
                                <!--<el-input class="num" v-model="form.num[2]" placeholder="最多" name="numberLimit" type="number"></el-input>-->
                            <!--</div>-->

                        <!--</el-form-item>-->
                        <!--<el-form-item label="主图">-->
                            <!--<el-upload-->
                                <!--class="avatar-uploader"-->
                                <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                                <!--:show-file-list="false"-->
                                <!--:on-success="handleAvatarSuccess"-->
                                <!--:before-upload="beforeAvatarUpload">-->
                                <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
                                <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                            <!--</el-upload>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item>-->
                            <!--<el-button type="primary" @click="onSubmit">保存</el-button>-->
                            <!--<el-button>重置</el-button>-->
                        <!--</el-form-item>-->


                    <!--</el-form>-->
                    <el-form ref="form" :rules="rules" :model="form" label-width="80px" action="api.com/api/v2/product">
                        <el-form-item label="商品名称" prop="product_name">
                            <el-input v-model="form.product_name" name="category_name_en"></el-input>
                        </el-form-item>
                        <el-form-item label="英文名称" prop="product_name_en">
                            <el-input v-model="form.product_name_en" name="category_name_en"></el-input>
                        </el-form-item>
                        <el-form-item label="上级分类" prop="category_path">
                            <el-cascader
                                :options="category"
                                :props="props"
                                v-model="form.category_path"
                                @change="handleChange">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="一口价" prop="shop_price">
                            <el-col :span="8">
                                <el-input v-model="form.shop_price" placeholder="填写数字" type="number"></el-input>
                            </el-col>

                        </el-form-item>
                        <el-form-item label="描述" prop="desc">

                            <el-input v-model="form.desc" placeholder="文字描述，10到30个字" name="sort"></el-input>

                        </el-form-item>
                        <el-form-item label="人数限制">

                            <el-checkbox v-model="form.numSet">设置</el-checkbox>
                            <div  class="numbox" v-if="form.numSet">
                                <el-input class="num" v-model="form.num[0]" placeholder="最少" name="numberLimit" type="number"></el-input>
                                <el-input class="num" v-model="form.num[1]" placeholder="默认" name="numberLimit" type="number"></el-input>
                                <el-input class="num" v-model="form.num[2]" placeholder="最多" name="numberLimit" type="number"></el-input>
                            </div>

                        </el-form-item>
                        <el-form-item label="主图" prop="pic">
                            <el-upload
                                class="avatar-uploader"
                                action="http://api.com/api/v2/upload"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                name="pic"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="nextStep">下一步</el-button>
                            <el-button @click.native="test">重置</el-button>
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
    .numbox{
        display: flex;
    }
</style>
<script type="text/ecmascript-6">
    import {default as prodSpec} from './prodSpec'
    import {mapState,mapMutations} from 'vuex'
    import {default as required_single} from './addSpecTpl/required_single'
    import {default as required_multiple} from './addSpecTpl/required_multiple'
    import {default as unrequired_single} from './addSpecTpl/unrequired_single'
    import {default as unrequired_multiple} from './addSpecTpl/unrequired_multiple'
    import {category,product} from 'src/service/getData'
    export default {
        components: {prodSpec},
        data(){
            return {
                category: [],
                active: 'info',
                imageUrl: '',
                form: {
                    numSet: '',
                },

                num: [1, 1, 1],
                options: [],
                props: {
                    value: 'category_id',
                    children: 'children',
                    label: 'category_name'
                },
                selectedOptions: [],
                rules: {
                    product_name: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'},
                        {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
                    ],
                    product_name_en: [
                        {required: true, message: '请输入商品英文名称', trigger: 'blur'},
                        {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
                    ],
                    category_path: [
                        {type:'array', required: true, message: '请选择上级分类', trigger: 'change'}
                    ],
                    shop_price: [
                        { required: true, message: '请输入价格', trigger: 'blur'}
                    ],
                    desc: [
                        {required: true, message: '请填写描述', trigger: 'change'},
                        {min: 10, max: 30, message: '长度在 10 到 30 个字符', trigger: 'blur'}

                    ]
                }
            }
        },
        mounted(){
            this.initData()


        },
        computed:{

        },
        watch:{

        },
        methods: {
            ...mapMutations(['UPDATE_PRODUCT']),
            async initData(){
                //请求商品分类列表
                this.category = await category('tree')
                //去拿商品数据
                this.form = await product('get',this.$route.params.id)
            },
            onSubmit(){
                //检查数据是否正确
                if(!(this.form.num[0]<=this.form.num[1] && this.form.num[1]<=this.form.num[2])){
                    this.$message.error('人数限制不正确！')
                }
                //创建后台需要的数据格式

            },
            handleChange(){},
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
