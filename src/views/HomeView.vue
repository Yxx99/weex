<template>
    <NavBar />
    <main class="container">
        <Header />
        <Market />
    </main>
</template>

<script setup lang='ts'>
import NavBar from '@/views/home/NavBar.vue'
import Header from '@/views/home/Header.vue'
import Market from '@/views/home/Market.vue'
import { ref, provide, onMounted, onUnmounted } from 'vue'
import { useStore } from '@/stores/store'
import { getAccountAndBalance } from '@/utils/wallet'
import { userInfo } from '@/utils/api'

const store = useStore()

const ws = new WebSocket('wss://api.ezixkbgn.top/wss')
provide('ws', ws)

onMounted(() => {
    // getAccountAndBalance().then((res) => {
    //     store.setAccount(res.account)
    //     store.setEthBalance(res.eth_balance)
    //     store.setUSDTBalance(res.usdt_balance)
    //     userInfo(res).then(() => {})
    // })
})

onUnmounted(() => {
    ws.close()
})




</script>

<style>

</style>
