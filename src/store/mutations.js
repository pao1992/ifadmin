import {
    ADD_EVENT,
    UPDATE_SPEC,
    UPDATE_PRODUCT,
} from './mutation-types.js'

import {
	setStore,
	getStore
} from '../config/mUtils'

export default {
    // 保存分类信息
    [ADD_EVENT](state, event) {
        state.currentEvent = event;
        setStore('currentEvent', state.currentEvent);
    },
    [UPDATE_SPEC](state, obj) {
        if(obj){
            state.product.spec[obj.type] = obj.data
        }
        // setStore('currentEvent', state.currentEvent);
    },
    [UPDATE_PRODUCT](state, obj) {
        for(let key in obj){
            state.product.hasOwnProperty(key) && (state.product[key] = obj[key])
        }
        // setStore('currentEvent', state.currentEvent);
    },
}
