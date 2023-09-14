<template>
    <van-nav-bar title="交易" left-arrow @click-left="back" :border="false">
        <template #left>
            <img class="backIcon" src="/src/assets/products/backIcon.png" alt="" @click="backEven">
        </template>
        <template #right>
            <van-icon name="description" size="18" @click="orderList()" />
        </template>
    </van-nav-bar>
    <div class="all">
        <div class="price">
            <div class="left">
                <div class="currency"><img class="grIcon" src="/src/assets/products/gn.png">{{ info.instId }}</div>
                <div class="money">{{ info.last }}</div>
                <div class="moneyUSD">${{ calcSub(info.bidPx || 0, info.askPx || 0) }}(-1.11%)</div>
            </div>
            <div class="right">
                <div class="star">
                    <img src="/src/assets/products/star.png">
                </div>
                <div class="highMoney">
                    <span>高</span>
                    <em>{{ info.high24h }}</em>
                </div>
                <div class="highMoney">
                    <span class="">低</span>
                    <em>{{ info.low24h }}</em>
                </div>
                <div class="highMoney">
                    <span>开盘价</span>
                    <em>{{ info.open24h }}</em>
                </div>
            </div>
        </div>
        <div class="header">
        </div>
        <div id="container">
        </div>
    </div>

    <div class="btns">
        <div class="btn" @click="rose">买涨</div>
        <div class="btn btn2" @click="fall">买跌</div>
    </div>
    <!-- 底部弹出 -->
    <van-popup v-model:show="showBottom" closeable round position="bottom" :style="{ height: '70%' }">
        <div class="popupBox">
            <h5 class="title">BTC交割</h5>
            <div class="info">
                <h6 class="name">
                    <img src="src/assets/products/money.png">
                    <span>BTC/USDT</span>
                </h6>
                <div class="content">
                    <em>交割时间</em>
                    <div class="select">
                        <div class="time" @click="() => showTime = true">
                            <span>{{ timeText }}S</span>
                            <van-icon name="arrow-down" />
                        </div>
                        <div class="button">
                            <div class="btn btn1" :class="num == 0 ? 'active' : ''" @click="active(0)">涨</div>
                            <div class="btn btn2" :class="num == 1 ? 'active' : ''" @click="active(1)">跌</div>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <em class="moneyFw">价格范围</em>
                    <div>
                        <div class="cell" @click="radius">
                            <span v-if="Object.keys(incrPercent).length > 0">
                                {{ roseStatr == 1 ? '涨 >|' : '跌>|' }}
                                {{ incrPercent }}
                            </span>
                            <span style="padding-left:20px; color:#666">{{ fieldValue }}</span>
                            <van-icon name="arrow-down" />
                        </div>
                    </div>
                </div>
                <div class="content">
                    <em class="moneyFw">购买金额 </em>
                    <div class="cell usdt">
                        <div class="info">
                            <img class="img" src="src/assets/products/Tether.png" alt="">
                            <div>
                                <div class="cell cellP" @click="coinMoney">
                                    <span>{{ coin }}</span>
                                    <van-icon name="arrow-down" />
                                </div>
                            </div>
                        </div>
                        <input type="text" v-model="buymoney">
                    </div>
                    <div class="moneyText">可用金额: {{ money == '' ? '0.00' : money }}{{ coin }} </div>
                    <van-button block class="btnClass" @click="PlaceOrder()">下单</van-button>
                </div>
            </div>
        </div>
    </van-popup>

    <van-popup v-model:show="showPicker" closeable round position="bottom">
        <div class="radiusClass">
            <div class="title">
                <h5>选择范围</h5>
            </div>
            <div class="hig">
                <div class="list" v-for="(item, index) in columnsField" :key="`item${index}`"
                    @click="columnsEvent(item.incr_percent, item.odds, item.roseStatr)">
                    <div class="col">{{ item.roseStatr == 1 ? "涨" : "跌" }} {{ item.incr_percent }}</div>
                    <div>{{ item.odds }}</div>
                </div>
            </div>

        </div>
    </van-popup>

    <van-popup v-model:show="showTime" closeable round position="bottom">
        <div class="radiusClass">
            <div class="title">
                <h5>交割时间</h5>
            </div>
            <div class="time">
                <!--                <div class="time-item" v-for="item in 10" :key="`time${item}`">{{ item }}s</div>-->
                <div class="time-item" v-for="item in seconds" :key="`time${item}`" @click="itemEvent(item)">{{ item }}</div>
            </div>
        </div>
    </van-popup>

    <van-popup v-model:show="showUsdt" closeable round position="bottom">
        <div class="radiusClass">
            <div class="title">
                <h5>货币类型</h5>
            </div>
            <div class="time">
                <div class="time-item" v-for="item in UsdtList" :key="`time${item}`" @click="usdtEvent(item)">{{ item }}</div>
            </div>
        </div>
    </van-popup>

    <!--交易订单确认框-->
    <van-popup v-model:show="showConfirmation" closeable round position="center" :style="{ width: '300px' }">
        <div class="radiusClass">
            <div class="title">
                <h5>确认订单</h5>
            </div>
            <div class="time confirmIime">
                <h6 class="name">
                    <em> {{ roseStatr == 1 ? '买涨' : '买跌' }}</em>
                    <img src="src/assets/products/money.png">
                    <span>BTC/USDT</span>
                </h6>
                <div>
                    <div class="confirmList"> <span>交割时间</span><em>{{ timeText }}S</em></div>
                    <div class="confirmList"><span>价格范围</span><em>{{ incrPercent }}%</em></div>
                    <div class="confirmList"><span>下注金额</span><em>{{ buymoney }}</em></div>
                </div>
                <van-button block class="btnClass" @click="geBet()">确认订单</van-button>
            </div>

        </div>
    </van-popup>
</template>

<script setup lang='ts'>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const Route = useRoute()
import { KLineChartPro } from '@klinecharts/pro'
import '@klinecharts/pro/dist/klinecharts-pro.css'
import http from "@/utils/api"
import { showNotify } from 'vant';
import { calcSub } from "@/utils/utils"


import { showToast } from 'vant';
const Router = useRouter()
const showBottom = ref(false)
const num = ref(0);
const showPicker = ref(false)
const fieldValue = ref("")  //涨 | >0.05%
const incrPercent = ref("")
const roseStatr = ref(1)
const buymoney = ref(0)
const showTime = ref(false)
const showConfirmation = ref(false)


const infoParams = reactive({
    instId: Route.query.instId || 'BTC-USDT'
})
const info = ref({})
// 获取产品行情信息
const getProductInfo = async () => {
    const { code, data, msg } = await http.get('/market/ticker', { params: infoParams })
    if (code == 0) {
        info.value = data[0]
    } else {
        showNotify({ type: 'danger', message: msg });
    }
}
getProductInfo()

const params = reactive({
    instId: Route.query.instId || 'BTC-USDT',
    bar: '1m', //[1m/3m/5m/15m/30m/1H/2H/4H]
    after: '',
    before: '',
    limit: 100,
})
const kData = ref([])
// 获取交易产品K线数据
const getKLine = async () => {
    const { code, data, msg } = await http.get('/market/candles', { params })
    if (code == 0) {
        return data.map(e => ({
            timestamp: e[0] * 1,
            open: e[1] * 1,
            high: e[2] * 1,
            low: e[3] * 1,
            close: e[4] * 1,
            volume: e[5] * 1,
            turnover: e[6] * 1,
        }))
    } else {
        showNotify({ type: 'danger', message: msg });
    }
}

// 获取时间和赔率
const columnsField = ref()
//时间列表
const timeText = ref('0')
const seconds = ref([])

const paramsGetodds = {
    account: "0x005c0d3905d26ccde047d8c1dd9603a8a205e929"
}
const getodds = async () => {
    const data = await http.get('/trade/getodds', { params: paramsGetodds })
    columnsField.value = data
    data.map(e => {
        seconds.value.push(e.seconds)
    })
}
const itemEvent = (item) => {
    timeText.value = item
    showTime.value = false
}

//获取可用获取余额
const showUsdt = ref(false)
const money = ref(0)
const coin = ref('USDT')
const UsdtList = ref(['USDT', 'BTC', 'ETH', 'ETC'])

const coinMoney = () => {
    showUsdt.value = true
}
const usdtEvent = (item) => {
    coin.value = item
    gettrusteeship() //切换货币 请求一下可用
    showUsdt.value = false
}

const columnsEvent = (incr_percent, odds, rose) => {
    incrPercent.value = incr_percent
    fieldValue.value = odds
    roseStatr.value = rose
    showPicker.value = false
}


const gettrusteeship = async () => {
    const data = await http.post('/trade/getBalance', { account: paramsGetodds.account, coin: coin.value })
    money.value = data
    localStorage.setItem('money', money.value);
}

//下单
const PlaceOrder = async () => {
    if (timeText.value && incrPercent.value && fieldValue.value && coin.value && buymoney.value) {
        showBottom.value = false
        showConfirmation.value = true
    } else {
        showToast("不能为空");
    }
}

const betParams = reactive({
    account: paramsGetodds.account, // 账户
    amount: buymoney,  // 购买金额
    coin: infoParams.instId.split('-')[0], // 当前币
    odds: fieldValue, // 涨跌
    incr_percent: incrPercent, //
    second: timeText, // 交割时间
    buy_coin: infoParams.instId.split('-')[1], // 购买币
})
const geBet = async () => {
    const data = await http.post('/trade/bet', betParams)
    if (data.status == 1) {
        showConfirmation.value = false
        showToast(data.msg);
    } else {
        showToast(data.msg);
    }
}
const orderList = () => {
    Router.push({ path: "/dealOrder" })
}

class CustomDatafeed {
    async getHistoryKLineData(symbol, period, from, to) {
        params.bar = period.params
        params.before = from
        params.after = to
        const data = await getKLine()
        return data
    }
    searchSymbols() { }
    subscribe() { }
    unsubscribe() { }
}
onMounted(() => {
    new KLineChartPro({
        container: 'container',
        locale: 'zh-CN',
        drawingBarVisible: false,
        watermark: '',
        symbol: {},
        period: { multiplier: 15, timespan: 'minute', text: '15min', params: '15m' },
        periods: [
            { multiplier: 1, timespan: 'minute', text: '1min', params: '1m' },
            { multiplier: 5, timespan: 'minute', text: '5min', params: '3m' },
            { multiplier: 15, timespan: 'minute', text: '15min', params: '15m' },
            { multiplier: 30, timespan: 'minute', text: '30min', params: '30m' },
            { multiplier: 1, timespan: 'hour', text: '1h', params: '1H' },
            { multiplier: 2, timespan: 'hour', text: '2h', params: '2H' }
        ],
        subIndicators: ['VOL'], //['VOL', 'MACD']
        datafeed: new CustomDatafeed()
    })
    getodds()
    // geBet()
    gettrusteeship()
})

const backEven = () => {
    Router.back()
}
const rose = () => {
    showBottom.value = true
}
const fall = () => {
    showBottom.value = true
    num.value = 1
}

const radius = () => {
    showPicker.value = true
}
const close = () => {
    showPicker.value = false
}
const active = (index) => {
    num.value = index
}
</script>

<style lang="scss" scoped>
#container {
    height: 500px;
}

.colorBgr {
    color: red;
}

.confirTitle {
    text-align: center;
    //font-size: 17px;
    //font-weight: 500;
    color: red;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #F3F3F3;

    h5 {
        //text-align: left;
        //font-size: 17px;
        font-weight: 500;
    }
}

.confirBox {
    padding: 20px;

    .name {
        text-align: left;
        padding: 15px 20px 10px 20px;

        img {
            width: 20px;
            height: 20px;
            vertical-align: middle;
        }

        span {
            display: inline-block;
            padding-left: 10px;
            font-size: 17px;
            font-weight: bold;
            vertical-align: middle;
        }

        em {
            font-size: 17px;
            font-weight: bold;
        }
    }
}

.name {
    text-align: center;
    padding: 15px 20px 10px 20px;

    img {
        width: 25px;
        height: 25px;
        vertical-align: middle;
    }

    span {
        display: inline-block;
        padding-left: 10px;
        font-size: 17px;
        font-weight: bold;
        vertical-align: middle;
    }
}

.popupBox {
    .title {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        color: #333;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #F3F3F3;
    }



    .content {
        padding: 0px 20px;

        em {
            display: inline-block;
            color: #aaa;
            font-size: 14px;
            margin-top: 12px;
            margin-bottom: 6px;
            padding: 0;
        }

    }

    .select {
        display: flex;
        justify-content: space-between;

        .time {
            width: 100px;
            height: 46px;
            background: #f4f4f4;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;

            span {
                font-weight: 500;
                font-size: 16px;
            }

            .van-icon {
                font-size: 18px;
                color: #ccc;
            }
        }

        .button {
            display: flex;

            .btn {
                width: 90px;
                height: 46px;
                font-size: 16px;
                line-height: 46px;
                text-align: center;
                background: #f4f4f4;
            }

            .btn1 {
                border-top-left-radius: 6px;
                border-top-right-radius: 0;
                border-bottom-left-radius: 6px;
                border-bottom-right-radius: 0;
                clip-path: polygon(0px 0px, 90px 0px, 70px 46px, 0px 46px);
                padding-right: 10px;
            }

            .btn2 {
                border-top-left-radius: 0;
                border-top-right-radius: 6px;
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 6px;
                clip-path: polygon(20px 0px, 90px 0px, 90px 46px, 0 46px);
                margin-left: -16px;
                padding-left: 10px;
            }

            .active {
                background: #29A1B2;
                color: #fff;
            }

        }
    }



    .inputClass {
        background: #F4F3F4;
        margin: 0 0 0 0;
        align-items: center;
        ;
    }

    .moneyText {
        color: #35A5B4;
        font-weight: 450;
        padding: 8px 0;
        font-size: 13px;
    }


}

.btnClass {
    background: #29A1B2;
    color: #fff;
    font-size: 15px;
    text-align: center;
    margin: 10px 0;
    border-radius: 6px;
}

.radiusClass {
    .title {
        width: 100%;
        text-align: center;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #f4f4f4;

        h5 {
            display: inline;
            font-weight: bold;
            font-size: 17px;
        }

        em {
            position: absolute;
            right: 20px;
        }
    }

    .hig {
        height: 200px;
    }

    .list {
        padding: 15px 20px;
        //height: 200px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f4f4f4;

        .col {
            padding-left: 20px;
            color: #29A1B2
        }
    }

    .time {
        padding: 0 20px;
        height: 200px;
        overflow-y: auto;
    }

    .time-item {
        display: block;
        line-height: 40px;
        border-bottom: 1px solid #f4f4f4;
    }

    .confirmIime {
        height: auto;
        padding: 0 20px 20px 20px;
    }
}

.confirmList {
    display: flex;
    justify-content: space-between;
    line-height: 30px;

    span {
        color: #999;
        font-size: 15px;
    }

    em {
        color: #333;
    }
}

.confirmIime .name {
    text-align: left;
    padding: 10px 0;

    em {
        font-size: 17px;
        font-weight: bold;
        margin-right: 20px;
        vertical-align: middle;
        color: #29A1B2;
    }

}

:root .van-cell-group {
    margin: 0;
}

:root .van-dropdown-menu__bar {
    background: #f4f4f4
}

.van-dropdown-menu .van-dropdown-menu {
    background: red
}

:root .field {
    background: #f4f4f4;
    border-radius: 6px;
    height: 50px;
    font-weight: bold;
    font-size: 16px;
}


.cell {
    background-color: #f4f4f4;
    border-radius: 6px;
    padding: 0 16px;
    height: 46px;
    line-height: 46px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
        font-weight: 500;
        font-size: 14px;
        color: #35A5B4;
    }

    .van-icon {
        font-size: 18px;
        color: #ccc;
    }

    &.usdt {
        justify-content: flex-start;

        .img {
            width: 16px;
            height: 16px;
            margin-right: 6px;
        }

        .info {
            display: flex;
            align-items: center;
        }

        input {
            margin-left: 20px;
            border: none;
            height: 26px;
            background-color: transparent;
            flex: 1;
            font-size: 14px;
        }
    }
}

.btns {
    display: flex;
    margin: 40px 0;

    .btn {
        flex: 1;
        height: 40px;
        border-radius: 6px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        font-size: 18px;
        background-color: rgb(99, 157, 174);
        margin: 0 16px;
    }

    .btn2 {
        background-color: rgb(205, 97, 85);
    }
}

:root .van-nav-bar .van-icon {
    color: #333
}

.all {
    margin: 18px;
}

.cellP {
    padding: 0;
}

.grIcon {
    vertical-align: middle;
    width: 20px;
    height: 20px;
    margin-right: 10px;
}

.price {
    display: flex;
    justify-content: space-between;

    .left {
        div {
            margin-bottom: 9px;
        }

        .currency {
            font-weight: bold;
        }

        .money {
            color: #52a1b3;
            font-weight: bold;
            font-size: 29px;
        }

        .moneyUSD {
            color: red;
            font-weight: 400;
        }
    }

    .right {

        div {
            margin-bottom: 9px;
        }

        .star {
            text-align: right;

            img {
                width: 20px;
                height: 20px;
            }
        }

        .highMoney {
            display: flex;
            justify-content: space-between;

            span {
                color: #666;
                font-size: 12px;
            }

            em {
                font-style: normal;
                color: #333;
                font-size: 14px;
                margin-left: 16px;
            }
        }
    }
}</style>
<style>.klinecharts-pro-period-bar .tools,
.klinecharts-pro-period-bar .symbol,
.klinecharts-pro-period-bar .menu-container {
    display: none;
}</style>
