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
                <view class="temp-cell text-blue text-bold">
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
                        <view class="cell-body text">&nbsp;{{weatherData.weather}}</view>
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
                        <view class="cell-body" :class="{'text': weatherData.aircondition.length < 3, 'text-small': weatherData.aircondition.length > 2}">&nbsp;{{weatherData.aircondition}} {{weatherData.airconDesc}}</view>
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
                        <view class="text-icon text text-bold" :class="{vert: weatherData.pm25Desc === '优', jeune: weatherData.pm25Desc === '良', orange: weatherData.pm25Desc === '轻度污染', rouge: weatherData.pm25Desc === '重度污染'}">
                            PM2.5
                        </view>
                        <view class="cell-body">
                            <!-- pm2.5数值 -->
                            <view class="cell-pm25-column text">&nbsp;{{weatherData.pm25}}</view>
                            <!-- 毫克每立方米单位 -->
                            <view class="cell-pm25-column">
                                <view style="height: 12upx;" />
                                <view class="text-xxs">&nbsp;μg/m³</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 右列 海洋预报列 -->
        <view class="column-right" >
            <view class="bottom-space" />
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
            <view class="title-row-right">
                <!-- <image class="ocean-title-bg" src="../../static/Images/forecastTime_right_img.png" mode="scaleToFill" /> -->
                <image class="ocean-title-bg" src="../../static/Images/forecastTime_left_img.png" mode="scaleToFill" />
                <view class="ocean-title-cell">
                    <view class="text-dark text-bold text-XL">海洋预报</view>
                    <view class="text-green text-xs text-bold">{{datestring}}</view>
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
        /* border: 1upx solid #000; */
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: row;
    }
    /* 左列 */
    .column {
        /* border: 1upx solid #000; */
        flex: 1;
        height: 100vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    /* 右列 */
    .column-right {
        /* border: 1upx solid #000; */
        flex: 1;
        height: 100vh;
        display: flex;
        flex-direction: column-reverse;
    }
    /* 每列上方温度和海洋预报行 */
    .title-row {
        position: relative;
        width: 100%;
        height: 250upx;
    }
    .title-row-right {
        position: relative;
        width: 100%;
        height: 200upx;
    }
    /* 左列天气行 */
    .weather-row {
        position: relative;
        left: 3%;
        width: 80%;
        height: 100upx;
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
        width: 93%;
        height: 100%;
        left: 3.5%;
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
        justify-content: center;
    }
    /* 每行前景内容格 左方图标部分 */
    .cell-header {
        position: relative;
        width: 55upx;
        height: 100%;
        /* left: 10upx; */
    }
    /* 每行前景内容格 文字内容部分 */
    .cell-body {
        height: 100%;
        /* width: 100%; */
        display: flex;
        align-items: center;
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
        /* left: 8upx; */
        top: 12%;
        width: 100%;
        height: 80%;
    }
    /* 空气质量字体icon */
    .font-icon {
        position: absolute;
        /* left: 8upx; */
        height: 100%;
        font-size: 50upx;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    /* 空气质量AQI字样 */
    .text-mini-icon {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 14upx;
    }
    /* pm2.5文字图标 */
    .text-icon {
        /* width: 70upx; */
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
        width: 100%;
        height: 100%;
        left: 0;
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
    /* 右列底部占位空白 */
    .bottom-space {
        /* border: 1upx solid #f00; */
        height: 160upx;
        width: 100%;
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
