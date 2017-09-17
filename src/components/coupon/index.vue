<template>
    <div>
        <div>
            <div class="stamp" :style="{backgroundColor: (color ? color : 'inherit')}">
                <div class="stamp-left"></div>
                <div class="stamp-middle">
                    <div class="par">
                        <p class="title">{{title?title:'请输入优惠券标题'}}</p>
                        <span class="price"><slot name="price">请输入价格信息</slot></span>
                        <span></span>
                        <slot name="desc">请输入该券描述</slot>
                    </div>
                    <div class="copy">
                        <p>使用时间</p>
                        <p class="date">{{start}} 至<br>{{end}}</p>

                        <el-button size="small">{{btn}}</el-button>
                    </div>
                </div>
                <div class="stamp-right"></div>
            </div>
        </div>
        <vue-event-calendar :events="events"></vue-event-calendar>
        <foot-guide></foot-guide>

    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {}
        },
        props: {
            to: [String, Object],
            title: String,
            isLink: Boolean,
            value: {},
            price: [String, Number],
            start: String,
            end: String,
            color: String,
            btn: String,

        },
        components: {},
        mounted(){
        },
        methods: {}
    }
</script>
<style scoped>
    /*优惠券*/
    .stamp {
        width: 400px;
        height: 150px;
        display: flex;
        margin: 20px;
        overflow: hidden;
        font-size: 12px;
    }

    .stamp-left {
        width: 10px;
        height: 100%;
        background: radial-gradient(rgba(255, 255, 255, 1) 0, rgba(255, 255, 255, 1) 8px, rgba(0, 0, 0, 0) 8px);
        background-size: 22px 22px;
        background-position: -12px 0px;
        z-index: 99;
    }

    .stamp-middle {
        display: flex;
        justify-content: space-between;
        color: white;
        width: 100%;
        height: 100%;
    }

    .stamp-middle .par {
        padding: 15px;
        width: 65%;
        height: 100%;
        border-right: dashed white 2px;
        font-size: 12px;
    }

    .stamp-middle .par .title {
        text-align: center;
        font-size: 12px;
    }

    .stamp-middle .par .price {
        text-align: center;
        display: block;
        margin: 10px;
    }

    .stamp-middle .copy {
        padding: 15px;
        width: 30%;
        height: 100%;
    }

    .stamp-middle .copy .date {
        margin: 10px 0px 10px 0px;
    }

    .stamp-right {
        width: 10px;
        height: 100%;
        background: radial-gradient(rgba(255, 255, 255, 1) 0, rgba(255, 255, 255, 1) 8px, rgba(0, 0, 0, 0) 8px);
        background-size: 22px 22px;
        background-position: 0px 0px;
        z-index: 99;
    }
</style>

