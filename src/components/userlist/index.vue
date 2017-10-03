<template>
    <div>
        <!-- 筛选栏目 -->
        <el-form :inline="true" ref='form' class="demo-form-inline" :rules="rules">
            <!--<el-form-item label="用户姓名">-->
                <!--<el-input v-model="filter.name"></el-input>-->
                <!--</el-date-picker>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="用户手机号" prop="tel">-->
                <!--<el-input v-model="filter.tel"></el-input>-->
            <!--</el-form-item>-->
            <!-- 将赛选栏目也做成组件形式-->
            <slot name="filter"></slot>
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
            <!--<el-button @click="searchUser">查找</el-button>-->
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
                        <el-form-item label="openid">
                            <span>{{ props.row.openid }}</span>
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
                prop="tel"
                label="联系方式">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="props">
                    <!-- 将操作做成接口暴露给父组件-->
                    <slot name="operate" :id="props.row.id"></slot>
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
    import {user,userByFilter} from 'src/service/getData'
    import {couponType} from 'src/config/enum'

    export default {
        components: {},
        data(){
            return {
                couponType,
                search: {
                    name:'',
                    tel:'',
                    del:''

                },
                rules: {
//                    record_number: [
//                        {required: true, message: '请输入域名备案号', trigger: 'blur'}
//                    ],
//                    app_name: [
//                        {required: true, message: '请输入app名称', trigger: 'blur'},
//                        {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
//                    ],
//                    linkman: [
//                        {required: true, message: '请输入管理员名称', trigger: 'blur'},
//                    ],
//                    tel: [
//                        {required: true, message: '请输入联系方式', trigger: 'blur'},
//                        {min: 8, max: 11, message: '长度在 8 到 11 个字符', trigger: 'blur'}
//                    ],
//                    address: [
//                        {required: true, message: '请输入商家地址', trigger: 'blur'},
//                        {min: 10, max: 30, message: '长度在 10 到 30 个字符', trigger: 'blur'}
//                    ],
//                    desc: [
//                        {required: true, message: '请输入业务描述', trigger: 'blur'},
//                        {min: 10, max: 100, message: '长度在 10 到 100 个字符', trigger: 'blur'}
//                    ]
                }
            }
        },
        props: ['users','filter'],
        mounted(){
            this.initData()
            console.log(this.filter)

        },
        methods: {
            async initData(){
//                this.users = await user('get', {})

            },
            async searchUser(){
                //根据父组件传过来的筛选条件筛选
                let res = await userByFilter('post','',this.filter)
                console.log(res)
                this.users = res
            }
//            handleEdit(index, id) {
//                this.$router.push({path: "/user/" + id})
//            }

        }
    }
</script>

<style scoped>
</style>
