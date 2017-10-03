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
            <el-form-item>
                <el-button @click="search">查找</el-button>
            </el-form-item>
            <!--<el-button @click="search">查找</el-button>-->
        </el-form>
        <el-table
            :data="products"
            stripe
        >
            <el-table-column label="操作" width="150" v-if="column.left_operate">
                <template scope="props">
                    <slot name="left_operate" :id="props.row.product_id" :row="props.row"></slot>
                </template>
            </el-table-column>
            <el-table-column
                prop="product_id"
                label="商品id"
                width="120" v-if="column.product_id">
            </el-table-column>
            <el-table-column
                prop="product_name"
                label="名称"
                v-if="column.product_name">
            </el-table-column>
            <el-table-column
                label="类型"
                width="100" v-if="column.type">
                <template scope="props">
                    {{product_type[props.row.type]}}
                </template>
            </el-table-column>
            <el-table-column
                prop="shop_price"
                label="一口价"
                width="120" v-if="column.shop_price">
            </el-table-column>
            <el-table-column
                prop="desc"
                width="250"
                label="描述" v-if="column.desc">
            </el-table-column>
            <el-table-column label="操作" width="180" fixed="right" v-if="column.operate">
                <template scope="props">
                    <slot name="operate" :id="props.row.product_id" :row="props.row"></slot>
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
    import {productByFilter} from 'src/service/getData'
    import {product_type} from 'src/config/enum'

    export default {
        components: {},
        data(){
            return {
                products: [],
                product_type: [],
                rules: {},
                pageSize: 10,
                currentPage: 1,
                total: null,
            }
        },
        props: ['filter', 'column'],
        mounted(){
            this.initData()

        },
        methods: {
            async initData(){
                //首次加载商品
                this.search()
            },
            async search(){
                let filter = this.filter
                filter.size = this.pageSize
                filter.page = this.currentPage
                let res = await productByFilter('get', this.filter)
                this.products = res.data
                this.total = res.total
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.search()
            },

        }
    }
</script>

<style scoped>

</style>
