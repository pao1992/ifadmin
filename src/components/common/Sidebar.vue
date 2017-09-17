<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <el-menu-item index="readme">
                <i class="el-icon-setting"></i>自述
            </el-menu-item>

            <el-submenu :index="item.code" v-for="(item,index) in sidebar">
                <template slot="title"><i class="el-icon-menu"></i>{{item.name}}</template>
                <el-menu-item :index="'/'+sub.code" v-for="sub in item.sub">{{sub.name}}</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>表格</template>
                <el-menu-item index="basetable">基础表格</el-menu-item>
                <el-menu-item index="vuetable">Vue表格组件</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    import {sidebar} from 'src/service/tempData/sidebar'
    export default {
        data(){
            return {
                sidebar
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        componnents:{
        },
        mounted (){
            console.log(sidebar)
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
