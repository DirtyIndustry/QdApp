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
				<view class="chart-container chart-container-one">
					<text class="chart-title text">{{tideData.chartTideOneTitle}}</text>
					<scroll-view scroll-x="true" @scroll="scrollTideOne">
						<view class="chart-tide">
							<mpvue-echarts :echarts="echarts" :onInit="handleInitTideOne" canvasId="canvasIdTideOne" ref="echartsRefTideOne"></mpvue-echarts>
						</view>
					</scroll-view>
					<!-- 左右指示箭头 -->
					<view v-if="tideOneChevronRightShow" class="chevron chevron-right fa fa-chevron-right" />
					<view v-if="tideOneChevronLeftShow" class="chevron chevron-left fa fa-chevron-left" />
				</view>
				<!-- 第二个图表 只在青岛地区显示 -->
				<view class="chart-container">
					<text class="chart-title text">{{tideData.chartTideTwoTitle}}</text>
					<scroll-view scroll-x="true" @scroll="scrollTideTwo">
						<view class="chart-tide">
							<mpvue-echarts :echarts="echarts" :onInit="handleInitTideTwo" canvasId="canvasIdTideTwo" ref="echartsRefTideTwo"></mpvue-echarts>
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
			<view class="separator" />
			<!-- 精细化预报 -->
			<view class="page-section section-body">
				<view class="refinedChart-body">
					<!-- 地名 -->
					<view class="chart-title text">{{refinedData.dataOne[0].loc}}</view>
					<scroll-view class="speed-up" scroll-x="true" @scroll="handleScrollRefinedOne">
						<view class="chart-refined speed-up">
							<mpvue-echarts :echarts="echarts" :onInit="handleInitRefinedOne" canvasId="canvasIdRefinedOne" ref="echartsRefRefinedOne"></mpvue-echarts>
						</view>
						<!-- 信息面板 -->
						<view class="infopanel">
							<view class="infopanel-day" v-for="(item, index) in refinedData.dataOne" :key="index">
								<view class="infocolumn infocolumn-left text-mini">浪高：{{item.wave}}米\n风力：{{item.windLvl}}级</view>
								<view class="infocolumn text-mini">水温：{{item.temp}}℃\n风向：{{item.windDir}}</view>
							</view>
						</view>
					</scroll-view>
					<!-- 日期球 -->
					<view class="balltrack-fix speed-up">
						<view class="dateball speed-up text-mini" :class="{'dateball-active': ballStatusRefinedOne.fstballActive}">{{fstballText}}</view>
						<view class="dateball speed-up text-mini" :class="{'dateball-active': ballStatusRefinedOne.sndballActive}"
						    :style="{left: ballStatusRefinedOne.sndballLeft + 'px'}">{{sndballText}}</view>
						<view class="dateball speed-up text-mini" :class="{'dateball-active': ballStatusRefinedOne.trdballActive}"
						    :style="{left: ballStatusRefinedOne.trdballLeft + 'px'}">{{trdballText}}</view>
					</view>
					<!-- 左右指示箭头 -->
					<view v-if="ballStatusRefinedOne.chevronRightShow" class="chevron-refined chevron-right fa fa-chevron-right" />
					<view v-if="ballStatusRefinedOne.chevronLeftShow" class="chevron-refined chevron-left fa fa-chevron-left" />
				</view>
				<!-- 两个图表之间的空白 -->
				<view style="height: 60upx" />
				<view>
					<view class="refinedChart-body">
						<!-- 地名 -->
						<view class="chart-title text">{{refinedData.dataTwo[0].loc}}</view>
						<scroll-view class="speed-up" scroll-x="true" @scroll="handleScrollRefinedTwo">
							<view class="chart-refined speed-up">
								<mpvue-echarts :echarts="echarts" :onInit="handleInitRefinedTwo" canvasId="canvasIdRefinedTwo" ref="echartsRefRefinedTwo"></mpvue-echarts>
							</view>
							<!-- 信息面板 -->
							<view class="infopanel">
								<view class="infopanel-day" v-for="(item, index) in refinedData.dataTwo" :key="index">
									<view class="infocolumn infocolumn-left text-mini">浪高：{{item.wave}}米\n风力：{{item.windLvl}}级</view>
									<view class="infocolumn text-mini">水温：{{item.temp}}℃\n风向：{{item.windDir}}</view>
								</view>
							</view>
						</scroll-view>
						<!-- 日期球 -->
						<view class="balltrack-fix speed-up">
							<view class="dateball speed-up text-mini" :class="{'dateball-active': ballStatusRefinedTwo.fstballActive}">{{fstballText}}</view>
							<view class="dateball speed-up text-mini" :class="{'dateball-active': ballStatusRefinedTwo.sndballActive}"
							    :style="{left: ballStatusRefinedTwo.sndballLeft + 'px'}">{{sndballText}}</view>
							<view class="dateball speed-up text-mini" :class="{'dateball-active': ballStatusRefinedTwo.trdballActive}"
							    :style="{left: ballStatusRefinedTwo.trdballLeft + 'px'}">{{trdballText}}</view>
						</view>
						<!-- 左右指示箭头 -->
						<view v-if="ballStatusRefinedTwo.chevronRightShow" class="chevron-refined chevron-right fa fa-chevron-right" />
						<view v-if="ballStatusRefinedTwo.chevronLeftShow" class="chevron-refined chevron-left fa fa-chevron-left" />
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
	import bathsTable from '../../components/bathsTable.vue'
	import tableTitle from '../../components/tableTitle.vue'
	import inshoreTableNew from '../../components/inshoreTableNew.vue'
	import * as echarts from 'echarts'
	import mpvueEcharts from 'mpvue-echarts'

	let chartTideOne = undefined
	let chartTideTwo = undefined
	let chartRefinedOne = undefined
	let chartRefinedTwo = undefined

	export default {
		components: {
			bathsTable,
			tableTitle,
			inshoreTableNew,
			mpvueEcharts
		},
		data() {
			return {
				// 完成的request计数
				completedRequestCount: 0,
				// 日期球的日期文字
				fstballText: '1st',
				sndballText: '2nd',
				trdballText: '3rd',
				// 日期球控制参数
				ballStatusRefinedOne: {
					fstballActive: true,	// 第一个球是否激活（显示为蓝色）
					sndballActive: false,	// 第二个球是否激活（显示为蓝色）
					trdballActive: false,	// 第三个球是否激活（显示为蓝色）
					sndballLeft: 0,		// 第二个球是否位于左端
					trdballLeft: 0,		// 第三个球是否位于左端
					// 左右三角箭头是否显示
					chevronRightShow: true,
					chevronLeftShow: false
				},
				// 日期球控制参数
				ballStatusRefinedTwo: {
					fstballActive: true,	// 第一个球是否激活（显示为蓝色）
					sndballActive: false,	// 第二个球是否激活（显示为蓝色）
					trdballActive: false,	// 第三个球是否激活（显示为蓝色）
					sndballLeft: 0,		// 第二个球是否位于左端
					trdballLeft: 0,		// 第三个球是否位于左端
					// 左右三角箭头是否显示
					chevronRightShow: true,
					chevronLeftShow: false
                },
                // 精细化滑动小球
                trackwidth: 0,          // 滑轨的长度
                scrollwidth: 0,         // 能滚动的最大长度
                sndRightPos: 0,         // 第二个小球的右边位置
                trdRightPos: 0,         // 第三个小球的右边位置
                stageOne: 0,            // 第二个小球到达左边
				stageTwo: 0,            // 第三个小球到达左边
				// 潮汐预报左右三角箭头
				tideOneChevronRightShow: true,
				tideOneChevronLeftShow: false,
				tideTwoChevronRightShow: true,
				tideTwoChevronLeftShow: false,
				// 近海预报日期字符串
				inshoreTitleDate: '',
				// 浴场预报日期字符串
				bathsTitleDate: '',
				echarts
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
				this.setTitleDates(city)
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
						console.log('[服务器]: 请求 青岛预报数据 失败')
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
			// 初始化潮汐预报图表一
			handleInitTideOne(canvas, width, height) {
				chartTideOne = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(chartTideOne)
				chartTideOne.setOption(this.tideData.optionTideOne, true)
				return chartTideOne
			},
			// 初始化潮汐预报图表二
			handleInitTideTwo(canvas, width, height) {
				chartTideTwo = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(chartTideTwo)
				chartTideTwo.setOption(this.tideData.optionTideTwo, true)
				return chartTideTwo
			},
			// 初始化精细化预报图表一
			handleInitRefinedOne(canvas, width, height) {
				chartRefinedOne = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(chartRefinedOne)
				chartRefinedOne.setOption(this.refinedData.optionOne, true)
				return chartRefinedOne
			},
			// 初始化精细化预报图表二
			handleInitRefinedTwo(canvas, width, height) {
				chartRefinedTwo = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(chartRefinedTwo)
				chartRefinedTwo.setOption(this.refinedData.optionTwo, true)
				return chartRefinedTwo
			},
			// 设置曲线图下方日期球的日期
			setDateballText() {
				let now = new Date()
				function formatDate(date) { // 格式化日期为MM-dd
					let month = date.getMonth() + 1
					let day = date.getDate()
					if (month < 10) {
						month = '0' + month
					}
					if (day < 10) {
						day = '0' + day
					}
					return month + '-' + day
				} // end-function formatDate
				// 三个球分别显示今天，明天和后天的日期
				this.fstballText = formatDate(now)
				now = new Date(now.setDate(now.getDate() + 1))
				this.sndballText = formatDate(now)
				now = new Date(now.setDate(now.getDate() + 1))
				this.trdballText = formatDate(now)
            },
            // 初始化第二三个小球的左距
            setDateballLeft() {
                this.trackwidth = this.systemInfo.windowWidth * 90 / 100
                this.scrollwidth = Math.round(this.trackwidth * 190 / 100) + 1
                this.sndRightPos = this.trackwidth - 57
                this.trdRightPos = this.trackwidth - 28
                this.stageOne = this.trackwidth - 29
                this.stageTwo = this.scrollwidth - 58
                this.ballStatusRefinedOne.sndballLeft = this.trackwidth - 57
                this.ballStatusRefinedOne.trdballLeft = this.trackwidth - 28
                this.ballStatusRefinedTwo.sndballLeft = this.trackwidth - 57
                this.ballStatusRefinedTwo.trdballLeft = this.trackwidth - 28
            },
			// 设置日期球的状态 scrollLeft为滚动距最左边的距离 ballObj为包含一系列bool值的object
			setDateballStatus(scrollLeft, ballObj) {
				// 第二个球
                if (scrollLeft < 57) {
                    ballObj.sndballLeft = this.sndRightPos
                } else if (scrollLeft > this.stageOne) {
                    ballObj.sndballLeft = 29
                } else {
                    ballObj.sndballLeft = this.trackwidth - scrollLeft
                }
                // 第三个球
                if (scrollLeft < this.trackwidth) {
                    ballObj.trdballLeft = this.trdRightPos
                } else if (scrollLeft > this.stageTwo) {
                    ballObj.trdballLeft = 58
                } else {
                    ballObj.trdballLeft = this.scrollwidth - scrollLeft
                }
                // 颜色 箭头
                if (scrollLeft < this.stageOne) {
					// 颜色
					ballObj.fstballActive = true
                    ballObj.sndballActive = false
					ballObj.trdballActive = false
					// 箭头
					ballObj.chevronLeftShow = false
                } else if (scrollLeft < this.stageTwo) {
					// 颜色
					ballObj.fstballActive = false
                    ballObj.sndballActive = true
					ballObj.trdballActive = false
					// 箭头
					ballObj.chevronLeftShow = true
					ballObj.chevronRightShow = true
                } else {
					// 颜色
                    ballObj.fstballActive = false
                    ballObj.sndballActive = false
					ballObj.trdballActive = true
					// 箭头
					ballObj.chevronRightShow = false
				}
			},
			// 潮汐图表一滚动事件
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
			// 潮汐图表二滚动事件
			scrollTideTwo (e) {
				if (e.detail.scrollLeft < 80) {
					this.tideTwoChevronLeftShow = false
				} else if (e.detail.scrollLeft < 540) {
					this.tideTwoChevronLeftShow = true
					this.tideTwoChevronRightShow = true
				} else {
					this.tideTwoChevronRightShow = false
				}
			},
			// 精细化图表一滚动事件
			handleScrollRefinedOne(e) {
				// utils.setDateballStatus(e.detail.scrollLeft, this.systemInfo.windowWidth - 60, this.ballStatus)
				this.setDateballStatus(e.detail.scrollLeft, this.ballStatusRefinedOne)
			},
			// 精细化图表二滚动事件
			handleScrollRefinedTwo(e) {
				// utils.setDateballStatus(e.detail.scrollLeft, this.systemInfo.windowWidth - 60, this.ballStatus)
				this.setDateballStatus(e.detail.scrollLeft, this.ballStatusRefinedTwo)
			},
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
			// 潮汐预报第一个chart更新
			tideDataOptionOne: {
				handler (newVal, oldVal) {
					if (chartTideOne !== undefined) {
						if (newVal) {
							chartTideOne.setOption(newVal, true)
							// this.$refs.echartsRefTideOne.init()
						}
					}
				}
			},
			// 潮汐预报第二个chart更新
			tideDataOptionTwo: {
				handler (newVal, oldVal) {
					if (chartTideTwo !== undefined) {
						if (newVal) {
							// chartTideTwo.setOption(newVal, true)
							this.$refs.echartsRefTideTwo.init()
						}
					}
				}
			},
			// 精细化预报第一个chart更新
			refinedDataOptionOne: {
				handler (newVal, oldVal) {
					if (chartRefinedOne !== undefined) {
						if (newVal) {
							chartRefinedOne.setOption(newVal, true)
							// this.$refs.echartsRefRefinedOne.init()
						}
					}
				}
			},
			// 精细化预报第二个chart更新
			refinedDataOptionTwo: {
				handler (newVal, oldVal) {
					if (chartRefinedTwo !== undefined) {
						if (newVal) {
							// chartRefinedTwo.setOption(newVal, true)
							this.$refs.echartsRefRefinedTwo.init()
						}
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
			this.setTitleDates('青岛')
			// 加载时根据当前日期设置日期球文字
            this.setDateballText()
            this.setDateballLeft()
		},
		onPullDownRefresh() {
			console.log('[界面]: 城市预报 下拉刷新')
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

	/* 潮汐曲线上方的地名 */
	.chart-title {
		position: relative;
        width: 95%;
		left: 2.5%;
        border-bottom: 1upx solid #666;
	}

	/* 潮汐预报曲线图的容器 必须设置宽度和高度 */
	.chart-tide {
		width: 290%;
		height: 250upx;
	}

	/* 整个精细化组件的容器 */
	.refinedChart-body {
		position: relative;
	}

	/* 曲线图的容器 必须设置宽度和高度 */
	.chart-refined {
		width: 290%;
		height: 250upx;
	}

	/* 日期球的外观样式 */
	.dateball {
		display: flex;
		width: 62upx;
		height: 62upx;
        position: absolute;
        bottom: 11upx;
		background-color: rgba(148, 148, 148, 0.8);
		border-radius: 62upx;
		align-items: center;
		justify-content: center;
	}

	/* 日期球激活状态时现时为蓝色 */
	.dateball-active {
		background-color: rgba(0, 148, 255, 0.8);
	}

	/* 固定的小球的容器 */
	.balltrack-fix {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		position: absolute;
		bottom: 0;
	}

	/* 图表下方显示信息的面板 */
	.infopanel {
		position: relative;
		width: 290%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		height: 80upx;
	}

	/* 信息面板中一天的部分 */
	.infopanel-day {
		flex: 1;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}

	/* 信息面板的列 */
	.infocolumn {
		flex: 1;
		padding: 10upx;
		white-space: pre-wrap;
	}

	/* 左边的列 文字水平靠右 */
	.infocolumn-left {
		text-align: right;
	}

	/* 潮汐曲线上左右箭头 */
	.chevron {
		position: absolute;
		bottom: 125upx;
		color: #666;
	}
	/* 精细化曲线上左右箭头 */
	.chevron-refined {
		position: absolute;
		bottom: 205upx;
		color: #666;
	}
	.chevron-right {
		right: 2.5%;
	}
	.chevron-left {
		left: 2.5%;
	}
</style>