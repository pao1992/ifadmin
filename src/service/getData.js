import fetch from '../config/fetch'


/**
 * 创建临时数据
 */
const setpromise = data => {
	return new Promise((resolve, reject) => {
		resolve(data)
	})
}

/**
 * 获取首页默认地址
 */

var category = (type,query,data) => fetch(type, "/category",query,data)
var categoryTree = (type,query,data) => fetch(type, "/category/tree",query,data)
var product = (type,query,data) => fetch(type, "/product",query,data)
var order = (type,query,data) => fetch(type, "/order",query,data)
var orderByPage = (type,query,data) => fetch(type, "/order/paginate",query,data)
var event = (type,query,data) => fetch(type, "/event",query,data)
var banner = (type,query,data) => fetch(type, "/banner",query,data)
var system = (type,query,data) => fetch(type, "/system",query,data)
var coupon = (type,query,data) => fetch(type, "/coupon",query,data)
var userCoupon = (type,query,data) => fetch(type, "/userCoupon",query,data)
var getAllCoupons = (type,query,data) => fetch(type, "/coupon/all",query,data)
var user = (type,query,data) => fetch(type, "/user",query,data)
var userByFilter = (type,query,data) => fetch(type, "/user/by_filter",query,data)
var card = (type,query,data) => fetch(type, "/card",query,data)
var cardUsers = (type,parma,query,data) => fetch(type, "/card/"+parma.id+"/user",query,data)
var cardDiffUsers = (type,parma,query,data) => fetch(type, "/card/"+parma.id+"/diff_user",query,data)
var cardBinding = (type,parma,query,data) => fetch(type, "/card/"+parma.id+'/bind_user/'+parma.user_id,query,data)

//次卡





/**
 * 以下Api接口不需要进行反向代理
 */

var sendLogin = (code, mobile, validate_token) => setpromise(login.userInfo);

export {category,categoryTree,product,order,
    orderByPage,event,banner,system,coupon,userCoupon,
    getAllCoupons, user, userByFilter,card,cardUsers,cardDiffUsers,cardBinding}
