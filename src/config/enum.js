let orderStatus = {
    '0':'未支付',
    '1':'已支付',
    '2':'已失效',
    '3':'交易成功'
}

let couponType = {
    '1':'优惠券',
    '2':'抵价券',
    '3':'体验券',
    '4':'折扣券',
}
//优惠券
let discountCoupon = {
    'type':1,
    'start':'',
    'end':'',
    'orginal_price':'',
    'current_price':'',
    'title':'优惠券',
    'desc':'优惠券描述',
    'num':0,
    'color':'#fff',
}
//抵价券
let reduceCoupon = {
    'type':2,
    'start':'',
    'end':'',
    'discount':'',
    'reduce':'',
    'title':'抵价券',
    'desc':'抵价券描述',
    'num':0,
    'color':'#fff',
}
//体验券
let experienceCoupon = {
    'type':3,
    'start':'',
    'end':'',
    'title':'体验券',
    'desc':'体验券描述',
    'num':0,
    'color':'#fff',
}
//折扣券
let rebateCoupon = {
    'type':4,
    'start':'',
    'end':'',
    'discount':'',
    'title':'折扣券',
    'desc':'折扣券描述',
    'num':0,
    'color':'#fff',
}
export {
    orderStatus,couponType,discountCoupon,reduceCoupon,experienceCoupon,rebateCoupon
}
