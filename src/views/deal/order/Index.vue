<template>
    <van-nav-bar title="交易订单" left-arrow :border="false">
      <template #left >
        <img class="backIcon" src="/src/assets/products/backIcon.png" alt="" @click="backEven">
      </template>
    </van-nav-bar>
    <div class="tabs">
        <div class="tabs-item" :class="{ active: !tabCur }" @click="finishEven(0)">等待中</div>
        <div class="tabs-item" :class="{ active: tabCur }" @click="finishEven(1)">已结束</div>
    </div>
    <div>
      <div  class="list" v-if="list.length">
          <div class="list-item" v-for="(item,index) in list" :key="`item${index}`">
            <div class="flex">
              <h6 class="name">
                <em :class="item.roseStatr== 1? 'acitve':''"> {{item.roseStatr == 1 ?'买涨':'买跌'}}</em>
                <img src="src/assets/products/money.png">
                <span>{{item.coin}} {{item.seconds}}S</span>
              </h6>
              <span class="statrStyle" :class="item.status=='0'? 'statrActive':''">{{item.status=="0"?'未完成':'已完成'}}</span>
            </div>
            <div class="sum">
               <h4>{{item.profit || 0}} {{item.coin || 'USDT'}}</h4>
               <span>盈亏数额</span>
            </div>
            <div class="infoList">
              <div class="info-item">
                <div><span>{{item.amount||0.00}}</span> <em>下注金额</em></div>
                <div><span>{{item.begin_price||0}}</span> <em>买入价</em></div>
                <div><span>{{item.incr_percent||0}}</span> <em>范围%</em></div>
              </div>
              <div class="info-item">
                <div><span>{{item.odds||0}}</span> <em>赔率</em></div>
                <div><span>{{item.end_price ||0}}</span> <em>卖出价</em></div>
                <div><span>{{item.incr_percent || 0}}</span> <em>涨跌幅%</em></div>
              </div>
              <div class="info-item">
                <div><span>{{formatDate(item.addtime* 1000||'未知')}}</span> <em>买入时间</em></div>
                <div><span>{{formatDate(item.endtime * 1000||'未知')}}</span> <em>卖出时间</em></div>
              </div>
            </div>

          </div>
          <div class="more" v-show="list.length < total" @click="()=>(params.page++,getList())">加载更多</div>
      </div>
      <div  class="NoList" v-else><img src='/src/assets/products/nopic1.png'>暂无数据</div>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import http from "@/utils/api";
import { formatDate } from "@/utils/utils"
import {showNotify} from "vant";

const Router = useRouter()
const tabCur = ref(0)
const statusJson = {
    1: '进行中',
    2: '已结束',
}
const list = ref(<any>[])
const total = ref(0)
const params = reactive({
    page: 1,
    size: 5
})
const backEven = () => {
    Router.back()
}
//交易订单  进行中
const paramsGetodds = {
  account: "0x005c0d3905d26ccde047d8c1dd9603a8a205e929"
}
const getList = async () => {
  const data = await http.get('/trade/getRunningTrade', { params: paramsGetodds })
   list.value = []
   list.value = data
}
//已结束
const getBetResult = async () => {
  const data = await http.get('/trade/getBetResult', { params: paramsGetodds })
  list.value = []
  list.value = data
}

const finishEven = (index)=>{
  tabCur.value = index
  if(index== 1){
    getBetResult()
  }else{
    getList();
  }
}
getList();


</script>

<style lang="scss" scoped>
.NoList{
  text-align: center;
   margin-top: 40px;
   color: #999;

  img{
    display: block;
    width: 80px;
    height: 80px;
    margin: 0 auto;


  }
}
.tabs {
    display: flex;
    .tabs-item {
        flex: 1;
        text-align: center;
        border-bottom: 3px solid #ccc;
        height: 46px;
        line-height: 46px;
    }

    .active {
        color: rgb(99, 157, 153);
        border-color: rgb(99, 157, 153);
        font-weight: 500;
    }
}
.name{
  text-align: left;
  img{
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin-left: 10px
  }
  span {
    display: inline-block;
    padding-left: 10px;
    font-size: 17px;
    font-weight: bold;
    vertical-align: middle;
  }
  em{
    font-size: 14px;
    font-weight: bold;
    vertical-align: middle;
    padding: 3px;
    color:#EF5044;
    background:#FFE9E6;
    border-radius: 4px;
  }
  .acitve{
    color:rgb(99, 157, 153);;
    background:#DCF0F3;
  }
}
.list {
    height: calc(100vh - 92px);
    overflow-y: auto;
    padding-bottom: 40px;
    .list-item {
        margin: 16px 16px;
        //padding: 10px 16px;
        border-bottom:  1px solid #f4f4f4;
        //border-radius: 8px;
        //box-shadow: 0px 2px 12px rgba($color: #000000, $alpha: 0.1);
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title {
            font-size: 18px;
            font-weight: 500;
        }

        .status {
            border-radius: 4px;
            color: #fff;
            padding: 4px 8px;
            font-size: 12px;
        }

        .status-1 {
            background-color: #909399;
        }

        .status-2 {
            background-color: #67C23A;
        }

        .status-3 {
            background-color: #F56C6C;
        }
    }

    .body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0;

        .title {
            color: #909399;
        }

        .value {
            font-size: 18px;
            font-weight: 500;
        }
    }

    .footer {
        color: #909399;
    }

    .more {
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        margin: 16px auto 0;
        border-radius: 6px;
        background-color: rgb(99, 157, 153);
        ;
    }
}
.sum{
  color: #999;
  font-size: 14px;
  margin-top:10px;
  h4{
    font-size: 18px;
    font-weight: bold;
    color: rgb(99, 157, 153);
  }
}
.sumActive{
  color: #999;
  font-size: 14px;
  margin-top:10px;
  h4{
    font-size: 18px;
    font-weight: bold;
    color: rgb(99, 157, 153);
  }
}
.statrStyle{
  padding: 3px 5px;
  background:rgb(99, 157, 153);
  color: #fff;
  border-radius: 4px;
}
.statrActive{
   background:#EF5044;
}
.infoList{
  .info-item{
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    text-align: center;
    align-items: center;
    span{
      display: block;
      font-size: 18px;
      font-weight: bold;
      color: #666;

    }
    em{
      font-size: 14px;
      color:#999;
    }
  }

}


</style>
