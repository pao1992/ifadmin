<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 磁卡</el-breadcrumb-item>
                <el-breadcrumb-item>商品分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="tool-bar">
            <!--<router-link :to="{path:'/activity/add'}">-->
            <!--<el-button type="text">添加新活动</el-button>-->
            <!--</router-link>-->
        </div>

        <el-tabs v-model="active" type="card" @tab-click="">
            <el-tab-pane label="次卡列表" name="list">
                <user-card-list></user-card-list>
            </el-tab-pane>
            <el-tab-pane label="绑定用户" name="bind">
                <user-list :filter="filter1" :users="users">
                    <div slot="filter">
                        <el-form-item label="电话号码">
                            <el-input v-model="filter1.tel"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="searchDiffUser()">查找</el-button>
                        </el-form-item>
                    </div>
                    <template slot="operate" scope="props">
                        <el-button @click="bind(props.id)">购买此卡</el-button>
                    </template>
                </user-list>
            </el-tab-pane>
        </el-tabs>


    </div>
</template>

    <script type="text/ecmascript-6">
        import {getUserCard,userByFilter, cardUsers,cardBinding, cardUnbinding} from 'src/service/getData'
        import {default as userCardList} from 'src/page/card/timescard/list'
        import {couponType} from 'src/config/enum'
        import {default as userList} from 'src/components/userlist'
        export default {
            components: {
                userList,
                userCardList
            },
            data(){
                return {
                    userCard:[],
                    pageSize: 5,
                    currentPage: 1,
                    total: null,
                    card_id:'',
                    active: 'list',
                    users: [],
                    couponType,
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

                    this.userCard = await getUserCard('get',{'id':this.card_id},{},{})

                },
                async bind(user_id){
                    let parma = {
                        'id':this.card_id,
                        'user_id':user_id
                    }
                    let res = await cardBinding('post',parma,{},{})
                },
                async del(id){
                    let res = await cardUnbinding('post', {})
                },
//            handleEdit(index, id) {
//                this.$router.push({path: "/user/" + id})
//            }

            }
        }
    </script>

    <style scoped>
</style>
