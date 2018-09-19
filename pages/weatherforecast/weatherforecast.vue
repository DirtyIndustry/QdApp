<template>
	<!-- <view style="background-image: url(../../static/Images/back_images.png); background-repeat: no-repeat; background-size: contain; background-attachment: scroll;"> -->
	<view>
		<view class="page-body">
			<image src="../../static/Images/back_images.png" mode="aspectFill" style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: -1;"
			/>
			
			<view class="separator" />
			<!-- 天气预报模块 -->
			<view class="page-section">
				<realtimeWeatherQD :weatherData="weatherData" />
			</view>
			<view class="separator" />
			<!-- 五日天气预报 -->
			<view class="page-section section-body">
				<tableTitle title="天气预报" date="数据源: 聚合数据"/>
				<view class="fiveday-body">
					<view class="uni-flex uni-row">
						<!-- 依据fivedayWeather生成列 -->
						<view class="fiveday-column uni-flex uni-column" :class="{'fiveday-column-left': index < 4}" v-for="(item, index) in fivedayData.fivedayWeather"
							:key="index">
							<!-- 自上而下分别为 周，日期，天气，天气图标，折线空格，风向，风力 -->
							<view class="flex-cell-single">{{item.week}}</view>
							<view class="flex-cell-single">{{item.date}}</view>
							<view class="flex-cell-single">{{item.weather}}</view>
							<view class="flex-cell-single">
								<image :src="item.weatherIcon" mode="widthFix" style="width: 50upx; height: 50upx" />
							</view>
							<view class="flex-cell-quad"> </view>
							<view class="flex-cell-single">{{item.windDir}}</view>
							<view class="flex-cell-single">{{item.windLvl}}</view>
						</view>
					</view>
					<view class="chart-fiveday">
						<mpvue-echarts :echarts="echarts" :onInit="handleInitFiveday" canvasId="canvasIdFiveday" ref="echartsRefFiveday"></mpvue-echarts>
					</view>
				</view>
			</view>
			<view class="separator" />
		</view>
	</view>
</template>

<script>
	import appsettings from '../../utils/appsettings.js'
	import utils from '../../utils/utils.js'
	import realtimeWeatherQD from '../../components/realtimeWeatherQD.vue'
	import tableTitle from '../../components/tableTitle.vue'
	import * as echarts from 'echarts'
	import mpvueEcharts from 'mpvue-echarts'

	let chartFiveday

	export default {
		components: {
			realtimeWeatherQD,
			tableTitle,
			mpvueEcharts
		},
		data() {
			return {
				// 完成的request计数
				completedRequestCount: 0,
				echarts
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
			}
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
						// 天气预报
						// 写入Vuex
						that.weatherData = res.weatherData
						// 天气图标 pm2.5字体颜色
						that.weatherData.weatherIcon = utils.setWeatherIcon(res.weatherData.weather)
						that.weatherData.pm25Style = utils.setAirconClass(res.weatherData.airconDesc)

						// 青岛专项
						that.qdOceanData = res.qdOceanData

						// 潮汐预报
						that.tideData.chartTideTwoShow = true
						that.tideData.chartTideOneTitle = '第一海水浴场'
						that.tideData.chartTideTwoTitle = '金沙滩'
						for (let i = 0; i < res.astroDatas.length; i++) {
							let tide = utils.buildTidedata(res.astroDatas[i].tidedata)
							let mark = utils.buildMarkdata(res.astroDatas[i].markdata)
							if (res.astroDatas[i].location === '第一海水浴场') {
								that.tideData.optionTideOne = utils.getAstroOptionNew(tide, mark, res.astroDatas[i].max, res.astroDatas[i].min)
							} else {
								let optiontwo = utils.getAstroOptionNew(tide, mark, res.astroDatas[i].max, res.astroDatas[i].min)
								optiontwo.series[0].lineStyle.color = '#0092d4'
								that.tideData.optionTideTwo = optiontwo
							}
						}

						// 近海预报
						// 写入Vuex
						that.inshoreData = res.inshoreData

						// 浴场预报
						// 判断月份
						if (new Date().getMonth() > 5 & new Date().getMonth() < 9) {
							that.bathsData.showBaths = true
						} else {
							that.bathsData.showBaths = false
						}
						// 写入Vuex
						that.bathsData.data = res.bathsDatas

						// 精细化预报
						that.refinedData.show = true
						that.refinedData.showTwo = true
						for (let i = 0; i < res.refinedDatas.length; i++) {
							let tide = utils.buildTidedata(res.refinedDatas[i].tideinfo.tidedata)
							let mark = utils.buildMarkdata(res.refinedDatas[i].tideinfo.markdata)
							let option = utils.getAstroOptionNew(tide, mark, res.refinedDatas[i].tideinfo.max, res.refinedDatas[i].tideinfo.min)
							// 曲线颜色蓝色
							option.series[0].lineStyle.color = '#0092d4'
							// label颜色绿色
							option.series[0].label.color = '#1c8d3b'
							// 时间颜色红色
							option.series[0].markLine.label.textStyle.color = 'red'
							// 不显示日期
							option.xAxis.axisLabel.show = false
							// 将地名字母代号转为中文地名
							res.refinedDatas[i].extrainfo[0].loc = utils.getLocName(res.refinedDatas[i].extrainfo[0].loc)
							if (res.refinedDatas[i].tideinfo.location === 'DJKP') {
								that.refinedData.optionOne = option
								that.refinedData.dataOne = res.refinedDatas[i].extrainfo
							} else {
								that.refinedData.optionTwo = option
								that.refinedData.dataTwo = res.refinedDatas[i].extrainfo
							}
						}
						

						// 五日天气预报
						let fivedayData = {
							fivedayWeather: res.fivedayData.fivedayWeathers,
							optionFiveday: utils.setFivedayChartOptionNew(res.fivedayData.higharr, res.fivedayData.lowarr, res.fivedayData.max, res.fivedayData.min)
						}
						for (let i = 0; i < fivedayData.fivedayWeather.length; i++) {
							fivedayData.fivedayWeather[i].weatherIcon = utils.setWeatherIcon(fivedayData.fivedayWeather[i].weather)
						}
						// 写入Vuex
						that.fivedayData = fivedayData

						// 写入本地缓存
						utils.storeToLocal('weatherdata', JSON.stringify(res.weatherData))
						utils.storeToLocal('tidedata', JSON.stringify(that.tideData))
						utils.storeToLocal('inshoredata', JSON.stringify(res.inshoreData))
						utils.storeToLocal('bathsdata', JSON.stringify(that.bathsData))
						utils.storeToLocal('refineddata', JSON.stringify(that.refinedData))
						utils.storeToLocal('fivedaydata', JSON.stringify(fivedayData))
						utils.storeToLocal('qdoceandata', JSON.stringify(res.qdOceanData))
					}, // success-request
					fail: function (res) {
						console.log('[服务器]: 请求 山东预报数据 失败')
					},
					complete: function (res) {
						that.completedRequestCount++
					}
				})
			},
			// 初始化高低温图表
			handleInitFiveday(canvas, width, height) {
				chartFiveday = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(chartFiveday)
				chartFiveday.setOption(this.fivedayData.optionFiveday, true)
				return chartFiveday
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
			},
			// 高低温图表option
			fivedayData: {
				handler(newVal, oldVal) {
					if (chartFiveday !== undefined) {
						if (newVal) {
							chartFiveday.setOption(newVal.optionFiveday, true)
							// this.$refs.echartsRefFiveday.init()
						}
					}
				}
			}
		},
		onLoad() {
			console.log('weatherforecast page onload.')
		},
		onReady() {
			console.log('weatherforecast page ready.')
		},
		mounted() {
			console.log('weatherforecast vue mounted.')
		},
		onPullDownRefresh() {
			console.log('[界面]: 天气预报 下拉刷新')
			this.requestData('青岛')
		}
	}
</script>

<style scoped>
	@import "../../common/generic.css";

	/* 潮汐预报曲线图的容器 必须设置宽度和高度 */
	.chart-tide {
		width: 290%;
		height: 250upx;
		border: 1upx solid #000;
	}

	.uni-flex {
        display: flex;
        flex-direction: row;
    }

    .uni-row {
        flex-direction: row;
    }

    .uni-column {
        flex-direction: column;
    }

    /* 5日天气预报的容器 */
    .fiveday-body {
        position: relative;
    }

	/* 5日天气预报的列 */
	.fiveday-column {
		flex: 1;
		height: 600upx;
	}

	/* 5日天气预报非最右边的列 添加右边框 */
	.fiveday-column-left {
		border-right: 1upx solid #000000;
	}

	/* 5日天气预报中每列中的单元格 */
	.flex-cell-single {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* 5日天气预报中占四行高度的单元格 */
	.flex-cell-quad {
		flex: 4;
	}

	/* 五日天气预报气温图表 */
	.chart-fiveday {
		width: 100%;
		height: 235upx;
		top: 240upx;
		position: absolute;
	}
</style>