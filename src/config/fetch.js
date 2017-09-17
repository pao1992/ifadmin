import {baseUrl} from './env'
//引入需要增加token的路径，在改路径下header统一发送带参数
import {tokenPaths} from './setting'
import {getStore} from './mUtils'
export default async(type = 'GET', url = '', query , data = {}, method = 'fetch') => {
    type = type.toUpperCase();
    url = baseUrl + url;
    if(typeof(query) == 'string' || typeof(query) == 'number'){
        url = url + '/' + query;
    }else{
        let queryStr = ''; //数据拼接字符串
        Object.keys(query).forEach(key => {
            queryStr += key + '=' + query[key] + '&';
        })

        if (queryStr !== '') {
            queryStr = queryStr.substr(0, queryStr.lastIndexOf('&'));
            url = url + '?' + queryStr;
        }
    }

    if (window.fetch && method == 'fetch') {
        //如果路径在tokenPath内，那么就带上token

        let headers = {}
        if($.inArray(getStore('pageName'),tokenPaths)>-1){
            headers['token'] = getStore('token')
        }
        headers['Accept'] = 'application/json'
        headers['Content-Type'] = 'application/json'
        let requestConfig = {
            credentials: 'include',
            method: type,
            headers: headers,
            mode: "cors",
            cache: "force-cache"
        }

        if (type == 'POST' || type == 'PUT') {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }

        try {
            var response = await fetch(url, requestConfig);
            var responseJson = await response.json();
        } catch (error) {
            throw new Error(error)
        }
        return responseJson
    } else {
        let requestObj;
        if (window.XMLHttpRequest) {
            requestObj = new XMLHttpRequest();
        } else {
            requestObj = new ActiveXObject;
        }

        let sendData = '';
        if (type == 'POST' || type == 'PUT') {
            console.log(data)
            sendData = JSON.stringify(data);
        }

        requestObj.open(type, url, true);
        requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        requestObj.send(sendData);

        requestObj.onreadystatechange = () => {
            if (requestObj.readyState == 4) {
                if (requestObj.status == 200) {
                    let obj = requestObj.response
                    if (typeof obj !== 'object') {
                        obj = JSON.parse(obj);
                    }
                    return obj
                } else {
                    throw new Error(requestObj)
                }
            }
        }
    }
}
