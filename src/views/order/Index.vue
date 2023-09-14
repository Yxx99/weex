<template>
    <van-nav-bar title="托管订单" left-arrow :border="false">
      <template #left >
        <img class="backIcon" src="/src/assets/products/backIcon.png" alt="" @click="backEven">
      </template>
    </van-nav-bar>
    <div class="tabs">
        <div class="tabs-item" :class="{ active: !tabCur }" @click="getOrderList(0)">未完成</div>
        <div class="tabs-item" :class="{ active: tabCur }" @click="getOrderList(1)">已完成</div>
    </div>
    <div class="list">

        <div class="list-item" v-if="list.length" v-for="item in list" :key="item.id">
            <div class="header">
                <div class="title">{{ item.name }}</div>
                <div class="status" :class="`status-${item.status}`">{{ statusJson[item.status] }}</div>
            </div>
            <div class="body">
                <div class="item">
                    <div class="title">托管金额(USDT)</div>
                    <div class="value">{{ item.amount }}</div>
                </div>
                <div class="item">
                    <div class="title">每日收益</div>
                    <div class="value">{{ item.profit }}</div>
                </div>
                <div class="item">
                    <div class="title">周期</div>
                    <div class="value">{{ item.duration }}天</div>
                </div>
            </div>
        </div>
        <div class="more" v-show="list.length < total" @click="()=>(params.page++,getList())">加载更多</div>
        <div class="NoList" v-if="!list.length"><img src='/src/assets/products/nopic1.png'>暂无数据</div>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import http from "@/utils/api";

const Router = useRouter()
const tabCur = ref(0)
const statusJson = {
    0: '未完成',
    1: '已完成',
}
const list = ref(<any>[])
const total = ref(0)
const params = reactive({
    page: 1,
    size: 5
})
//未完成订单
const paramsGetodds = {
  account: "0x005c0d3905d26ccde047d8c1dd9603a8a205e929"
}
const getOrderList = async (index) => {
  const data = await http.post('/quantifition/orderList', {
    account: paramsGetodds.account,
    status:index
  })
  list.value = []
  list.value = data
}
getOrderList(0)


// const getList = () => {
//     total.value = 10
//     list.value = [{
//         id: 1,
//         title: 'quantification',
//         status: 1,
//         money: 500,
//         rate: '3%',
//         day: 3,
//         date: '2023-08-29 23:16:51'
//     }, {
//         id: 2,
//         title: 'quantification',
//         status: 2,
//         money: 500,
//         rate: '3%',
//         day: 3,
//         date: '2023-08-29 23:16:51'
//     }, {
//         id: 3,
//         title: 'quantification',
//         status: 3,
//         money: 500,
//         rate: '3%',
//         day: 3,
//         date: '2023-08-29 23:16:51'
//     }, {
//         id: 4,
//         title: 'quantification',
//         status: 1,
//         money: 500,
//         rate: '3%',
//         day: 3,
//         date: '2023-08-29 23:16:51'
//     }, {
//         id: 5,
//         title: 'quantification',
//         status: 1,
//         money: 500,
//         rate: '3%',
//         day: 3,
//         date: '2023-08-29 23:16:51'
//     }, {
//         id: 6,
//         title: 'quantification',
//         status: 1,
//         money: 500,
//         rate: '3%',
//         day: 3,
//         date: '2023-08-29 23:16:51'
//     }, {
//         id: 7,
//         title: 'quantification',
//         status: 1,
//         money: 500,
//         rate: '3%',
//         day: 3,
//         date: '2023-08-29 23:16:51'
//     }]
// }
// getList();

const backEven = () => {
    Router.back()
}
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

.list {
    height: calc(100vh - 92px);
    overflow-y: auto;
    padding-bottom: 40px;

    .list-item {
        margin: 16px 16px 0;
        padding: 10px 16px;
        border-radius: 8px;
        box-shadow: 0px 2px 12px rgba($color: #000000, $alpha: 0.1);
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

        .status-0 {
            background-color: rgb(99, 157, 153);;
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



</style>
