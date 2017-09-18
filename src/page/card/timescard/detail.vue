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
            <el-tab-pane label="用户列表" name="list">
                <userList></userList>
            </el-tab-pane>
            <el-tab-pane label="绑定用户" name="binding">
                <userList>
                    <el-button slot="operate" type="primary">绑定</el-button>
                </userList>
            </el-tab-pane>
        </el-tabs>


    </div>
</template>

<script type="text/ecmascript-6">
    import {user,cardUsers, cardBinding} from 'src/service/getData'
    import {couponType} from 'src/config/enum'
    import {default as userList} from 'src/components/userlist'
    export default {
        components: {
            userList
        },
        data(){
            return {
                active: 'list',
                users: [],
                couponType,
                search: {
                    name: '',
                    tel: ''

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
                this.users = await user('get', this.search)
            },
            async binding(){
                let res = await cardBinding('post', {})
            }
//            handleEdit(index, id) {
//                this.$router.push({path: "/user/" + id})
//            }

        }
    }
</script>

<style scoped>
</style>
