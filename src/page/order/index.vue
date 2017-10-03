<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 商品</el-breadcrumb-item>
                <el-breadcrumb-item>商品分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin: 15px;">
            <el-input placeholder="请输入内容" v-model="search.content">
                <el-select placeholder="请选择" v-model="search.param" slot="prepend" style="width:100px;">
                    <el-option label="订单ID" value="order_id"></el-option>
                    <el-option label="订单号" value="order_sn"></el-option>
                    <el-option label="联系人" value="linkman"></el-option>
                    <el-option label="电话号" value="tel"></el-option>
                </el-select>
                <el-button slot="append" icon="search" @click="searchData" @keyup.enter="searchData"></el-button>
            </el-input>
        </div>
        <el-table
            :data="orders"
            style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="订单ID">
                            <span>{{ props.row.order_id }}</span>
                        </el-form-item>
                        <el-form-item label="订单编号">
                            <span>{{ props.row.order_sn }}</span>
                        </el-form-item>
                        <el-form-item label="下单时间">
                            <el-icon name="time"></el-icon>
                            <span style="margin-left: 5px">{{props.row.create_time}}</span>
                        </el-form-item>
                        <el-form-item label="预约时间">
                            <el-icon name="time"></el-icon>
                            <span style="margin-left: 5px">{{props.row.book_time}}</span>
                        </el-form-item>
                        <el-form-item label="联系人">
                            <span>{{ props.row.linkman }}</span>
                        </el-form-item>
                        <el-form-item label="生日">
                            <span>{{ props.row.birthday }}</span>
                        </el-form-item>
                        <el-form-item label="联系方式">
                            <span>{{ props.row.tel }}</span>
                        </el-form-item>
                        <el-form-item label="组合优惠">
                            <span>￥{{ props.row.discount }}</span>
                        </el-form-item>
                        <el-form-item label="支付方式">
                            <span>{{ props.row.pay_name }}</span>
                        </el-form-item>
                        <el-form-item :label="product.product_name" v-for="product in props.row.products">
                            <span style="color: red">商品价￥{{product.total_price}}</span>
                            <div v-for="(item,key,i) in product.spec" class="product_spec">
                                <span v-if="key == 'required_single'">
                                    <span>必选:{{item.selected?item.selected.join('_'):''}}</span>
                                </span>
                                <span v-if="key == 'unrequired_single'">
                                    <span v-for="text in item.selected">{{text.replace('@',':')}}</span>
                                </span>
                                <span v-if="key == 'unrequired_multiple'">
                                    <span v-for="text in item.selected">{{text.replace('@',':')}}</span>
                                </span>
                                <span v-if="key == 'required_multiple'">
                                    <span v-for="text in item.selected">{{text.replace('@',':')}}</span>
                                </span>
                            </div>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>


            <el-table-column
                label="订单 ID"
                prop="order_id">
            </el-table-column>
            <el-table-column
                label="联系人"
                prop="linkman">
            </el-table-column>
            <el-table-column
                label="订单总价"
                prop="total_price">
            </el-table-column>
            <el-table-column
                label="支付金额"
                prop="amount">
            </el-table-column>
            <el-table-column
                label="订单状态">
                <template scope="scope">
                    <span style="margin-left: 5px">{{orderStatus[scope.row.order_status]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button
                        size="small"
                        type="danger"
                        icon="edit"
                        :plain="true"
                        @click="handleCheck(scope.$index,scope.row.order_id)" v-if="scope.row.order_status == '1'">核销
                    </el-button>
                    <el-button
                        size="small"
                        type="primary"
                        icon="edit"
                        :plain="true"
                        v-if="scope.row.order_status == '3'">已核销
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="page">
            <el-pagination
                layout="prev, pager, next"
                :page-size="pageSize"
                @current-change="handleCurrentChange"
                :total="total">
            </el-pagination>
        </div>


    </div>
</template>

<script type="text/ecmascript-6">
    import {orderByPage, order} from 'src/service/getData'
    import {orderStatus} from 'src/config/enum'
    export default {
        components: {},
        data(){
            return {
                search: {
                    param: null,
                    content: ''
                },
                orderStatus,
                pageSize: 5,
                currentPage: 1,
                total: null,
                orders: [],
            }
        },
        mounted(){
            this.initData()
        },
        computed: {},
        methods: {

            initData(){
                this.getPage()
            },
            async getPage(){
                let data = {}
                data.size = this.pageSize
                data.page = this.currentPage
                if (this.search.param && this.search.content) {
                    data.param = this.search.param
                    data.content = this.search.content
                }
                let res = await orderByPage('GET', data)
                this.orders = res.data
                this.total = res.total
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getPage()
            },
            searchData() {
                this.currentPage = 1
                this.getPage()
            },
            async handleCheck(index, orderId){
                let confirm = window.confirm('核销后，订单将交易成功，是否核销？')
                if (!confirm) return false
                //开始核销
                let res = await order('PUT', orderId, {order_status: 3})
                if (res.code == '201') {
                    //核销成功,变更状态
                    let orders = Object.assign(true, {}, this.orders)
                    orders[index].order_status = 3
                    this.orders = orders

                }
            }
        }
    }
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .page {
        margin-top: 20px;
        text-align: right;
    }

    .product_spec {
        /*background-color: #ddd;*/
        /*border-radius: 20px;*/

    }

    .product_spec span {
        display: block;
        margin: 5px;
        background-color: #00b0e8;
        border-radius: 20px;
        color: white;
        text-align: center;
    }
</style>
