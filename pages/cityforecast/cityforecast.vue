<template>
	<!-- <view style="background-image: url(../../static/Images/back_images.png); background-repeat: no-repeat; background-size: contain; background-attachment: scroll;"> -->
	<view>
		<view class="page-body">
			<image src="../../static/Images/back_images.png" mode="aspectFill" style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: -1;" />
			
			<view class="separator" />
			<!-- 潮汐预报模块 -->
			<view class="page-section section-body">
				<tableTitle title="潮汐预报" icon="../../static/Images/top_left_img_new.png" />
				<!-- 第一个图表 -->
				<tideChart :option="tideData.optionTideOne" :title="tideData.chartTideOneTitle" canvasId="canvasIdTideOne" />
				<!-- 第二个图表 只在青岛地区显示 -->
				<tideChart :option="tideData.optionTideTwo" :title="tideData.chartTideTwoTitle" canvasId="canvasIdTideTwo" />
			</view>
			<view class="separator" />
			<!-- 近海预报 -->
			<view class="page-section section-body">
				<tableTitle title="近海预报" icon="../../static/Images/top_left_img_newS.png" />
				<inshoreTableNew :inshoreData="inshoreData" />
			</view>
			<view class="separator" />
			<!-- 浴场预报 -->
			<view class="page-section section-body" v-if="bathsData.showBaths">
				<tableTitle title="浴场预报" :date="bathsData.time" icon="../../static/Images/top_left_img_newS.png" />
				<bathsTable :bathsData="bathsData.data" />
			</view>
			<view class="separator" />
			<!-- 精细化预报 -->
			<view class="page-section section-body">
				<refinedChartAlt :option="refinedData.optionOne" :data="refinedData.dataOne" canvasId="canvasIdRefinedOne"/>
				<!-- 两个图表之间的空白 -->
				<view class="separator" />
				<refinedChartAlt :option="refinedData.optionTwo" :data="refinedData.dataTwo" canvasId="canvasIdRefinedTwo"/>
			</view>
			<view class="separator" />
		</view>
	</view>
</template>

<script>
	import appsettings from '../../utils/appsettings.js'
	import utils from '../../utils/utils.js'
	import tableTitle from '../../components/tableTitle.vue'
	import tideChart from '../../components/tideChart.vue'
	import inshoreTableNew from '../../components/inshoreTableNew.vue'
	import bathsTable from '../../components/bathsTable.vue'
	import refinedChartAlt from '../../components/refinedChartAlt.vue'

	export default {
		components: {
			tableTitle,
			tideChart,
			inshoreTableNew,
			bathsTable,
			refinedChartAlt
		},
		data() {
			return {
				// 完成的request计数
				completedRequestCount: 0
			}
		},
		computed: {
			// 系统信息
			systemInfo() { return this.$store.state.Infos.systeminfo },
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
			// 潮汐预报chart option
			tideDataOptionOne () { return this.$store.state.Datas.tidedata.optionTideOne },
			tideDataOptionTwo () { return this.$store.state.Datas.tidedata.optionTideTwo },
			// 精细化预报chart option
			refinedDataOptionOne () { return this.$store.state.Datas.refineddata.optionOne },
			refinedDataOptionTwo () { return this.$store.state.Datas.refineddata.optionTwo }
		},
		methods: {
			// 读取服务器数据
			requestData(city) {
				// 任务计数器归零
				this.completedRequestCount = 0
				this.loadQingdaoData()
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
			}
		}, // end-methods
		watch: {
			// 完成的request
			completedRequestCount: {
				handler(newVal, oldVal) {
					if (newVal === 1) {
						uni.hideLoading()
						uni.stopPullDownRefresh()
					}
				}
			}
		},
		onLoad() {
			console.log('cityforecast page onload.')
		},
		onReady() {
			console.log('cityforecast page ready.')
		},
		mounted() {
			console.log('cityforecast vue mounted.')
		},
		onPullDownRefresh() {
			console.log('[界面]: 城市预报 下拉刷新')
			this.requestData('青岛')
		}
	}
</script>

<style scoped>
	@import "../../common/generic.css";
</style>