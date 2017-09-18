/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
let baseUrl
let routerMode
// const imgBaseUrl = 'http://images.api.com/'
const imgBaseUrl = 'http://static.ifadmin.com/'


if (process.env.NODE_ENV == 'development') {
	baseUrl = 'http://api.ifadmin.com/api/v2'
    // baseUrl = 'http://api.com/api/v2'
	routerMode = 'hash'
}else{
    baseUrl = 'http://api.listudio.cn/api/v2'
    // baseUrl = 'http://api.com/api/v2'
	routerMode = 'hash'
}

export {
	baseUrl,
	routerMode,
    imgBaseUrl
}
