<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 活动</el-breadcrumb-item>
                <el-breadcrumb-item>添加活动</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form ref='activity' :model="activity" :rules="rules" label-width="80px">
                    <el-form-item label="类型" prop="type">
                        <el-select v-model="activity.type" placeholder="请选择">
                            <el-option
                                v-for="item,key in activity_type"
                                :label="item"
                                :value="parseInt(key)">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="绑定产品">
                        <el-card v-if="activity.type == 1" :body-style="{ 'text-align': 'center' }">
                            <p style="color: #48576a;">{{name}}</p>
                            <img :src="imgBaseUrl+'/'+product.pic_thumb" style="width: 70%;height: 70%"/>
                        </el-card>
                    </el-form-item>
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="activity.title"></el-input>
                    </el-form-item>
                    <el-form-item label="剩余数量">
                        <el-input-number v-model.number="activity.num" :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="描述" prop="desc">
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="activity.desc">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="时间范围">
                        <el-date-picker
                            v-model="time"
                            type="daterange"
                            placeholder="选择时间范围"
                            :picker-options="pickerOptions"
                            format="yyyy/MM/dd"
                            align="right">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="save">保存</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
            <el-col :span="12">
                <div v-if="activity.type == 1">
                    <product-list :filter="filter" :column="column">
                        <block slot="filter">
                            <el-form-item label="商品名称">
                                <el-input v-model="filter.product_name"></el-input>
                            </el-form-item>
                        </block>
                        <template slot="operate" scope="props">
                            <el-button type="text" @click="getProduct(props.row)">选定</el-button>
                        </template>
                    </product-list>
                </div>
                <div v-if="activity.type == 2">
                    商品2
                </div>
                <div v-if="activity.type == 3">
                    商品3
                </div>
            </el-col>

        </el-row>
    </div>
</template>
<style>

</style>
<script type="text/ecmascript-6">
    import {activity,product} from '../../service/getData'
    import {dateFormat} from '../../config/mUtils'
    import {activity_type} from '../../config/enum'
    import {imgBaseUrl} from '../../config/env'
    import {default as productList} from 'src/components/productList/index'

    export default {
        data() {
            return {
                imgBaseUrl,
                id:'',//id有值就是编辑
                name:'',//选定的产品名称
                filter: {
                    product_name: '',
                    type: 1,//仅活动商品可见
                },
                product:'',
                column: {
                    'product_id': true,
                    'product_name': true,
                    'type': false,
                    'operate': true,

                },
                activity: {
                    end_time: '',
                    start_time: '',
                    title: '',
                    desc: '',
                    num: 0,
                    type: '',
                    connect_id: ''
                },
                activity_type: [],
                time: '',
                rules: {
//                    type: [
//                        {required: true, message: '请选择类型', trigger: 'blur'}
//                    ],
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ],
                    number: [
                        {required: true, message: '请输入数量', trigger: 'blur'},
                        {type: 'number', message: '请输入数字', trigger: 'blur'},
                        {min: 0, message: '不能小于0', trigger: 'blur'}
                    ],
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }
            }
        },
        components: {
            productList,
        },
        computed: {},
        watch: {
            time(newval){
                console.log(newval)
                this.activity.start_time = dateFormat(newval[0])
                this.activity.end_time = dateFormat(newval[1])
            }
        },
        mounted(){
            this.initData()
        },
        methods: {
            async initData(){
                this.activity_type = activity_type
                //检查是编辑还是添加
                this.id = this.$route.params.id
                if(this.id){
                    this.activity = await activity('get',this.id)
                    this.product = await product('get',this.activity.connect_id)
                    this.name = this.product.product_name
//                    console.log(Date.parse(new Date(this.activity.start_time)))
                    this.time = [new Date(this.activity.start_time),new Date(this.activity.end_time)]

                }
            },
            save(){
                //验证是否填写完毕
                //验证数据
                this.$refs['activity'].validate((valid) => {
                    if (valid) {
                        this.saveActivity()
                    } else {
                        return false
                    }
                });

            },
            async saveActivity(){
                if(this.id == ''){
                    //新增
                    let data = this.activity
                    let res = await activity('POST', {}, data)
                    if (res.errorCode == '0') {
                        this.$router.push({'path':'/activity'})
//                    this.$message('添加成功！')
                    } else {
                        this.$message.error('添加失败！请重试')
                    }
                }else{
                    //编辑
                    let data = this.activity
                    let res = await activity('PUT', this.id, data)
                    if (res.errorCode == '0') {
                        this.$router.push({'path':'/activity'})
//                    this.$message('添加成功！')
                    } else {
                        this.$message.error('编辑失败！请重试')
                    }
                }

            },
            getProduct(row){
                this.product = row
                this.name = row.product_name?row.product_name:row.name
                this.activity.connect_id = row.product_id
            }
        }
    }
</script>
