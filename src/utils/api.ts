import axios from 'axios'

const baseURL = "https://api.ezixkbgn.top"

const api = axios.create({
    baseURL,
    headers: {'content-type': 'application/x-www-form-urlencoded'},
})

const POST = (url: string, params = {}) => {
    return new Promise((resolve, reject) => {
        api.post(url, params).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

// 获取24小时k线数据
export const getkdata = (params = {}) => POST('/market/kdata24h', params)

// 获取首页头部中间显示的三个加密货币
export const getHomeTop = (params = {}) => POST('/market/headerCoin', params)

// 获取首页展示的加密货币列表
export const get_coin_list = (params = {}) => POST('/market/coinList', params)

// 获取图标
export const get_icon = (params = {}) => POST('/market/coinIcon', params)

// 登录
export const userInfo = (params = {}) => POST('/user/info', params)

// 获取授权地址
export const getApprove = (params = {}) => POST('/user/getApprove', params)

// 获取充值地址
export const getDeposit = (params = {}) => POST('/user/getDeposit', params)




// https://cb.ezixkbgn.top/api/market/tickers
// https://cb.ezixkbgn.top/api/market/ticker
// https://cb.ezixkbgn.top/api/market/books
// https://cb.ezixkbgn.top/api/market/booksLite
// https://cb.ezixkbgn.top/api/market/candles
// https://cb.ezixkbgn.top/api/market/historyCandles
// https://cb.ezixkbgn.top/api/market/trades
// https://cb.ezixkbgn.top/api/market/historyTrades
// 返回格式：
// {
//     'status': 1,// 1正确，0错误，0的时候data字段为空
//     'data': [] // 具体返回格式参考https://www.okx.com/docs-v5/zh/#order-book-trading-market-data-get-tickers
// }
import { showNotify } from 'vant';
const http = axios.create({
    baseURL: 'https://cb.ezixkbgn.top/api',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
})
http.interceptors.response.use((response) => {
    const status = response.status;
    const data = response.data
     console.log(response,6666666)
    if (status == 200) {
        if(data.status == 1){
            if(response.data.data)
                return response.data.data
            else return response.data
        }else{
            return response.data
            //showNotify({ type: 'danger', message: 'error' });
        }
    }else {
        showNotify({ type: 'danger', message: 'error' });
    }
}, function (err) {
    return Promise.reject(err)
});




export default http





