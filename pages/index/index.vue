<template>
	<!-- <view style="background-image: url(../../static/Images/back_images.png); background-repeat: no-repeat; background-size: contain; background-attachment: scroll;"> -->
	<view>
		<view class="page-body">
			<image src="../../static/Images/back_images.png" mode="aspectFill" style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: -1;" />
			
			<!-- 天气预报模块 -->
			<view class="page-section">
				<realtimeWeather :weatherData="weatherData" />
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
				<view class="chart-container chart-container-one">
					<text class="chart-title text" v-if="tideData.chartTideOneTitle !== ''">{{tideData.chartTideOneTitle}}</text>
					<scroll-view scroll-x="true" @scroll="scrollTideOne">
						<view class="chart-tide">
							<myChart :option="tideData.optionTideOne" canvasId="tideOne" />
						</view>
					</scroll-view>
					<!-- 左右指示箭头 -->
					<view v-if="tideOneChevronRightShow" class="chevron chevron-right fa fa-chevron-right" />
					<view v-if="tideOneChevronLeftShow" class="chevron chevron-left fa fa-chevron-left" />
				</view>
				<!-- 第二个图表 只在青岛地区显示 -->
				<view class="chart-container" :class="{hide: !tideData.chartTideTwoShow}">
					<text class="chart-title text">{{tideData.chartTideTwoTitle}}</text>
					<scroll-view scroll-x="true" @scroll="scrollTideTwo">
						<view class="chart-tide">
							<myChart :option="tideData.optionTideTwo" canvasId="tideTwo" />
						</view>
					</scroll-view>
					<!-- 左右指示箭头 -->
					<view v-if="tideTwoChevronRightShow" class="chevron chevron-right fa fa-chevron-right" />
					<view v-if="tideTwoChevronLeftShow" class="chevron chevron-left fa fa-chevron-left" />
				</view>
			</view>
			<view class="separator" />
			<!-- 近海预报 -->
			<view class="page-section section-body">
				<tableTitle title="近海预报" :date="inshoreTitleDate" icon="../../static/Images/top_left_img_newS.png" />
				<inshoreTableNew :inshoreData="inshoreData" />
			</view>
			<view class="separator" />
			<!-- 浴场预报 -->
			<view class="page-section section-body" v-if="bathsData.showBaths">
				<tableTitle title="浴场预报" :date="bathsTitleDate" icon="../../static/Images/top_left_img_newS.png" />
				<bathsTable :bathsData="bathsData.data" />
			</view>
			<!-- 精细化预报 -->
			<view class="separator" />
			<view class="page-section section-body">
				<refinedChartAlt :option="refinedData.optionOne" :data="refinedData.dataOne" canvasId="refinedOne" />
				<!-- 两个图表之间的空白 -->
				<view style="height: 60px" v-if="refinedData.showTwo" />
				<view v-show="refinedData.showTwo">
					<refinedChartAlt :option="refinedData.optionTwo" :data="refinedData.dataTwo" canvasId="refinedTwo" />
				</view>
			</view>
			<view class="separator" />
			<!-- 五日天气预报 -->
			<view class="page-section section-body">
				<tableTitle title="天气预报" date="数据源: 聚合数据"/>
				<fivedayForcast :option="fivedayData.optionFiveday" :fivedayWeather="fivedayData.fivedayWeather" canvasId="fiveday" />
			</view>
			<view class="separator" />
		</view>
	</view>
</template>

<script>
	import appsettings from '../../utils/appsettings.js'
	import utils from '../../utils/utils.js'
	import myChart from '../../components/myChart.vue'
	import realtimeWeather from '../../components/realtimeWeather.vue'
	import warningSection from '../../components/warningSection.vue'
	import fivedayForcast from '../../components/fivedayForcast.vue'
	import inshoreTableNew from '../../components/inshoreTableNew.vue'
	import bathsTable from '../../components/bathsTable.vue'
	import refinedChart from '../../components/refinedChart.vue'
	import refinedChartAlt from '../../components/refinedChartAlt.vue'
	import myPicker from '../../components/myPicker.vue'
	import tableTitle from '../../components/tableTitle.vue'

	export default {
		components: {
			myChart,
			realtimeWeather,
			warningSection,
			fivedayForcast,
			inshoreTableNew,
			bathsTable,
			refinedChart,
			refinedChartAlt,
			myPicker,
			tableTitle
		},
		data() {
			return {
				// 完成的request计数
				completedRequestCount: 0,

				// 警报数据
				warningData: {
					typhoonWarning: '',
					waveWarning: '',
					waveUrl: ''
				},

				// 近海预报日期字符串
				inshoreTitleDate: '',
				// 浴场预报日期字符串
				bathsTitleDate: '',
				// 潮汐预报一左右三角箭头显隐
				tideOneChevronLeftShow: false,
				tideOneChevronRightShow: true,
				// 潮汐预报二左右三角箭头显隐
				tideTwoChevronLeftShow: false,
				tideTwoChevronRightShow: true
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
			// 威海专项
			weihaiData: {
				get() { return this.$store.state.Datas.weihaidata },
				set(value) { this.$store.dispatch('setWeihaiData', value) }
			}
		},
		methods: {
			// 读取服务器数据
			requestData(city) {
				// 任务计数器归零
				this.completedRequestCount = 0
				this.setTitleDates(city)
				this.loadAlarmData()
				this.loadShandongData(city)
			},
			loadAlarmData () {
				let that = this
				uni.request({
					url: appsettings.hosturl + 'GetAlarm ',
					data: {name: 'admin', areaflg: '山东'},
					method: 'POST',
					success: function (res) {
						console.log('[服务器]: 返回 警报数据')
						// 判断返回数据有效性
						if (!res.data.d | res.data.d === '无权访问该接口' | res.data.d === '无该地区数据') { // 返回的值为空
							console.log('[服务器]: 返回 警报数据 返回值为空')
							return false
						}
						let resdata = JSON.parse(res.data.d)
						if (resdata.Typhoon !== {}) {
							console.log('[服务器]: 有台风警报')
							let nowdate = new Date()
							that.warningData.typhoonWarning = nowdate.getFullYear() + '年' + (nowdate.getMonth() + 1) + '月' + nowdate.getDate() + '日, ' +
								resdata.Typhoon.NUMBER +
								'号台风"' +
								resdata.Typhoon.CHN_NAME +
								'(' +
								resdata.Typhoon.ENG_NAME +
								')"正在接近……'
						}
						if (resdata.Ocean.length > 0) {
							console.log('[服务器]: 有海洋警报')
							let name = resdata.Ocean[resdata.Ocean.length - 1].name
							let date = resdata.Ocean[resdata.Ocean.length - 1].datetime
							let url = resdata.Ocean[resdata.Ocean.length - 1].Url
							that.warningData.waveWarning = name + ',' + date + '……'
							that.warningData.waveUrl = url
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
			// 读取山东预报数据 包括天气 潮汐 近海 浴场 精细化 五日 威海专项
			loadShandongData (cityname) {
				let that = this
				uni.request({
					url: appsettings.hosturl + 'GetShandongData',
					data: {name: 'admin', city: cityname},
					method: 'POST',
					success: function (res) {
						console.log('[服务器]: 返回 山东预报数据')
						// 判断返回数据有效性
						if (!res.data.d | res.data.d === '无权访问该接口' | res.data.d === '无该地区数据') { // 返回的值为空
							console.log('[服务器]: 返回 山东预报数据 返回值为空')
							return false
						}
						res = JSON.parse(res.data.d)
						// 天气预报
						// 写入Vuex
						that.weatherData = res.weatherData
						// 天气图标 pm2.5字体颜色
						that.weatherData.weatherIcon = utils.setWeatherIcon(res.weatherData.weather)
						that.weatherData.pm25Style = utils.setAirconClass(res.weatherData.airconDesc)

						// 潮汐预报
						if (res.astroDatas.length > 1) {	// 如果是青岛
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
									optiontwo.series[0].lineStyle.color = "#0092d4"
									that.tideData.optionTideTwo = optiontwo
								}
							}
						} else {	// 如果是青岛以外的城市
							that.tideData.chartTideTwoShow = false
							that.tideData.chartTideOneTitle = ''
							that.tideData.chartTideTwoTitle = ''
							for (let i = 0; i < res.astroDatas.length; i++) {
								let tide = utils.buildTidedata(res.astroDatas[i].tidedata)
								let mark = utils.buildMarkdata(res.astroDatas[i].markdata)
								that.tideData.optionTideOne = utils.getAstroOptionNew(tide, mark, res.astroDatas[i].max, res.astroDatas[i].min)
							}
						} // if-else 是否是青岛

						// 近海预报
						// 写入Vuex
						that.inshoreData = res.inshoreData

						// 浴场预报
						// 判断月份和城市
						if (new Date().getMonth() > 5 & new Date().getMonth() < 9 & cityname === '青岛') {
							that.bathsData.showBaths = true
						} else {
							that.bathsData.showBaths = false
						}
						// 写入Vuex
						that.bathsData.data = res.bathsDatas

						// 精细化预报
						// 判断城市
						if (cityname === '滨州') {
							that.refinedData.show = false
						} else {
							that.refinedData.show = true
						}
						if (res.refinedDatas.length > 1) {	// 如果是青岛
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
						} else {	// 如果是青岛以外的城市
							that.refinedData.showTwo = false
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
								that.refinedData.optionOne = option
								// 将地名字母代号转为中文地名
								res.refinedDatas[i].extrainfo[0].loc = utils.getLocName(res.refinedDatas[i].extrainfo[0].loc)
								that.refinedData.dataOne = res.refinedDatas[i].extrainfo
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

						// 威海专项
						// 判断城市
						if (res.weihaiDatas.length > 0) {	// 如果是威海
							that.weihaiData.show = true
							for (let i = 0; i < res.weihaiDatas.length; i++) {
								let data = {
									show: res.weihaiDatas[i].show,
									REPORTAREA: res.weihaiDatas[i].REPORTAREA,
									FORECASTDATE: res.weihaiDatas[i].FORECASTDATE,
									WAVEHEIGHT: res.weihaiDatas[i].WAVEHEIGHT,
									WATERTEMP: res.weihaiDatas[i].WATERTEMP,
								}
								let tide = utils.buildTidedata(res.weihaiDatas[i].tideinfo.tidedata)
								let mark = utils.buildMarkdata(res.weihaiDatas[i].tideinfo.markdata)
								data.option = utils.getAstroOptionNew(tide, mark, res.weihaiDatas[i].tideinfo.max, res.weihaiDatas[i].tideinfo.min)
								data.option.grid = {
									top: '4%',
									left: '-3%',
									right: '5%',
									bottom: '20%',
									containLabel: true
								}
								switch (res.weihaiDatas[i].REPORTAREA) {
									case '成山头':
										that.weihaiData.first = data
										break
									case '乳山':
										that.weihaiData.second = data
										break
									case '石岛':
										that.weihaiData.third = data
										break
									case '文登':
										that.weihaiData.fourth = data
										break
									default:
										break
								}
							} // end-for res.weihaiDatas
						} else {	// 如果是威海以外的城市
							that.weihaiData.show = false
						}
						// 写入本地缓存
						utils.storeToLocal('weatherdata', JSON.stringify(res.weatherData))
						utils.storeToLocal('tidedata', JSON.stringify(that.tideData))
						utils.storeToLocal('inshoredata', JSON.stringify(res.inshoreData))
						utils.storeToLocal('bathsdata', JSON.stringify(that.bathsData))
						utils.storeToLocal('refineddata', JSON.stringify(that.refinedData))
						utils.storeToLocal('fivedaydata', JSON.stringify(fivedayData))
						utils.storeToLocal('weihaidata', JSON.stringify(that.weihaiData))

					}, // success-request
					fail: function (res) {
						console.log('[服务器]: 请求 山东预报数据 失败')
						that.completedRequestCount++
					},
					complete: function (res) {
						that.completedRequestCount++
					}
				})
			},
			// 根据城市名称设置近海和浴场预报表头时间
			setTitleDates (cityname) {
				let now = new Date()
				let one = (now.getMonth() + 1) + '月' + now.getDate() + '日'
				now.setDate(now.getDate() + 1)
				let two = (now.getMonth() + 1) + '月' + now.getDate() + '日'
				now.setDate(now.getDate() + 1)
				let three = (now.getMonth() + 1) + '月' + now.getDate() + '日'
				now.setDate(now.getDate() + 1)
				let four = (now.getMonth() + 1) + '月' + now.getDate() + '日'
				switch (cityname) {
					case '青岛':
						this.inshoreTitleDate = ''
						this.bathsTitleDate = one + '0时至' + two + '0时'
						break
					default:
						this.inshoreTitleDate = one + '0时至' + four + '0时'
						this.bathsTitleDate = ''
						break
				}
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
				uni.navigateTo({
					url: '../warningdetail/warningdetail?data=' + that.warningData.waveUrl
				})
			},
			// 潮汐预报一滚动
			scrollTideOne (e) {
				if (e.detail.scrollLeft < 80) {
					this.tideOneChevronLeftShow = false
				} else if (e.detail.scrollLeft < 540) {
					this.tideOneChevronLeftShow = true
					this.tideOneChevronRightShow = true
				} else {
					this.tideOneChevronRightShow = false
				}
			},
			// 潮汐预报二滚动
			scrollTideTwo (e) {
				if (e.detail.scrollLeft < 80) {
					this.tideTwoChevronLeftShow = false
				} else if (e.detail.scrollLeft < 540) {
					this.tideTwoChevronLeftShow = true
					this.tideTwoChevronRightShow = true
				} else {
					this.tideTwoChevronRightShow = false
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
			}
		},
		onLoad() {
			console.log('index page onload.')
			uni.showLoading({
				title: '加载中',
				mask: true
			})
			this.completedRequestCount = 1
			this.setTitleDates('青岛')
			this.loadAlarmData()
		},
		onReady() {
			console.log('index page ready.')
		},
		mounted() {
			console.log('index vue mounted.')
		},
		onPullDownRefresh() {
			console.log('[界面]: 首页 下拉刷新')
			this.requestData('青岛')
		}
	}
</script>

<style scoped>
	@import "../../common/FontAwesome.css";
	@import "../../common/generic.css";

	/* 潮汐曲线容器 */
	.chart-container {
		display: flex;
		flex-direction: column;
	}
	.chart-container-one {
		position: relative;
	}
	/* 潮汐预报曲线图的容器 必须设置宽度和高度 */
	.chart-tide {
		width: 290%;
		height: 250px;
	}
	/* 潮汐曲线上方的地名 */
	.chart-title {
		position: relative;
        width: 95%;
		left: 2.5%;
        border-bottom: 1px solid #666;
	}
	/* 潮汐曲线上左右箭头 */
	.chevron {
		position: absolute;
		bottom: 125px;
		color: #666;
	}
	.chevron-right {
		right: 2.5%;
	}
	.chevron-left {
		left: 2.5%;
	}
	.chevron-hide {
		opacity: 0;
	}
</style>