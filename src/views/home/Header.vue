<template>
    <div class="home-header-wrapper">
        <div class="slideshow-container">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" lazy-render>
                <van-swipe-item v-for="img in imgs" :key="img">
                    <img :src="img" alt="" class="banner">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="notice-wrapper">
            <div class="van-notice-bar">
                <van-notice-bar
                    left-icon="volume-o"
                    color="#000"
                    background="#fff"
                    text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。"
                >
                </van-notice-bar>
            </div>
            <div class="wap-nav">
                <van-icon name="wap-nav" size="22"  />
            </div>
        </div>
        <div class="quick-entry-wrapper">
            <van-grid square :border="false">
                <van-grid-item v-for="(item,index) in quickEntry" :key="index" :text="item.name" :to="item.path">
                    <div class="item">
                        <img :src="item.icon" alt="" class="item-icon">
                        <div class="item-text">{{ item.name }}</div>
                    </div>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>

<script setup lang='ts'>
import pic1 from '@/assets/banner/1.jpeg'
import pic2 from '@/assets/banner/2.jpeg'
import pic3 from '@/assets/banner/3.jpeg'
import accountIcon from '@/assets/quickEntry/account.svg'
import tradeIcon from '@/assets/quickEntry/trade.svg'
import aiIcon from '@/assets/quickEntry/ai-arbitrage.svg'
import nftIcon from '@/assets/quickEntry/nft.svg'
import welfareIcon from '@/assets/quickEntry/welfare.svg'
import demoTradeIcon from '@/assets/quickEntry/demo-trade.svg'
import activityIcon from '@/assets/quickEntry/activity.svg'
import shareIcon from '@/assets/quickEntry/share.svg'

import { ref } from 'vue'
import i18n from '@/locale'

// 轮播图
const imgs = [pic1, pic2, pic3]

// 快捷入口
const quickEntry = ref([
    {name: i18n.global.t("quickEntry.account"), icon: accountIcon, path: '/account'},
    {name: i18n.global.t("quickEntry.trade"), icon: tradeIcon, path: '/deal'},
    {name: i18n.global.t("quickEntry.ai"), icon: aiIcon, path: '/aiQuantifyInfo'},
    {name: i18n.global.t("quickEntry.nft"), icon: nftIcon, path: '/account'},
    {name: i18n.global.t("quickEntry.welfare"), icon: welfareIcon, path: '/account'},
    {name: i18n.global.t("quickEntry.simulate"), icon: demoTradeIcon, path: '/account'},
    {name: i18n.global.t("quickEntry.activity"), icon: activityIcon, path: '/account'},
    {name: i18n.global.t("quickEntry.share"), icon: shareIcon, path: '/account'}
])

</script>

<style lang="scss" scoped>
 .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    height: 162px;
}

.home-header-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    margin-top: 55px;
    gap: 16px;

    .slideshow-container {
        width: 343px;
        height: 162px;

        .banner {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .notice-wrapper {
        display: inline-flex;
        justify-content: center;
        align-items: center;

        .van-notice-bar {
            width: 315px;
            height: 20px;
            padding: 0px;
            margin: 0px;
        }

        .wap-nav {
            width: 315px;
            height: 20px;
            text-align: center;
        }
    }

    .quick-entry-wrapper {
        .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 7px;
            padding-top: 0;

            .item-icon {
                width: 32px;
                height: 32px;
            }

            .item-text {
                font-size: 14px;
                color: #333333;
            }
        }
    }
}

:deep(.van-grid-item__content) {
    padding: 0;
}
</style>
