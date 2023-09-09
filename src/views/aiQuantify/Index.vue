<template>
    <van-nav-bar title="Ai量化" left-arrow  :border="false" >
      <template #left >
        <img class="backIcon" src="/src/assets/products/backIcon.png" alt="" @click="backEven">
      </template>
    </van-nav-bar>
    <div class="list">
       <div class="list-item" v-for="item in list" :key="item.id">
         <div class="header">
           <div class="title">{{ item.title }}</div>
         </div>
         <div class="body">
           <div class="item">
             <div class="title">限额(USDT)</div>
             <div class="value">{{ item.money }} - {{ item.money }}</div>
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
         <div class="footer">
           <div class="logoList">
             <img  v-for="(item,index) in logoIcon" :key="index"  :src="item">
           </div>
         </div>
       </div>
       <div class=" trusteeship boxBackground">
        <h5 class="quanTitle">托管金额</h5>
        <van-cell-group inset  >
          <van-field
              class="inputClass"
              v-model="value1"
              label="USDT"
              left-icon="src/assets/products/Tether.png"
              right-text="全部"
              placeholder="金额"
              label-align="left"
              label-width="40px"
              label-class="leftClass"
              icon-prefix="prefixIcon"
          >
            <template #button>
              <text class="allText">全部</text>
            </template>
          </van-field>
        </van-cell-group>
        <div class="moneyText">可用金额:206,1770 USDT </div>
        <van-button block class="btnClass" @click="btn">立即托管</van-button>
        <div class="Instructions">
          <span><van-icon name="success" />每日收益将发送到您的USDT钱包</span>
          <span><van-icon name="success" />您的托管资金零风险</span>
          <span><van-icon name="success" />您可以在任何时间取回您的资金</span>
          <span><van-icon name="success" />AI机器人365*24小时不间断工作</span>
        </div>
      </div>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const Router = useRouter()
const tabCur = ref(0)
const logoIcon = ref([
  'src/assets/products/money.png',
  'src/assets/products/logo.png',
  'src/assets/products/Tether.png',
  'src/assets/products/eth.png'
])
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
    total.value = 1
    list.value = [{
        id: 1,
        title: 'quantification',
        status: 1,
        money: 500,
        rate: '3%',
        day: 3,
        date: '2023-08-29 23:16:51'
    }]
}
getList();

const back = () => {
    Router.back()
}
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
    height: calc(100vh - 46px);
    overflow-y: auto;
    padding-bottom: 40px;

    .list-item {
        margin: 16px 16px 0;
        padding: 0 16px 16px;
        border-radius: 8px;
        box-shadow: 0px 2px 12px rgba($color: #000000, $alpha: 0.1);
    }

    .header {

        .title {
            font-size: 18px;
            font-weight: 500;
            border-bottom: 1px solid #ddd;
            line-height: 60px;
        }
    }

    .body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 16px 0 10px;

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

        .icons{
            background-color: rgb(238,247,247);
            border-radius: 6px;
            padding: 8px;
            display: flex;
            span{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: #ccc;
                display: block;
                margin-right: 10px;
            }
        }
        .button{
            background-color: #29A1B2;
            border-radius: 6px;
            margin-top: 16px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            font-size: 18px;
        }
    }

}
.trusteeship{
  margin: 18px;
  h5{
    margin-bottom: 10px
  }
}
.allText{
  color:#35A5B4;
  font-weight: bold;
}
.inputClass{
  background:#F4F3F4;
  margin: 0 0 0 0;
  align-items: center;;
}
.leftClass{
  color:red
}
:root .van-cell-group{
  margin: 0;
}
:root .van-icon{
  color: #35A5B4;
  font-size: 15px;
  padding-right: 10px;
}
.moneyText{
  color:#35A5B4;
  font-weight: 450;
  padding: 8px 0;
  font-size: 13px;
}
.btnClass{
  background: #29A1B2;
  color:#fff;
  font-size: 15px;
  text-align: center;
  margin: 10px 0;
  border-radius: 5px;
}
.Instructions{
  color:#333;
  line-height: 30px;
  span{
    display:inline-block;
  }
}
.logoList {
  display: flex;
  background: #EBF7F9;
  border-radius: 5px;
  align-items: center;
  padding: 8px;
  img{
    width: 25px;
    height: 25px;
    margin-right: 8px;
  }

}
</style>
