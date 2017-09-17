<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 商品</el-breadcrumb-item>
                <el-breadcrumb-item>商品分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="tool-bar">
            <router-link :to="{path:'/category/add'}">
                <el-button type="text">添加商品分类</el-button>
            </router-link>
        </div>

    <el-table
        :data="categorys"
        stripe
        >
        <el-table-column
            prop="category_id"
            label="分类id"
            width="120">
        </el-table-column>
        <el-table-column
            prop="category_name"
            label="名称"
            width="100">
        </el-table-column>
        <el-table-column
            prop="category_name_en"
            label="英文名">
        </el-table-column>
        <el-table-column
            prop="desc"
            label="描述">
        </el-table-column>
        <el-table-column label="操作" width="230">
            <template scope="scope">
                <el-button
                    size="small"
                    type="primary"
                    icon="edit"
                    :plain="true"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                    size="small"
                    type="danger"
                    icon="delete"
                    :plain="true"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>

    </el-table>


    </div>
</template>

<script>
import {category,delCategory} from 'src/service/getData'
    export default {
        components: {},
        data(){
            return {
                categorys:[]
            }
        },
        mounted(){
            this.initData()
        },
        methods: {
            async initData(){
                let res = await category('GET','all')
                this.categorys = res
            },
            handleEdit(index, row) {
                this.$router.push({path:"/category/"+row.category_id})
            },
            async handleDelete(index, row) {
                confirm = window.confirm('是否删除？')
                if(!confirm) return false
                let res = await category('DELETE',row.category_id)
                if(res.errorCode == '0'){
                    this.categorys.splice(index,1)
                } else {
                    alert(res.msg)
                }
            }
        }
    }
</script>

<style scoped>
</style>
