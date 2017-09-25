<template>
    <div>
        <el-form inline class="demo-table-expand">
            <el-form-item label="电话号码">
                <el-input v-model="filter.tel"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="">查找</el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="userCard"
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
                prop="title"
                label="卡名称"
                width="200">
            </el-table-column>
            <el-table-column
                prop="user.nickname"
                label="用户昵称">
            </el-table-column>
            <el-table-column
                prop="user.tel"
                label="联系方式">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="props">
                    <el-button @click="delCard(props.row.id)">删除此卡</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getUserCard,userByFilter, user, cardUsers, cardDiffUsers,cardBinding, cardUnbinding} from 'src/service/getData'
    export default {
        data(){
            return {
                userCard:[],
                pageSize: 5,
                currentPage: 1,
                total: null,
                filter: {
                    tel: '',
                },
                filter1:{
                },
            }
        },
        mounted(){
            this.card_id = this.$route.params.id
            this.initData()

        },
        methods: {
            async initData(){
                this.getPage()

            },
            async getPage(){
                let data = {}
                data.size = this.pageSize
                data.page = this.currentPage
                data.filter = this.filter
                let res = await getUserCard('GET',{'id':this.card_id},data,{})
                this.userCard = res.data
                this.total = res.total
            },
            async delCard(id){
                //删除卡

            }
        }
    }
</script>

<style scoped>
</style>
