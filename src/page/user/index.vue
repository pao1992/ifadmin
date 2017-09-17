<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 商品</el-breadcrumb-item>
                <el-breadcrumb-item>商品分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="tool-bar">
            <!--<router-link :to="{path:'/activity/add'}">-->
                <!--<el-button type="text">添加新活动</el-button>-->
            <!--</router-link>-->
        </div>
        <!-- 筛选栏目 -->
        <el-form :inline="true" ref='form' :model="editEvent" class="demo-form-inline" :rules="rules">
            <el-form-item label="用户姓名">
                <el-input v-model="search.name"></el-input>
                </el-date-picker>
            </el-form-item>
            <el-form-item label="用户手机号" prop="tel">
                <el-input v-model="search.tel"></el-input>
            </el-form-item>
            <!--<el-form-item label="头部标记">-->
                <!--<el-input v-model="editEvent.remark"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="剩余数量">-->
                <!--<el-input v-model="editEvent.remain"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="内容">-->
                <!--<el-input v-model="editEvent.desc" style="width:30vw"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
                <!--<el-button type="primary" @click="onSubmit">提交</el-button>-->
            <!--</el-form-item>-->
            <el-button @click="searchUser">查找</el-button>
        </el-form>

        <el-table
            :data="users"
            style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="编号">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                prop="id"
                label="ID"
                width="100">
            </el-table-column>

            <el-table-column
                prop="nickname"
                label="昵称">
            </el-table-column>
            <el-table-column
                prop="openid"
                label="OPENID">
            </el-table-column>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <!--<el-button-->
                    <!--size="small"-->
                    <!--@click="handleEdit(scope.$index, scope.row.coupon_id)">编辑-->
                    <!--</el-button>-->
                    <!--<el-button-->
                    <!--size="small"-->
                    <!--type="danger"-->
                    <!--@click="handleDelete(scope.$index, scope.row.coupon_id)">删除-->
                    <!--</el-button>-->
                </template>
            </el-table-column>

        </el-table>


    </div>
</template>

<script type="text/ecmascript-6">
    import {user} from '../../service/getData'
    import {couponType} from '../../config/enum'

    export default {
        components: {},
        data(){
            return {
                users: [],
                couponType,
                search: {
                    name:'',
                    tel:''

                }
            }
        },
        mounted(){
            this.initData()

        },
        methods: {
            async initData(){
                this.users = await user('get', {})

            },
            async searchUser(){
                this.users = await user('get',this.search)
            }
//            handleEdit(index, id) {
//                this.$router.push({path: "/user/" + id})
//            }

        }
    }
</script>

<style scoped>
</style>
