<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 商品</el-breadcrumb-item>
                <el-breadcrumb-item>商品分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-col :span="12">
            <el-form ref='coupon' :model="coupon" :rules="rules" label-width="80px">
                <el-form-item label="类型">
                    <el-select v-model="coupon.type" placeholder="请选择">
                        <el-option
                            v-for="item in typeOption"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="coupon.title"></el-input>
                </el-form-item>
                <el-form-item label="原价" prop="original_price">
                    <el-col :span="8">
                        <el-input v-model="coupon.original_price" type="number"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="现价" prop="current_price">
                    <el-col :span="8">
                        <el-input v-model="coupon.current_price" type="number"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="剩余数量">
                    <el-input-number v-model.number="coupon.num" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="选择颜色">
                    <div class="block">
                        <el-color-picker v-model="coupon.color"></el-color-picker>
                    </div>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="coupon.desc">
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
            <couponTag
                :title="coupon.title"
                :start="coupon.start"
                :end="coupon.end"
                :color="coupon.color"
                btn="立即领取"
                :number="coupon.num">
                <div slot="price">
                    <p style="font-size: 20px;margin-bottom: 10px">现价:￥{{coupon.current_price}}</p>
                    剩余：{{coupon.num}}张 原价:￥<span style="text-decoration: line-through;">{{coupon.original_price}}</span>
                </div>
                <div slot="desc">
                    <p style="word-break:break-word;">{{coupon.desc?coupon.desc:'请输入优惠券描述'}}</p>
                </div>
            </couponTag>
        </el-col>


    </div>
</template>
<style>

</style>
<script type="text/ecmascript-6">
    import {coupon} from '../../service/getData'
    import {dateFormat} from '../../config/mUtils'

    export default {
        data() {
            return {
                time: '',
                typeOption: [
                    {name: '优惠券', value: 1},
                    {name: '抵价券', value: 2},
                    {name: '折扣券', value: 3}
                ],
                coupon: {
                    title: '',
                    start: '',
                    end: '',
                    discount: '',
                    reduce: '',
                    original_price: 0.00,
                    current_price: 0.00,
                    color: 'red',
                    desc: '',
                    num: 0,
                    type: 1,
                },
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ],
                    original_price: [
                        {required: true, message: '请输入价格', trigger: 'blur'},
                        {min: 0, message: '不能小于0', trigger: 'blur'}
                    ],
                    current_price: [
                        {required: true, message: '请输入价格', trigger: 'blur'},
                        {min: 0, message: '不能小于0', trigger: 'blur'}
                    ],
                    number: [
                        {required: true, message: '请输入数量', trigger: 'blur'},
                        {type: 'number', message: '请输入数字', trigger: 'blur'},
                        {min: 0, message: '不能小于0', trigger: 'blur'}
                    ]
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
            couponTag
        },
        computed: {},
        watch: {
            time(newval){
                this.coupon.start = dateFormat(newval[0])
                this.coupon.end = dateFormat(newval[1])
            }
        },
        mounted(){
            this.initData()
        },
        methods: {
            async initData(){

            },
            save(){
                //验证是否填写完毕
                //验证数据
                this.$refs['coupon'].validate((valid) => {
                    if (valid) {
                        this.saveCoupon()
                    } else {
                        return false
                    }
                });

            },
            async saveCoupon(){
                let data = this.coupon
                console.log(this.coupon)
                let res = await coupon('POST', {}, data)
                if (res.errorCode == '0') {
                    this.$message('添加成功！')
                } else {
                    this.$message.error('添加失败！请重试')
                }
            }
        }
    }
</script>
