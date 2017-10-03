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
                        <el-form-item label="商品名称" prop="product_name">
                            <el-input v-model="form.product_name" name="category_name_en"></el-input>
                        </el-form-item>
                        <el-form-item label="英文名称" prop="product_name_en">
                            <el-input v-model="form.product_name_en" name="category_name_en"></el-input>
                        </el-form-item>
                        <el-form-item label="商品类型" prop="product_name_en">
                            <el-select v-model="product_type[form.type]" placeholder="商品类型">
                                <el-option
                                    v-for="item,key in product_type"
                                    :key="key"
                                    :label="item"
                                    :value="key">
                                </el-option>
                            </el-select>
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
                            <div class="numbox" v-if="form.numSet">
                                <el-input class="num" v-model="form.num[0]" placeholder="最少" name="numberLimit"
                                          type="number"></el-input>
                                <el-input class="num" v-model="form.num[1]" placeholder="默认" name="numberLimit"
                                          type="number"></el-input>
                                <el-input class="num" v-model="form.num[2]" placeholder="最多" name="numberLimit"
                                          type="number"></el-input>
                            </div>

                        </el-form-item>
                        <el-form-item label="主图" prop="pic">
                            <el-upload
                                class="avatar-uploader"
                                :action="baseUrl+'/upload'"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                name="pic"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="form.pic_thumb" :src="imgBaseUrl+'/'+form.pic_thumb" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="nextStep">下一步</el-button>
                            <el-button @click.native="">重置</el-button>
                        </el-form-item>

                    </el-form>

                </el-col>
            </el-tab-pane>
            <el-tab-pane label="商品规格" name="spec" v-if="getProduct">
                <required_single :spec="form.spec.required_single"></required_single>
                <required_multiple :spec="form.spec.required_multiple"></required_multiple>
                <unrequired_single :spec="form.spec.unrequired_single"></unrequired_single>
                <unrequired_multiple :spec="form.spec.unrequired_multiple"></unrequired_multiple>
                <div style="text-align: right">
                    <el-button type="primary" @click="perStep">上一步</el-button>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>


    </div>
</template>
<style scoped>
    .avatar-uploader-icon {
        line-height: 178px;
    }

    .numbox {
        display: flex;
    }
</style>
<script type="text/ecmascript-6">
    import {mapState, mapMutations} from 'vuex'
    import {default as required_single} from './addSpecTpl/required_single'
    import {default as required_multiple} from './addSpecTpl/required_multiple'
    import {default as unrequired_single} from './addSpecTpl/unrequired_single'
    import {default as unrequired_multiple} from './addSpecTpl/unrequired_multiple'
    import {category, product} from 'src/service/getData'
    import {imgBaseUrl, baseUrl} from 'src/config/env'
    import {product_type} from 'src/config/enum'
    export default {
        components: {
            required_single,
            required_multiple,
            unrequired_single,
            unrequired_multiple

        },
        data(){
            return {
                product_type: [],
                getProduct: false,//是否获取到了商品，获取到才开始渲染商品规格
                imgBaseUrl,
                baseUrl,
                type: '',
                category: [],
                active: 'info',
                form: {
                    type:'',
                    product_name: '',
                    product_name_en: '',
                    category_id: null,
                    category_path: [],
                    shop_price: null,
                    desc: '',
                    numSet: null,
                    pic_thumb: '',
                    pic_original: '',
                    from: null,
                    num: [1, 1, 1],
                    spec: {
                        'required_single': {
                            'items': [],
                            'items_price': [],
                            'num_related': true
                        },
                        'unrequired_single': {
                            'items': [],
                            'num_related': false
                        },
                        'required_multiple': {
                            'items': [],
                            'num_related': false
                        },
                        'unrequired_multiple': {
                            'items': [],
                            'num_related': false
                        }

                    }
                },
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
                        {type: 'array', required: true, message: '请选择上级分类', trigger: 'change'}
                    ],
                    shop_price: [
                        {required: true, message: '请输入价格', trigger: 'blur'}
                    ],
                    desc: [
                        {required: true, message: '请填写描述', trigger: 'change'},
                        {min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur'}

                    ]
                }
            }
        },
        mounted(){
            //初始化操作
            this.initData()

        },
        computed: {
            ...mapState(['product'])
        },
        watch: {},
        methods: {
            ...mapMutations(['UPDATE_PRODUCT']),
            async initData(){
                //导入商品类型
                this.product_type = product_type;
                //判断是新增还是编辑
                this.type = typeof(this.$route.params.id) == 'undefined' ? 0 : 1 //0是新增，1是编辑
                //请求商品分类列表
                this.category = await category('GET', 'tree')
                //请求商品数据
                if (this.type) {
                    let form = await product('GET', this.$route.params.id)
                    //整理商品數據
                    for (let i in form.category_path) {
                        form.category_path[i] = parseInt(form.category_path[i])
                    }
                    this.form = form
                }
                this.UPDATE_PRODUCT(this.form)
                //这一步很重要，获取到商品后才开始渲染商品规格
                this.getProduct = true


            },
            nextStep(){
                //检查数据是否正确
                if (this.form.numSet && !(this.form.num[0] <= this.form.num[1] && this.form.num[1] <= this.form.num[2])) {
                    this.$message.error('人数限制不正确！')
                    return false
                }
                if (!this.form.pic_thumb) {
                    this.$message.error('请上传主图！')
                    return false

                }
                //验证数据
                this.$refs['form'].validate((valid) => {
                    console.log(valid)
                    if (valid) {
                        this.form.category_id = this.form.category_path[this.form.category_path.length-1]
                        this.UPDATE_PRODUCT(this.form)
                        this.active = 'spec'
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                });


            },
            perStep(){
                this.active = 'info'
            },
            async onSubmit(){
                //整理验证规格
//                let str = JSON.stringify(this.product)
//                console.log(str)
                //整理商品数据发送到后台
                if (this.type) {
                    //编辑
//                    let str = JSON.stringify(this.product);
//                    console.log(str)
                    let res = await product('PUT', this.$route.params.id, this.product)
                    if (res.code == '201') this.$router.push({path: '/product'})
                } else {
                    //新增
                    let res = await product('POST', '', this.product)
                    if (res.code == '201') this.$router.push({path: '/product'})
                }

            },
            handleChange(){

            },
            handleAvatarSuccess(res, file) {
                //this.imageUrl = URL.createObjectURL(file.raw)
                this.form.pic_thumb = res.thumb
                this.form.pic_original = res.original
                this.form.from = 1
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt1M = file.size / 1024 / 1024 < 1;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt1M) {
                    this.$message.error('上传头像图片大小不能超过 1MB!');
                }
                return isJPG && isLt1M;
            }
        }
    }
</script>

<style scoped>

</style>
