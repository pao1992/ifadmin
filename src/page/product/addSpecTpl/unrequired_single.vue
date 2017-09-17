<template>
    <div class="spec-container">
        <div class="title">
            <p>可选/单选</p><el-checkbox v-model="spec.num_related">是否与数量关联？</el-checkbox>
        </div>
        <dl style="display: flex;clear: both">
            <p>新增</p>
            <input class="el-button el-button--small" size="mini" placeholder="规格名称" style="width: 100px;margin-left: 10px;" v-model="addRow.name"/>
            <input class="el-button el-button--small" size="mini" placeholder="选项名称" style="width: 100px;margin-left: 10px;" v-model="addRow.options[0].item"/>
            <input type="number" class="el-button el-button--small" size="mini" placeholder="价格" style="width: 100px;margin-left: 10px;" v-model="addRow.options[0].price"/>
            <el-button class="button-new-tag" size="small" @click="addSpec">新增</el-button>

        </dl>
        <dl v-for="(row,index) in list">
            <p>{{row.name}}</p>
            <el-tag
                :key="option"
                v-for="(option,i) in row.options"
                :closable="true"
                :close-transition="false"
                @close="handleClose(index,i)"
                type="danger"
            >
                {{option.item}}(￥{{option.price}})
            </el-tag>
            <input
                class="el-button el-button--small"
                v-if="currentIndex == index"
                v-model="addItem.item"
                @keyup.enter="handleInputConfirm(index)"
                placeholder="选项名称"
                style="width: 100px;"
            />
            <input
                class="el-button el-button--small"
                v-if="currentIndex == index"
                v-model="addItem.price"
                @keyup.enter="handleInputConfirm(index)"
                placeholder="价格"
                type="number"
                style="width: 100px;"
            />
            <el-button v-if="currentIndex !== index" class="button-new-tag" size="small" @click="currentIndex = index">+选项</el-button>
        </dl>


        <div>

        </div>
    </div>
</template>
<style scoped>
    .spec-container>.title {
        background-color: #eef1f6;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;

    }
    p {
        font-size: 14px;
        color: #5e6d82;
        line-height: 1.5em;
    }
    table{
        font-size: 14px;
        color: #5e6d82;
        text-align: center;
    }
    table .title{
        background-color: #eef1f6;
    }
    table td{
        padding: 10px 20px 10px 20px;
    }
    dl{
        display: flex;
        align-items: center;
        margin: 10px;
    }

    dl>*{
        margin: 5px;
    }
    .button-new-tag{
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #bfcbd9;
        color: #1f2d3d;
    }
    .el-input{
        width: 100px;
    }

</style>
<script type="text/ecmascript-6">
    import {mapState,mapMutations} from 'vuex'
    export default {
        components: {},
        data(){
            return {
                spec:{
                    'num_related':false
                },
                list: [],
                inputVisible: false,
                inputValue: '',
                addRow: {
                    name: '',
                    options: [
                        {
                            'item': '',
                            'price': null,

                        }
                    ]
                },
                currentIndex: -1

            }
        },
        mounted(){
            this.spec =this.product.spec['unrequired_single']
            this.list = this.spec.items

        },
        updated(){
        },

        computed: {
            ...mapState(['product']),
            addItem(){
                if (this.currentIndex == -1) {
                    return {'item': '', 'name': '', 'price': null}
                }
                return {'item': '', 'name': this.list[this.currentIndex].name, 'price': null}

            }

        },
        watch: {
            spec:{
                handler:function(){
                    this.addToVuex()
                },
                deep:true
            }
        },
        methods: {
            ...mapMutations(['UPDATE_SPEC']),
            addSpec(){
                if (!this.addRow.name || !this.addRow.options[0].item || !this.addRow.options[0].price) {
                    this.$message.error('规格名称或选项名称不能为空！')
                    return false
                }
                let temp = $.extend(true, {}, this.addRow)
                this.list.push(temp)
                this.addRow = {
                    'name': '',
                    'options': [
                        {
                            'item': '',
                            'price': null,
                        }
                    ]
                }
            },
            handleClose(index, i) {
                let confirm = window.confirm('是否删除？')
                if (!confirm)  return false
                //删除
                this.list[index].options.splice(i, 1)
                //检查该行还有没有选项，没有就删除
                if (!this.list[index].options.length) {
                    this.list.splice(index, 1)
                }


            },
            handleInputConfirm(index) {
                //检查是否重名
                for (let i in this.list[index].options) {
                    if (this.list[index].options[i].item == this.addItem.item) {

                        this.$message.error('选项名称重复！')
                        return false

                    }
                }
                if (!this.addItem.item || !this.addItem.price) {
                    this.$message.error('规格名称或选项名称不能为空！')
                    return false
                }
                //新增
                let temp = $.extend(true, {}, this.addItem)
                this.list[index].options.push(temp)

            },
            //整理并提交新数据到vuex
            addToVuex() {
                let data = {}
                data.num_related = this.spec.num_related
                data.items = this.list
                data.required = 0
                this.UPDATE_SPEC({type: 'unrequired_single', data: data})
            }
        }

    }
</script>

<style scoped>

</style>
