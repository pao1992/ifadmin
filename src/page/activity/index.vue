<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 商品</el-breadcrumb-item>
                <el-breadcrumb-item>商品分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="tool-bar">
            <router-link :to="{path:'/activity/add'}">
                <el-button type="text">添加新活动</el-button>
            </router-link>
        </div>
        <el-table
            :data="activities"
            style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="编号">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="起始时间">
                            <span>{{ props.row.start_time }}</span>
                        </el-form-item>
                        <el-form-item label="结束时间">
                            <span>{{ props.row.end_time }}</span>
                        </el-form-item>
                        <el-form-item label="描述">
                            <span>{{ props.row.desc }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                prop="id"
                label="编号"
                width="100">
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题"
                width="200">
            </el-table-column>
            <el-table-column
                prop="num"
                label="剩余数量"
                width="100">
            </el-table-column>
            <el-table-column
                prop="start_time"
                label="开始时间"
                width="150">
            </el-table-column>
            <el-table-column
                prop="end_time"
                label="结束时间"
                width="150">
            </el-table-column>
            <el-table-column
                label="类型">
                <template scope="scope">
                    <span>{{activity_type[scope.row.type]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button
                        size="small"
                        @click="handleEdit(scope.$index, scope.row.id)">编辑
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row.id)">删除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>


    </div>
</template>

<script type="text/ecmascript-6">
    import {activity,product} from '../../service/getData'
    import {activity_type} from '../../config/enum'

    export default {
        components: {},
        data(){
            return {
                activities:[],
                activity_type:{}
            }
        },
        mounted(){
            this.initData()

        },
        methods: {
            async initData(){
                this.activities = await activity('get', {})
                this.activity_type = activity_type

            },
            handleEdit(index, id) {
                this.$router.push({path: "/activity/edit/" + id})
            },
            async handleDelete(index, id) {
                let confirm = window.confirm('是否确定删除？')
                if (!confirm) return false
                let res = await activity('DELETE', id)
                if (res.errorCode == '0') {
                    this.$message('删除成功！')
                    this.activities.splice(index, 1)
                }

            },

        }
    }
</script>

<style scoped>

</style>
