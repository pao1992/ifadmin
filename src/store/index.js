import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	currentEvent:{},
    product:{
        type:'',
        product_name:'',
        product_name_en:'',
        category_id:null,
        category_path:[],
        shop_price:null,
        desc:'',
        numSet: '',
        pic_thumb:'',
        pic_original:'',
        from:null,
        num: [1, 1, 1],
        spec:{
            'required_single':{
                'items':[],
                'items_price':[],
                'num_related':true
            },
            'unrequired_single':{
                'items':[],
                'num_related':false
            },
            'unrequired_multiple':{
                'items':[],
                'num_related':false
            },
            'required_multiple':{
                'items':[],
                'num_related':false
            }

        }
    },

}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})
