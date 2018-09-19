<template>
<view>
    <view class="container">
        <view class="column weather-column" >
            <view class="separator" />
            <view class="temp-row">
                <image class="temp-bg" src="../../static/Images/forecastTime_left_img.png" mode="scaleToFill" />
                <view class="temp-cell text-dark text-bold">
                    <view class="text-huge">{{weatherData.temperature}}</view>
                    <view class="temp-mark">
                        <view class="text-XXL">℃</view>
                    </view>
                </view>
            </view>
            <view class="weather-row">
                <image class="weather-bg" src="../../static/Images/middle_bottom_right_Sec.png" mode="scaleToFill" />
                <view class="weather-content">
                    <view class="weather-upper"/>
                    <view class="weather-cell">
                        <view class="cell-header">
                            <image class="image-icon" :src="weatherData.weatherIcon" mode="aspectFit" />
                        </view>
                        <view class="cell-body text">{{weatherData.weather}}</view>
                    </view>
                </view>
            </view>
            <view class="weather-row">
                <image class="weather-bg" src="../../static/Images/middle_bottom_right_Sec.png" mode="scaleToFill" />
                <view class="weather-content">
                    <view class="weather-upper"/>
                    <view class="weather-cell">
                        <view class="cell-header" :class="{vert: weatherData.airconDesc === '优', jeune: weatherData.airconDesc === '良', orange: weatherData.airconDesc === '轻度污染', rouge: weatherData.airconDesc === '重度污染'}">
                            <view class="fa fa-leaf font-icon"/>
                            <view class="text-mini-icon">AQI</view>
                        </view>
                        <view class="cell-body text">{{weatherData.aircondition}} {{weatherData.airconDesc}}</view>
                    </view>
                </view>
            </view>
            <view class="weather-row">
                <image class="weather-bg" src="../../static/Images/middle_bottom_right_Sec.png" mode="scaleToFill" />
                <view class="weather-content">
                    <view class="weather-upper"/>
                    <view class="weather-cell">
                        <view class="text-icon text-large text-bold" :class="{vert: weatherData.airconDesc === '优', jeune: weatherData.airconDesc === '良', orange: weatherData.airconDesc === '轻度污染', rouge: weatherData.airconDesc === '重度污染'}">
                            &nbsp;PM2.5
                        </view>
                        <view class="cell-body">
                            <view class="cell-content text">&nbsp;{{weatherData.pm25}}</view>
                            <view class="cell-content">
                                <view style="height: 15upx;" />
                                <view class="text-mini">&nbsp;μg/m³</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="column-right ocean-column" >
            <view style="height: 10vh;" />
            <view class="ocean-row">
                <view class="weather-row-right">
                    <image class="weather-bg" src="../../static/Images/middle_bottom_right_Sec.png" mode="scaleToFill" />
                    <view class="weather-content">
                        <view class="weather-upper"/>
                        <view class="weather-cell">
                            <view class="cell-body text">低潮时: {{qdOceanData.tidelow}}</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="ocean-row">
                <view class="weather-row-right">
                    <image class="weather-bg" src="../../static/Images/middle_bottom_right_Sec.png" mode="scaleToFill" />
                    <view class="weather-content">
                        <view class="weather-upper"/>
                        <view class="weather-cell">
                            <view class="cell-body text">高潮时: {{qdOceanData.tidehigh}}</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="ocean-row">
                <view class="weather-row-right">
                    <image class="weather-bg" src="../../static/Images/middle_bottom_right_Sec.png" mode="scaleToFill" />
                    <view class="weather-content">
                        <view class="weather-upper"/>
                        <view class="weather-cell">
                            <view class="cell-body text">海温: {{qdOceanData.temp}}</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="ocean-row">
                <view class="weather-row-right">
                    <image class="weather-bg" src="../../static/Images/middle_bottom_right_Sec.png" mode="scaleToFill" />
                    <view class="weather-content">
                        <view class="weather-upper"/>
                        <view class="weather-cell">
                            <view class="cell-body text">浪高: {{qdOceanData.wave}}</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="ocean-title">
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
    name: 'qdRealTime',
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

    .container {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: row;
    }
    .column {
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    .column-right {
        display: flex;
        flex-direction: column-reverse;
    }
    .weather-column {
        flex: 4;
    }
    .ocean-column {
        flex: 3;
    }
    .temp-row {
        position: relative;
        width: 100%;
        height: 250upx;
    }
    .temp-bg {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .temp-cell {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .temp-mark {
        height: 50%;
    }
    .weather-row {
        position: relative;
        left: 3%;
        width: 80%;
        height: 130upx;
    }
    .ocean-row {
        position: relative;
        width: 100%;
        height: 100upx;
    }
    .weather-bg {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .weather-content {
        position: absolute;
        left: 3upx;
        width: 98%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .weather-upper {
        width: 100%;
        height: 29%;
    }
    .weather-cell {
        width: 100%;
        height: 60%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .cell-header {
        position: relative;
        width: 88upx;
        height: 100%;
    }
    .font-icon {
        position: absolute;
        left: 8upx;
        height: 100%;
        font-size: 60upx;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .text-mini-icon {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 18upx;
    }
    .image-icon {
        position: absolute;
        left: 8upx;
        width: 90%;
        height: 100%;
    }
    .text-icon {
        width: 70upx;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .cell-body {
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .cell-content {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .ocean-title {
        position: relative;
        width: 100%;
        height: 250upx;
    }
    .ocean-title-bg {
        position: absolute;
        width: 120%;
        height: 100%;
        left: -15%;
        z-index: 1;
    }
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
    .text-huge {
        font-size: 120upx;
    }
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
