<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 商品</el-breadcrumb-item>
                <el-breadcrumb-item>商品分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="tool-bar">
            <router-link :to="{path:'/product/add'}">
                <el-button type="text">添加新商品</el-button>
            </router-link>
        </div>
        <el-table
            :data="products"
            stripe
        >
            <el-table-column
                prop="product_id"
                label="商品id"
                width="120">
            </el-table-column>
            <el-table-column
                prop="product_name"
                label="名称"
                width="140">
            </el-table-column>
            <el-table-column
                label="类型"
                width="100">
                <template scope="props">
                    {{product_type[props.row.type]}}
                </template>
            </el-table-column>
            <el-table-column
                prop="shop_price"
                label="一口价"
                width="120">
            </el-table-column>
            <el-table-column
                prop="desc"
                width="250"
                label="描述">
            </el-table-column>
            <el-table-column label="操作" width="180" fixed="right">
                <template scope="scope">
                    <el-button
                        size="small"
                        @click="handleEdit(scope.$index, scope.row.product_id)">编辑</el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row.product_id)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>


    </div>
</template>

<script type="text/ecmascript-6">
    import {product} from 'src/service/getData'
    import {product_type} from 'src/config/enum'

    export default {
        components: {},
        data(){
            return {
                products: [],
                product_type:[]
            }
        },
        mounted(){
            this.initData()

        },
        methods: {
            async initData(){
                this.products = await product('get', 'all')
                this.product_type = product_type
            },
            handleEdit(index, id) {
                this.$router.push({path: "/product/" + id})
            },
            async handleDelete(index, id) {
                let confirm = window.confirm('是否确定删除？')
                if(!confirm) return false
                let res = await product('DELETE',id)
                if (res.errorCode == '0') {
                    this.$message('删除成功！')
                    this.products.splice(index, 1)
                }

            },

        }
    }
</script>

<style scoped>

</style>
