<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 商品</el-breadcrumb-item>
                <el-breadcrumb-item>商品分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="tool-bar">
            <router-link :to="{path:'/timescard/add'}">
                <el-button type="text">添加次卡</el-button>
            </router-link>
        </div>
        <el-table
            :data="cards"
            style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="编号">
                            <span>{{ props.row.card_id }}</span>
                        </el-form-item>
                        <el-form-item label="总价">
                            <span>{{ props.row.price }}</span>
                        </el-form-item>
                        <el-form-item label="次数">
                            <span>{{ props.row.times }}</span>
                        </el-form-item>
                        <el-form-item label="描述">
                            <span>{{ props.row.desc }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                prop="card_id"
                label="编号"
                width="100">
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题"
                width="400">
            </el-table-column>
            <el-table-column
                label="类型">
                <template scope="scope">
                    <span>{{cardType[scope.row.type]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button
                        size="small"
                        @click="detail(scope.$index, scope.row.card_id)">详情
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row.card_id)">删除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>


    </div>
</template>

<script type="text/ecmascript-6">
    import {card} from '../../../service/getData'
    import {cardType} from '../../../config/enum'


    export default {
        components: {},
        data(){
            return {
                cards: [],
                cardType:cardType,
            }
        },
        mounted(){
            this.initData()

        },
        methods: {
            async initData(){
                this.cards = await card('GET', {})

            },
            handleEdit(index, id) {
                this.$router.push({path: "/coupon/" + id})
            },
            detail(index, id){
                this.$router.push({path: "/timescard/" + id})
            },
            async handleDelete(index, id) {
                let confirm = window.confirm('是否确定删除？')
                if (!confirm) return false
                let res = await card('DELETE', id)
                if (res.errorCode == '0') {
                    this.$message('删除成功！')
                    this.cards.splice(index, 1)
                }

            },

        }
    }
</script>

<style scoped>

</style>
