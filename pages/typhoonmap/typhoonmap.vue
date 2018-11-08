<template>
	<view>
        <!-- <web-view src="http://123.234.129.238:8001/SdForecast/MapSec/Map.html"></web-view> -->
		<!-- <web-view src="http://123.234.129.238:8001/SdForecast/TyphoonSec/Typhoon.html"></web-view> -->
		<!-- <web-view src="http://192.168.2.19/TyphoonSec/TyphoonMap.html"></web-view> -->
		<web-view v-if="url" :src="url"></web-view>
    </view>
</template>

<script>
	export default {
		data () {
			return {
				// url: 'http://123.234.129.237:8001/Maps/TyphoonMap.html',
				url: 'http://123.234.129.238:8001/Maps/TyphoonMap.html',
				timerlist: []
			}
		},
		methods: {
			refresh () {
				console.log('[界面]: 台风路径 刷新')
				this.url = ''
				let timer = setTimeout(function () {
					// this.url = 'http://123.234.129.237:8001/Maps/TyphoonMap.html'
					this.url = 'http://123.234.129.238:8001/Maps/TyphoonMap.html'
					clearTimeout(timer)
				}.bind(this), 100)
				this.timerlist.push(timer)
			}
		},
		onNavigationBarButtonTap () {
			this.refresh()
		},
		onUnload () {
			for (let i = 0; i < this.timerlist.length; i++) {
				clearTimeout(this.timerlist[i])
				this.timerlist[i] = null
			}
		}
	}
</script>
