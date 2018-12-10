<template>
	<!-- <view style="background-image: url(../../static/Images/back_images.png); background-repeat: no-repeat; background-size: contain; background-attachment: scroll;"> -->
	<view>
		<view class="page-body">
			<image src="../../static/Images/back_images.png" mode="scaleToFill" style="width: 100%; height: 100%; position: fixed; bottom: 0; left: 0; z-index: -1;" />
			<!-- <view class="separator" v-if="warningData.typhoonWarning !== ''"/> -->
			<!-- 天气预报模块 -->
			<view class="page-section">
				<qdFrontpage :weatherData="weatherData" :qdOceanData="qdOceanData" />
			</view>
			<view class="separator" />
			<!-- 警报模块 -->
			<view class="page-section">
				<warningSection :typhoon="warningData.typhoonWarning" :wave="warningData.waveWarning" @typhoonTap="typhoonWarningTap"
				 @waveTap="waveWarningTap" />
			</view>
			<view class="separator" />
			<!-- 潮汐预报模块 -->
			<view class="page-section section-body">
				<tableTitle title="潮汐预报" date="" icon="../../static/Images/top_left_img_new.png" />
				<!-- 第一个图表 -->
				<tideChart :option="tideData.optionTideOne" :title="tideData.chartTideOneTitle" canvasId="tideOne" />
				<!-- 第二个图表 只在青岛地区显示 -->
				<view :class="{hide: !tideData.chartTideTwoShow}">
					<tideChart :option="tideData.optionTideTwo" :title="tideData.chartTideTwoTitle" canvasId="tideTwo" />
				</view>
			</view>
			<view class="separator" />
			<!-- 近海预报 -->
			<view class="page-section section-body">
				<tableTitle title="近海预报" :date="inshoreData.timeupper" icon="../../static/Images/top_left_img_newS.png" />
				<inshoreTableNew :inshoreData="inshoreData" />
			</view>
			<view class="separator" />
			<!-- 浴场预报 -->
			<view class="page-section section-body" v-if="bathsData.showBaths">
				<tableTitle title="浴场预报" :date="bathsData.time" icon="../../static/Images/top_left_img_newS.png" />
				<bathsTable :bathsData="bathsData.data" />
			</view>
			<!-- 精细化预报 -->
			<view class="separator" />
			<view class="page-section section-body">
				<tableTitle />
				<refinedChartAlt :option="refinedData.optionOne" :data="refinedData.dataOne" canvasId="refinedOne" />
				<!-- 两个图表之间的空白 -->
				<view class="separator" />
				<refinedChartAlt :option="refinedData.optionTwo" :data="refinedData.dataTwo" canvasId="refinedTwo" />
			</view>
			<view class="separator" />
			<!-- 五日天气预报 -->
			<view class="page-section section-body">
				<tableTitle title="天气预报" date="数据源: 聚合数据"/>
				<fivedayForcast :option="fivedayData.optionFiveday" :fivedayWeather="fivedayData.fivedayWeather" canvasId="fiveday" />
			</view>
			<view class="separator" />
			<!-- 底部版权条 -->
			<view class="page-section section-body copyright text-small">青岛市海洋与渔业局·青岛市海洋预报中心 — 版权所有</view>
			<view class="separator" />
			<view v-if="warningData.waveWarning !== ''" class="separator" />
		</view>
	</view>
</template>

<script>
	import appsettings from '../../utils/appsettings.js'
	import utils from '../../utils/utils.js'
	import tableTitle from '../../components/tableTitle.vue'
	import qdFrontpage from '../../components/qdFrontpage.vue'
	import warningSection from '../../components/warningSection.vue'
	import tideChart from '../../components/tideChart.vue'
	import inshoreTableNew from '../../components/inshoreTableNew.vue'
	import bathsTable from '../../components/bathsTable.vue'
	import refinedChartAlt from '../../components/refinedChartAlt.vue'
	import fivedayForcast from '../../components/fivedayForcast.vue'

	export default {
		components: {
			tableTitle,
			qdFrontpage,
			warningSection,
			tideChart,
			inshoreTableNew,
			bathsTable,
			refinedChartAlt,
			fivedayForcast
		},
		data() {
			return {
				// 完成的request计数
				completedRequestCount: 0,

				// 警报数据
				// warningData: {
				// 	typhoonWarning: '',
				// 	waveWarning: '',
				// 	waveUrl: '',
				// 	filename: ''
				// }
			}
		},
		computed: {
			// 实时天气
			weatherData: {
				get() { return this.$store.state.Datas.weatherdata },
				set(value) { this.$store.dispatch('setWeatherData', value) }
			},
			// 潮汐预报
			tideData: {
				get() { return this.$store.state.Datas.tidedata },
				set(value) { this.$store.dispatch('setTideData', value) }
			},
			// 近海预报
			inshoreData: {
				get() { return this.$store.state.Datas.inshoredata },
				set(value) { this.$store.dispatch('setInshoreData', value) }
			},
			// 浴场预报
			bathsData: {
				get() { return this.$store.state.Datas.bathsdata },
				set(value) { this.$store.dispatch('setBathsData', value) }
			},
			// 精细化预报
			refinedData: {
				get() { return this.$store.state.Datas.refineddata },
				set(value) { this.$store.dispatch('setRefinedData', value) }
			},
			// 五日天气
			fivedayData: {
				get() { return this.$store.state.Datas.fivedaydata },
				set(value) { this.$store.dispatch('setFivedayData', value) }
			},
			// 青岛首页专项
			qdOceanData: {
				get () { return this.$store.state.Datas.qdoceandata },
				set (value) { this.$store.dispatch('setQdOceanData', value) }
			},
			// 警报信息
			warningData: {
				get () { return this.$store.state.Datas.warningdata },
				set (value) { this.$store.dispatch('setWarningData', value) }
			},
			// 推送信息
			pushMessage: {
				get () { return this.$store.state.Datas.pushmessage },
				set (value) { this.$store.dispatch('setPushMessage', value) }
			},
			// 强制升级
			forceUpgrade: {
				get() { return this.$store.state.Infos.forceupgrade },
				set(value) { this.$store.dispatch('setForceUpgrade', value) }
			},
			// 需要升级
			needUpgrade: {
				get() { return this.$store.state.Infos.needupgrade },
				set(value) { this.$store.dispatch('setNeedUpgrade', value) }
			}
		},
		methods: {
			// 读取服务器数据
			requestData(city) {
				// 任务计数器归零
				this.completedRequestCount = 0
				this.loadAlarmData()
				this.loadQingdaoData()
			},
			loadAlarmData () {
				let that = this
				uni.request({
					url: appsettings.hosturl + 'GetAlarm',
					data: {name: 'admin', areaflg: '青岛'},
					method: 'POST',
					success: function (res) {
						console.log('[服务器]: 返回 警报数据')
						// 判断返回数据有效性
						if (!res.data.d | res.data.d === '无权访问该接口' | res.data.d === '无该地区数据') { // 返回的值为空
							console.log('[服务器]: 返回 警报数据 返回值为空')
							return false
						}
						let resdata = JSON.parse(res.data.d)
						if (resdata.Typhoon.NUMBER !== '') {
							console.log('[服务器]: 有台风警报')
							let nowdate = new Date()
							// that.warningData.typhoonWarning = resdata.Typhoon.NUMBER +
							// 	'号台风"' +
							// 	resdata.Typhoon.CHN_NAME +
							// 	'"正在接近...'
							that.warningData.typhoonWarning = resdata.Typhoon.message
						}
						if (resdata.Ocean.length > 0) {
							console.log('[服务器]: 有海洋警报')
							let name = resdata.Ocean[resdata.Ocean.length - 1].name
							let date = new Date(resdata.Ocean[resdata.Ocean.length - 1].datetime)
							let url = resdata.Ocean[resdata.Ocean.length - 1].Url
							let filename = resdata.Ocean[resdata.Ocean.length - 1].filename
							// that.warningData.waveWarning = (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + date.getHours() + ':00发布' + name + '。'
							that.warningData.waveWarning = resdata.Ocean[resdata.Ocean.length - 1].message
							that.warningData.waveUrl = url
							that.warningData.filename = filename
						}
					}, // end-success
					fail: function () {
						console.log('[服务器]: 请求 警报数据 失败')
					},
					complete: function () {
						that.completedRequestCount++
					}
				})
			},
			// 读取青岛预报数据 包括天气 潮汐 近海 浴场 精细化 五日 青岛专项
			loadQingdaoData () {
				let that = this
				uni.request({
					url: appsettings.hosturl + 'GetQingdaoData',
					data: {name: 'admin', areaflg: '青岛'},
					method: 'POST',
					success: function (res) {
						console.log('[服务器]: 返回 青岛预报数据')
						// 判断返回数据有效性
						if (!res.data.d | res.data.d === '无权访问该接口' | res.data.d === '无该地区数据') { // 返回的值为空
							console.log('[服务器]: 返回 青岛预报数据 返回值为空')
							return false
						}
						res = JSON.parse(res.data.d)
						// 处理数据
						utils.getQingdaoData(res)
					}, // success-request
					fail: function (res) {
						console.log('[服务器]: 请求 青岛预报数据 失败')
					},
					complete: function (res) {
						that.completedRequestCount++
					}
				})
			},
			// 台风警报点击
			typhoonWarningTap() {
				console.log('[界面]: 点击台风警报')
				uni.navigateTo({
					url: '../typhoonmap/typhoonmap'
				})
			},
			// 海浪警报点击
			waveWarningTap() {
				console.log('[界面]: 点击海浪警报')
				let that = this
				// uni.navigateTo({
				// 	url: '../warningdetail/warningdetail?data=' + that.warningData.waveUrl
				// })
				uni.request({
					url: appsettings.hosturl + 'GetOceanAlarmUrl',
					data: {name: 'admin', areaflg: '青岛', filename: that.warningData.filename},
					method: 'POST',
					success: function (res) {
						console.log('[服务器]: 返回 预警报地址')
						if (!res.data.d | res.data.d === '您无权访问此端口' | res.data.d === '') { // 返回的值为空
							console.log('[服务器]: 返回 预警报地址 返回值为空')
							return false
						}
						// 打开详细警报页面
						console.log('[界面]: 跳转至 警报详情页面')
						uni.navigateTo({
							url: '../warningdetail/warningdetail?data=' + res.data.d
						})
					}
				})
			},
			// 处理推送信息
			checkPushMessage() {
				if (this.pushMessage.filename !== '') {
					let that = this
					uni.request({
						url: appsettings.hosturl + 'GetOceanAlarmUrl',
						data: {name: 'admin', areaflg: '山东', filename: that.pushMessage.filename},
						method: 'POST',
						success: function (res) {
							console.log('[服务器]: 返回 预警报地址')
							if (!res.data.d | res.data.d === '您无权访问此端口' | res.data.d === '') { // 返回的值为空
								console.log('[服务器]: 返回 预警报地址 返回值为空')
								return false
							}
							// 清空pushMessage
							that.pushMessage.filename = ''
							that.pushMessage.name = ''
							that.pushMessage.datetime = ''
							that.pushMessage.Url = ''
							that.pushMessage.message = ''
							// 打开详细警报页面
							console.log('[界面]: 跳转至 警报详情页面')
							uni.navigateTo({
								url: '../warningdetail/warningdetail?data=' + res.data.d
							})
						}
					})
				}
			}
		}, // end-methods
		watch: {
			// 完成的request
			completedRequestCount: {
				handler(newVal, oldVal) {
					// 服务器请求任务的总数
					if (newVal === 2) {
						uni.hideLoading()
						uni.stopPullDownRefresh()
					}
				}
			},
			pushMessage: {
				handler(newVal, oldVal) {
					if (newVal) {
						// 检查推送信息
						this.checkPushMessage()
					}
				}
			}
		},
		onLoad() {
			console.log('index page onload.')
			// uni.showLoading({
			// 	title: '加载中',
			// 	mask: true
			// })
		},
		onReady() {
			console.log('index page ready.')
			this.checkPushMessage()
		},
		onShow() {
			console.log('index page onshow')
			if (this.forceUpgrade == true) {
				uni.showModal({
					title: '错误',
					content: '当前版本已停用, 请立即升级',
					showCancel: false,
					confirmText: '立即升级',
					success: function (res) {
						utils.doUpgrade()
					}
				})
			} else if (this.needUpgrade == true) {
				uni.showModal({
					title: '发现新版本',
					content: appsettings.appversion + ' -> ' + resversion + '\n' + result[i].releasenote,
					confirmText: '立即升级',
					cancelText: '取消',
					success: function (res) {
						if (res.confirm) {
							console.log('用户确认升级')
							utils.doUpgrade()
						} else {
							console.log('用户取消升级')
						}
					}
				})
			}
		},
		mounted() {
			console.log('index vue mounted.')
			this.completedRequestCount = 1
			this.loadAlarmData()
		},
		onPullDownRefresh() {
			console.log('[界面]: 首页 下拉刷新')
			this.requestData('青岛')
		}
	}
</script>

<style scoped>
	@import "../../common/generic.css";

	.copyright {
		height: 80upx;
		border-radius: 10upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>