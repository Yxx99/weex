<template>
    <van-nav-bar title="托管订单" left-arrow :border="false">
      <template #left >
        <img class="backIcon" src="/src/assets/products/backIcon.png" alt="" @click="backEven">
      </template>
    </van-nav-bar>
    <div class="tabs">
        <div class="tabs-item" :class="{ active: !tabCur }" @click="() => tabCur = 0">进行中</div>
        <div class="tabs-item" :class="{ active: tabCur }" @click="() => tabCur = 1">已结束</div>
    </div>
    <div class="list">
        <div class="list-item" v-for="item in list" :key="item.id">
            <div class="header">
                <div class="title">{{ item.title }}</div>
                <div class="status" :class="`status-${item.status}`">{{ statusJson[item.status] }}</div>
            </div>
            <div class="body">
                <div class="item">
                    <div class="title">托管金额(USDT)</div>
                    <div class="value">{{ item.money }}</div>
                </div>
                <div class="item">
                    <div class="title">每日收益</div>
                    <div class="value">{{ item.rate }}</div>
                </div>
                <div class="item">
                    <div class="title">周期</div>
                    <div class="value">{{ item.day }}天</div>
                </div>
            </div>
            <div class="footer">{{ item.date }}</div>
        </div>
        <div class="more" v-show="list.length < total" @click="()=>(params.page++,getList())">加载更多</div>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const Router = useRouter()
const tabCur = ref(0)
const statusJson = {
    1: '待开始',
    2: '进行中',
    3: '已结束',
}
const list = ref(<any>[])
const total = ref(0)
const params = reactive({
    page: 1,
    size: 5
})
const getList = () => {
    total.value = 10
    list.value = [{
        id: 1,
        title: 'quantification',
        status: 1,
        money: 500,
        rate: '3%',
        day: 3,
        date: '2023-08-29 23:16:51'
    }, {
        id: 2,
        title: 'quantification',
        status: 2,
        money: 500,
        rate: '3%',
        day: 3,
        date: '2023-08-29 23:16:51'
    }, {
        id: 3,
        title: 'quantification',
        status: 3,
        money: 500,
        rate: '3%',
        day: 3,
        date: '2023-08-29 23:16:51'
    }, {
        id: 4,
        title: 'quantification',
        status: 1,
        money: 500,
        rate: '3%',
        day: 3,
        date: '2023-08-29 23:16:51'
    }, {
        id: 5,
        title: 'quantification',
        status: 1,
        money: 500,
        rate: '3%',
        day: 3,
        date: '2023-08-29 23:16:51'
    }, {
        id: 6,
        title: 'quantification',
        status: 1,
        money: 500,
        rate: '3%',
        day: 3,
        date: '2023-08-29 23:16:51'
    }, {
        id: 7,
        title: 'quantification',
        status: 1,
        money: 500,
        rate: '3%',
        day: 3,
        date: '2023-08-29 23:16:51'
    }]
}
getList();

const backEven = () => {
    Router.back()
}
</script>

<style lang="scss" scoped>
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



</style>
