<template>
    <div class="spec-container">
        <div class="title">
            <p>必选/单选</p>
        </div>
        <dl style="display: flex;clear: both">
            <p>新增</p>
            <input class="el-button el-button--small" size="mini" placeholder="规格名称" style="width: 100px;margin-left: 10px;" v-model="addRow.name"/>
            <input class="el-button el-button--small" size="mini" placeholder="选项" style="width: 100px;margin-left: 10px;" v-model="addRow.options[0].item"/>
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
                {{option.item}}
            </el-tag>
            <input
                class="el-button el-button--small"
                v-if="currentIndex == index"
                v-model="addItem.item"
                @keyup.enter="handleInputConfirm(index)"
                placeholder="选项名称"
                style="width: 100px;"
            />
            <el-button v-if="currentIndex !== index" class="button-new-tag" size="small" @click="currentIndex = index">+选项</el-button>
        </dl>


        <div>
            <table id="spec_input_tab" class='table'>
                <tbody>
                <tr class="title">
                    <td v-for="row in list">{{row.name}}</td>
                    <td>价格</td>
                </tr>
                <tr v-for="g in group">
                    <td v-for="i in g.key_name">{{i}}</td>
                    <td><input class="el-input__inner" v-model="g.price"/></td>
                </tr>
                </tbody>
            </table>


        </div>
    </div>
</template>
<style scoped>
    .spec-container>.title {
        background-color: #eef1f6;
        display: flex;
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
    /*.spec-container .title {*/
        /*border: 1px solid #bfcbd9;*/
        /*border-radius: 3px;*/
        /*background-color: #eef1f6;*/

    /*}*/
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
        /*padding: 10px 15px;*/
        /*border-radius: 4px;*/
    }
    .el-input{
        width: 100px;
    }

    /*.row {*/
        /*display: flex;*/
        /*align-items: center;*/
        /*margin: 10px;*/
    /*}*/

    /*.row p {*/
        /*margin: 10px;*/
    /*}*/
</style>
<script>

    export default {
        components: {},
        data(){
            return {
                list: [],
                inputVisible: false,
                inputValue: '',
                addRow:{
                    name:'',
                    options:[
                        {
                            'item':'',
                            'price':0,

                        }
                    ]
                },
                currentIndex:-1,
                group:this.item.items_price,

            }
        },
        props: ['item'],
        mounted(){
            //生成笛卡儿积
            this.list = this.item.items
//            this.list.sort((a, b) => {
//                return a.options.length - b.options.length
//            })


        },
        updated(){
            console.log(this.group)
        },

        computed: {
            addItem(){
                if(this.currentIndex == -1){
                    return {'item':'','name':''}
                }
                return {'item':'','name':this.item.items[this.currentIndex].name}

            }
        },
        methods: {
            refashGroup(){
                //重新计算group
                let array = []
                let arr = []
                this.list.forEach((e) => {
                    array.push(e.options)
                })
                arr = this.descartes(array)
                array = []
                arr.forEach((e,i)=>{
                    array[i] = {}
                    array[i].price = 0
                    array[i].key_name = []
                    e.forEach((element) => {
                    array[i].key_name.push(element.item)
                    })
                })
                return array
            },
            addSpec(){
                if (!this.addRow.name || !this.addRow.options[0].item) {
                    this.$message.error('规格名称或选项名称不能为空！')
                    return false
                }
                let temp = $.extend(true,{},this.addRow)
                this.list.push(temp)
                this.addRow = {
                    'name': '',
                    'options': [
                        {
                            'item': '',
                            'price':0,
                        }
                    ]
                }

                this.group = this.refashGroup()
            },
            handleClose(index,i) {
                let confirm = window.confirm('是否删除？')
                if(!confirm)  return false
                //删除group里面的选项
                let temp = []
                this.group.forEach((e) => {
                    if($.inArray(this.list[index].options[i].item,e.key_name) == -1){
                        temp.push(e)
                    }
                })
                this.group = temp
                this.list[index].options.splice(i, 1)
                //检查该行还有没有选项，没有就删除
                if(!this.list[index].options.length){
                    this.list.splice(index, 1)
                    //删除选项后重新计算group
                    this.group = this.refashGroup()
                }

            },



            handleInputConfirm(index) {
                //检查是否重名
                for(let i in this.list[index].options){
                    if(this.list[index].options[i].item == this.addItem.item){

                        this.$message.error('选项名称重复！')
                        return false

                    }
                }
                //改变group
                //jquery 深拷贝
                let item = $.extend(true, {}, this.addItem)
                //清空addItem
                this.currentIndex = -1
                this.list[index].options.push(item)
                let temp = []
                //深拷贝
                temp = JSON.parse(JSON.stringify(this.item.items));
                let array = []
                temp[index].options = [item]
                temp.forEach((e) => {
                    array.push(e.options)
                })
                temp = this.descartes(array)
                let arr = []

                for(let i in temp){
                    arr[i] = {'name':'','key_name':[],'price':0}
                    arr[i].name = item.name
                    temp[i].forEach((e)=>{
                        arr[i].key_name.push(e.item)
                    })

                this.group.push(arr[i])
                }


            },
            descartes(list){
                //清除空选项
                var array = []
                list.forEach((e,i,arr)=>{
                    if(e.length){
                        array.push(e)
                    }
                })
                list = array
                //parent上一级索引;count指针计数
                var point = {};
                var result = [];
                var pIndex = null;
                var tempCount = 0;
                var temp = [];
                //根据参数列生成指针对象
                for (var index in list) {
                    if (typeof list[index] == 'object') {
                        point[index] = {'parent': pIndex, 'count': 0}
                        pIndex = index;
                    }
                }
                //单维度数据结构直接返回
                if (pIndex == null) {
                    return list;
                }
                //动态生成笛卡尔积
                while (true) {
                    for (var index in list) {
                        tempCount = point[index]['count'];
                        temp.push(list[index][tempCount]);
                    }
                    //压入结果数组
                    result.push(temp);
                    temp = [];
                    //检查指针最大值问题
                    while (true) {
                        if (point[index]['count'] + 1 >= list[index].length) {
                            point[index]['count'] = 0;
                            pIndex = point[index]['parent'];
                            if (pIndex == null) {
                                return result;
                            }
                            //赋值parent进行再次检查
                            index = pIndex;
                        }
                        else {
                            point[index]['count']++;
                            break;
                        }
                    }
                }
            },
            hbdyg() {
                var tab = document.getElementById("spec_input_tab"); //要合并的tableID

                var maxCol = 2, val, count, start;  //maxCol：合并单元格作用到多少列
                if (tab != null) {
                    for (var col = maxCol - 1; col >= 0; col--) {
                        count = 1;
                        val = "";
                        for (var i = 0; i < tab.rows.length; i++) {
                            if (val == tab.rows[i].cells[col].innerHTML) {
                                count++;
                            } else {
                                if (count > 1) { //合并
                                    start = i - count;
                                    tab.rows[start].cells[col].rowSpan = count;
                                    for (var j = start + 1; j < i; j++) {
                                        tab.rows[j].cells[col].style.display = "none";
                                    }
                                    count = 1;
                                }
                                val = tab.rows[i].cells[col].innerHTML;
                            }
                        }
                        if (count > 1) { //合并，最后几行相同的情况下
                            start = i - count;
                            tab.rows[start].cells[col].rowSpan = count;
                            for (var j = start + 1; j < i; j++) {
                                tab.rows[j].cells[col].style.display = "none";
                            }
                        }
                    }
                }
            }

        }


    }
</script>

<style scoped>

</style>
