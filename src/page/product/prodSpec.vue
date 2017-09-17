<template>
    <div>
        <div class="" v-for="item in product.spec">
            <div :is="item.tpl_type" :item="item"></div>

        </div>
    </div>
</template>
<style scoped>
    p {
        font-size: 14px;
        color: #5e6d82;
        line-height: 1.5em;
    }

    .spec-container .title {
        border: 1px solid #bfcbd9;
        border-radius: 3px;
        background-color: #eef1f6;

    }

    .spec-container .title {
        background-color: #eef1f6;
        display: flex;
        padding: 10px;

    }

    .row {
        display: flex;
        align-items: center;
        margin: 10px;
    }

    .row p {
        margin: 10px;
    }
</style>
<script>
    import {products} from 'src/service/tempdata/product'
    import {default as required_single} from './specTpl/required_single'
    import {default as required_multiple} from './specTpl/required_multiple'
    import {default as unrequired_single} from './specTpl/unrequired_single'
    import {default as unrequired_multiple} from './specTpl/unrequired_multiple'

    export default {
        components: {},
        data(){
            return {
                product: {}
            }
        },
        components:{
            required_single,
            required_multiple,
            unrequired_single,
            unrequired_multiple
        },
        props: ['id'],
        mounted(){
            products.forEach((e, i, arr) => {
                if(e.product_id == this.id)
                {
                    this.product = e
                    return false
                }
            })
        },
        computed: {},
        methods: {
            onSubmit(){

            }
        }
    }
</script>

<style scoped>

</style>
