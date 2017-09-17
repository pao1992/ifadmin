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
                    <el-option label="ID" value="id"></el-option>
                    <el-option label="所属优惠券" value="coupon_id"></el-option>
                    <el-option label="用户ID" value="user_id"></el-option>
                    <el-option label="用户名" value="nickname"></el-option>
                    <el-option label="电话号" value="tel"></el-option>
                </el-select>
                <el-button slot="append" icon="search" @click="searchData" @keyup.enter="searchData"></el-button>
            </el-input>
        </div>
        <el-table
            :data="coupons"
            style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="所属优惠券ID">
                            <span>{{ props.row.coupon.coupon_id }}</span>
                        </el-form-item>
                        <el-form-item label="优惠券名称">
                            <span>{{ props.row.coupon.title }}</span>
                        </el-form-item>
                        <el-form-item label="优惠券创建时间">
                            <span>{{ props.row.coupon.create_time }}</span>
                        </el-form-item>
                        <el-form-item label="领取时间">
                            <el-icon name="time"></el-icon>
                            <span style="margin-left: 5px">{{props.row.create_time}}</span>
                        </el-form-item>
                        <el-form-item label="用户ID">
                            <span style="margin-left: 5px">{{props.row.user_id}}</span>
                        </el-form-item>
                        <el-form-item label="用户昵称">
                            <span style="margin-left: 5px">{{props.row.user.nickname}}</span>
                        </el-form-item>
                        <el-form-item label="用户openid">
                            <span>{{ props.row.user.openid }}</span>
                        </el-form-item>
                        <el-form-item label="联系方式">
                            <span>{{ props.row.user.tel }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>


            <el-table-column
                label="ID"
                prop="id"
                width="100">
            </el-table-column>
            <el-table-column
                label="优惠券 名称"
                prop="coupon.title">
            </el-table-column>
            <el-table-column
                label="领取用户"
                prop="user.nickname">
            </el-table-column>
            <el-table-column
                label="领取时间"
                prop="create_time">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button
                        size="small"
                        type="danger"
                        icon="edit"
                        :plain="true"
                        @click="handleCheck(scope.$index,scope.row.id)" v-if="!scope.row.delete_time">核销
                    </el-button>
                    <el-button
                        size="small"
                        type="primary"
                        icon="edit"
                        :plain="true"
                        v-if="scope.row.delete_time">已核销
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
    import {userCoupon} from '../../service/getData'
    export default {
        components: {},
        data(){
            return {
                search: {
                    param: null,
                    content: ''
                },
                pageSize: 5,
                currentPage: 1,
                total: null,
                coupons: [],
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
                let res = await userCoupon('GET', data)
                this.coupons = res.data
                this.total = res.total
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getPage(val)
            },
            searchData() {
                this.currentPage = 1
                this.getPage()
            },
            async handleCheck(index, id){
                let confirm = window.confirm('核销后，将删除该优惠券，是否核销？')
                if (!confirm) return false
                //开始核销
                let res = await userCoupon('DELETE', id)
                if (res.code == '204') {
                    //核销成功,变更状态
                    let coupons = Object.assign(true, {}, this.coupons)
                    coupons[index].delete_time = 1
                    this.coupons = coupons

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
