<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 商品</el-breadcrumb-item>
                <el-breadcrumb-item>商品分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <vue-event-calendar :events="events">
            <template scope="props">
                <div v-for="(event, index) in props.showEvents" class="event-item">
                    <!-- 这里拿到的是传入的单个event所有数据 -->
                    <div class="event">
                        <h3 class="title">{{event.title}}</h3><span class="time">{{event.date}}</span>
                        <span class="remark">标记：{{event.remark}}</span>
                        <span class="remain">剩余：{{event.remain}}</span>
                        <p class="desc">{{event.desc}}</p>
                        <p style="text-align: right">
                            <el-button type="warning" :plain="false" size="small"
                                       @click="delEvent(event.event_id,index)">删除事件
                            </el-button>
                        </p>
                    </div>
                </div>
            </template>
        </vue-event-calendar>
        <div style="margin-top:100px ">
            <el-form :inline="true" ref='form' :model="editEvent" class="demo-form-inline" :rules="rules">
                <el-form-item label="当前日期">
                    <el-input v-model="editEvent.date" :disabled="true"></el-input>
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                <el-input v-model="editEvent.title"></el-input>
                </el-form-item>
                <el-form-item label="头部标记">
                    <el-input v-model="editEvent.remark"></el-input>
                </el-form-item>
                <el-form-item label="剩余数量">
                    <el-input v-model="editEvent.remain"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                <el-input v-model="editEvent.desc" style="width:30vw"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<style>

</style>
<script type="text/ecmascript-6">
    import {mapState, mapMutations} from 'vuex'
    import {event} from 'src/service/getData'

    export default {
        data() {
            return {
                addEvent:{
                    'title':'',

                },
                selectedProdId:'',
                formInline: {},
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                form: {},
                events: [],
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur'}
                    ],
                    remark: [
                        {max: 10, message: '长度在 10 个字符内', trigger: 'blur'}
                    ],
                    date: [
                        {required: true, message: '请输入时间', trigger: 'change'}
                    ],
                }
            };
        },
        components: {},
        computed: {
            ...mapState([
                'currentEvent'
            ]),
            editEvent(){
                return this.currentEvent
            }
        },
        mounted(){
            this.initData()
        },
        methods: {
            async initData(){

                //获取全部事件信息
                this.events = await event('GET', {})
                console.log(this.events)
            },
            checkEvents(){

            },
            onSubmit(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        //提交新增事件
                        this.send()
                    } else {

                        return false;
                    }
                });


            },
            async send(){
                let res = await event('POST', {}, this.editEvent)
                if (res.code == '201') {
                    this.$message('操作成功！')
                    //操作成功,清空数据
                    let temp = Object.assign({}, this.editEvent)
                    this.events.push(temp)
                    this.editEvent.title = ''
                    this.editEvent.date = ''
                    this.editEvent.remain = ''
                    this.editEvent.remark = ''
                    this.editEvent.desc = ''


                }
            },
            delEvent(id, index){
                let confirm = window.confirm('是否删除？')
                if (!confirm) return false
                this.sendDel(id, index)
            },
            async sendDel(id, index){
                let res = await event('DELETE', id)
                if (res.errorCode == '0') {
                    this.$message('删除成功！')
                    this.events.splice(index, 1)
                }
            }
        }
    };
</script>
