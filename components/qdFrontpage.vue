<template>
<view>
    <view class="container">
        <!-- 左列 天气列 -->
        <view class="column" >
            <view class="separator" />
            <!-- 气温行 -->
            <view class="title-row">
                <!-- 背景图片 -->
                <image class="bgimg" src="../../static/Images/forecastTime_left_img.png" mode="scaleToFill" />
                <!-- 温度数字 -->
                <view class="temp-cell text-dark text-bold">
                    <view class="text-huge">{{weatherData.temperature}}</view>
                    <view class="temp-mark">
                        <view class="text-XXL">℃</view>
                    </view>
                </view>
            </view>
            <!-- 天气状况 -->
            <view class="weather-row">
                <image class="bgimg" src="../../static/Images/middle_bottom_right_Sec.png" mode="scaleToFill" />
                <view class="row-content">
                    <!-- 上方空白 -->
                    <view class="row-content-upper"/>
                    <view class="row-content-cell">
                        <!-- 天气图标 -->
                        <view class="cell-header">
                            <image class="image-icon" :src="weatherData.weatherIcon" mode="aspectFit" />
                        </view>
                        <!-- 文字描述 -->
                        <view class="cell-body text">{{weatherData.weather}}</view>
                    </view>
                </view>
            </view>
            <!-- 空气状况 -->
            <view class="weather-row">
                <image class="bgimg" src="../../static/Images/middle_bottom_right_Sec.png" mode="scaleToFill" />
                <view class="row-content">
                    <view class="row-content-upper"/>
                    <view class="row-content-cell">
                        <!-- 空气质量图标 -->
                        <view class="cell-header" :class="{vert: weatherData.airconDesc === '优', jeune: weatherData.airconDesc === '良', orange: weatherData.airconDesc === '轻度污染', rouge: weatherData.airconDesc === '重度污染'}">
                            <view class="fa fa-leaf font-icon"/>
                            <view class="text-mini-icon">AQI</view>
                        </view>
                        <!-- 文字描述 -->
                        <view class="cell-body text">{{weatherData.aircondition}} {{weatherData.airconDesc}}</view>
                    </view>
                </view>
            </view>
            <!-- pm2.5 -->
            <view class="weather-row">
                <image class="bgimg" src="../../static/Images/middle_bottom_right_Sec.png" mode="scaleToFill" />
                <view class="row-content">
                    <view class="row-content-upper"/>
                    <view class="row-content-cell">
                        <!-- pm2.5字样 -->
                        <view class="text-icon text-large text-bold" :class="{vert: weatherData.airconDesc === '优', jeune: weatherData.airconDesc === '良', orange: weatherData.airconDesc === '轻度污染', rouge: weatherData.airconDesc === '重度污染'}">
                            &nbsp;PM2.5
                        </view>
                        <view class="cell-body">
                            <!-- pm2.5数值 -->
                            <view class="cell-pm25-column text">&nbsp;{{weatherData.pm25}}</view>
                            <!-- 毫克每立方米单位 -->
                            <view class="cell-pm25-column">
                                <view style="height: 15upx;" />
                                <view class="text-mini">&nbsp;μg/m³</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 右列 海洋预报列 -->
        <view class="column-right" >
            <view style="height: 10vh;" />
            <!-- 低潮时行 -->
            <view class="ocean-row">
                    <image class="bgimg" src="../../static/Images/middle_bottom_right_Sec.png" mode="scaleToFill" />
                    <view class="row-content">
                        <view class="row-content-upper"/>
                        <view class="row-content-cell">
                            <view class="cell-body text">低潮时: {{qdOceanData.tidelow}}</view>
                        </view>
                    </view>
            </view>
            <!-- 高潮时行 -->
            <view class="ocean-row">
                    <image class="bgimg" src="../../static/Images/middle_bottom_right_Sec.png" mode="scaleToFill" />
                    <view class="row-content">
                        <view class="row-content-upper"/>
                        <view class="row-content-cell">
                            <view class="cell-body text">高潮时: {{qdOceanData.tidehigh}}</view>
                        </view>
                    </view>
            </view>
            <view class="ocean-row">
                    <image class="bgimg" src="../../static/Images/middle_bottom_right_Sec.png" mode="scaleToFill" />
                    <view class="row-content">
                        <view class="row-content-upper"/>
                        <view class="row-content-cell">
                            <view class="cell-body text">海温: {{qdOceanData.temp}}</view>
                        </view>
                    </view>
            </view>
            <view class="ocean-row">
                    <image class="bgimg" src="../../static/Images/middle_bottom_right_Sec.png" mode="scaleToFill" />
                    <view class="row-content">
                        <view class="row-content-upper"/>
                        <view class="row-content-cell">
                            <view class="cell-body text">浪高: {{qdOceanData.wave}}</view>
                        </view>
                    </view>
            </view>
            <view class="title-row">
                <image class="ocean-title-bg" src="../../static/Images/forecastTime_right_img.png" mode="scaleToFill" />
                <view class="ocean-title-cell">
                    <view class="text-dark text-bold text-XL">海洋预报</view>
                    <view class="text-green text-small text-bold">{{datestring}}</view>
                </view>
            </view>
        </view>
    </view>
</view>
</template>

<script>
export default {
    name: 'qdFrontpage',
    props: {
        // 实时天气
        weatherData: {
            type: Object,
            default () {
                return {
                    temperature: '', // 气温
                    aircondition: '', // 空气质量
                    airconDesc: '',
                    weather: '',
                    weatherIcon: '', // 天气图表
                    pm25: '', // PM2.5
                    pm25Style: ''
                }
            }
        },
        // 青岛海洋预报
        qdOceanData: {
            type: Object,
            default () {
                return {
                    wave: '',
                    temp: '',
                    tidehigh: '',
                    tidelow: ''
                }
            }
        }
    },
    data () {
        return {
            datestring: ''
        }
    },
    methods: {
        setDatestring () {
            let now = new Date()
            let one = (now.getMonth() + 1) + '月' + now.getDate() + '日0时'
            now.setDate(now.getDate() + 1)
            let two = (now.getMonth() + 1) + '月' + now.getDate() + '日0时'
            this.datestring = one + '~' + two
        }
    },
    onLoad () {
        this.setDatestring()
    }
}
</script>

<style scoped>
    @import "../common/generic.css";
    @import "../common/FontAwesome.css";

    /* 整体容器 */
    .container {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: row;
    }
    /* 左列 */
    .column {
        flex: 4;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    /* 右列 */
    .column-right {
        flex: 3;
        display: flex;
        flex-direction: column-reverse;
    }
    /* 每列上方温度和海洋预报行 */
    .title-row {
        position: relative;
        width: 100%;
        height: 250upx;
    }
    /* 左列天气行 */
    .weather-row {
        position: relative;
        left: 3%;
        width: 80%;
        height: 130upx;
    }
    /* 右列海洋行 */
    .ocean-row {
        position: relative;
        width: 100%;
        height: 100upx;
    }
    /* 每行的背景图片 */
    .bgimg {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    /* 每行的前景内容 */
    .row-content {
        position: absolute;
        left: 3upx;
        width: 98%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    /* 每行前景上方占位空白 */
    .row-content-upper {
        width: 100%;
        height: 29%;
    }
    /* 每行前景内容格 */
    .row-content-cell {
        width: 100%;
        height: 60%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    /* 每行前景内容格 左方图标部分 */
    .cell-header {
        position: relative;
        width: 88upx;
        height: 100%;
    }
    /* 每行前景内容格 文字内容部分 */
    .cell-body {
        width: 100%;
        display: flex;
        justify-content: center;
    }
    /* 气温单元格 */
    .temp-cell {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    /* 气温大型字体 */
    .text-huge {
        font-size: 120upx;
    }
    /* 摄氏度单位容器 */
    .temp-mark {
        height: 50%;
    }
    /* 天气状况图片图标 */
    .image-icon {
        position: absolute;
        left: 8upx;
        width: 90%;
        height: 100%;
    }
    /* 空气质量字体icon */
    .font-icon {
        position: absolute;
        left: 8upx;
        height: 100%;
        font-size: 60upx;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    /* 空气质量AQI字样 */
    .text-mini-icon {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 18upx;
    }
    /* pm2.5文字图标 */
    .text-icon {
        width: 70upx;
        height: 100%;
        display: flex;
        align-items: center;
    }
    /* pm2.5单元格内的列 */
    .cell-pm25-column {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    /* 海洋预报背景图片 */
    .ocean-title-bg {
        position: absolute;
        width: 120%;
        height: 100%;
        left: -15%;
        z-index: 1;
    }
    /* 海洋预报单元格 */
    .ocean-title-cell {
        position: absolute;
        left: -15%;
        width: 120%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        z-index: 2;
    }
    /* 颜色 */
    .vert {
        color: green;
    }
    .jeune {
        color: goldenrod;
    }
    .orange {
        color: Chocolate;
    }
    .rouge {
        color: red;
    }
</style>
