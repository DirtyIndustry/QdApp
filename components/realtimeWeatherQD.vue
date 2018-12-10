<template>
    <view class="component-body">
        <!-- 左列 -->
        <view class="column">
            <!-- 气温行 -->
            <view class="temp-row">
                <!-- 气温背景图片 -->
                <image class="temp-bg" src="../../static/Images/forecastTime_left_img.png" mode="scaleToFill" />
                <!-- 气温内容 -->
                <view class="temp-cell text-blue text-bold">
                    <!-- 气温数字 -->
                    <view class="text-huge">{{weatherData.temperature}}</view>
                    <!-- 气温摄氏度标志 -->
                    <view class="temp-mark">
                        <view class="text-XXL">℃</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 右列 -->
        <view class="column">
            <!-- 天气行 -->
            <view class="row">
                <view class="weather-row">
                    <!-- 天气背景图片 -->
                    <image class="weather-bg" src="../../static/Images/middle_bottom_right_Sec.png" mode="scaleToFill" />
                    <view class="weather-content">
                        <!-- 上方空白 -->
                        <view class="weather-upper"/>
                        <!-- 天气内容 -->
                        <view class="weather-cell">
                            <!-- 天气图标 -->
                            <view class="cell-header">
                                <image class="image-icon" :src="weatherData.weatherIcon" mode="aspectFit" />
                            </view>
                            <!-- 天气描述文字 -->
                            <view class="cell-body text">{{weatherData.weather}}</view>
                        </view>
                    </view>
                </view>
            </view>
            <!-- 空气质量行 -->
            <view class="row">
                <view class="weather-row">
                    <!-- 空气质量背景图片 -->
                    <image class="weather-bg" src="../../static/Images/middle_bottom_right_Sec.png" mode="scaleToFill" />
                    <view class="weather-content">
                        <!-- 上方空白 -->
                        <view class="weather-upper"/>
                        <!-- 空气质量内容 -->
                        <view class="weather-cell">
                            <!-- 空气质量图标 -->
                            <view class="cell-header" :class="{vert: weatherData.airconDesc === '优', jeune: weatherData.airconDesc === '良', orange: weatherData.airconDesc === '轻度污染', sienna: weatherData.airconDesc === '中度污染', rouge: weatherData.airconDesc === '重度污染'}">
                                <view class="fa fa-leaf font-icon"/>
                                <view class="text-mini-icon">AQI</view>
                            </view>
                            <!-- 空气质量描述文字 -->
                            <view class="cell-body text">{{weatherData.aircondition}} {{weatherData.airconDesc}}</view>
                        </view>
                    </view>
                </view>
            </view>
            <!-- pm2.5行 -->
            <view class="row">
                <view class="weather-row">
                    <!-- pm2.5背景图片 -->
                    <image class="weather-bg" src="../../static/Images/middle_bottom_right_Sec.png" mode="scaleToFill" />
                    <view class="weather-content">
                        <!-- 上方空白 -->
                        <view class="weather-upper"/>
                        <!-- pm2.5内容 -->
                        <view class="weather-cell">
                            <!-- 左侧pm2.5字样 -->
                            <view class="text-icon text-large text-bold" :class="{vert: weatherData.pm25Desc === '优', jeune: weatherData.pm25Desc === '良', orange: weatherData.pm25Desc === '轻度污染', sienna: weatherData.pm25Desc === '中度污染', rouge: weatherData.pm25Desc === '重度污染'}">
                                &nbsp;PM2.5
                            </view>
                            <!-- 右侧pm2.5数值和单位 -->
                            <view class="cell-body">
                                <!-- 数值 -->
                                <view class="cell-pm25-column text">&nbsp;{{weatherData.pm25}}</view>
                                <!-- 单位 -->
                                <view class="cell-pm25-column">
                                    <view style="height: 15upx;" />
                                    <view class="text-xxs">&nbsp;μg/m³</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'realtimeWeatherQD',
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
        }
    }
}
</script>

<style scoped>
@import "../common/generic.css";
@import "../common/FontAwesome.css";
/* 整体容器 */
.component-body {
    width: 100%;
    height: 380upx;
    display: flex;
    flex-direction: row;
}
/* 左右两列 */
.column {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
/* 右侧的行 */
.row {
    flex: 1;
    width: 100%;
}
/* 左侧温度的行 */
.temp-row {
    position: relative;
    width: 100%;
    height: 250upx;
}
/* 温度背景图片 */
.temp-bg {
    position: absolute;
    width: 100%;
    height: 100%;
}
/* 温度单元格 */
.temp-cell {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
/* 温度数字巨型字体 */
.text-huge {
    font-size: 120upx;
}
/* 温度摄氏度单位标志 */
.temp-mark {
    height: 50%;
}
/* 右侧天气行 */
.weather-row {
    position: relative;
    left: 10%;
    width: 90%;
    height: 130upx;
}
/* 右侧天气 背景图片 */
.weather-bg {
    position: absolute;
    width: 100%;
    height: 100%;
}
/* 右侧天气 前景内容 */
.weather-content {
    position: absolute;
    left: 3upx;
    width: 98%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
/* 右侧天气 上方空白占位 */
.weather-upper {
    width: 100%;
    height: 29%;
}
/* 右侧天气 内容单元格 */
.weather-cell {
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: row;
    align-items: center;
}
/* 右侧天气 前方图标 */
.cell-header {
    position: relative;
    width: 88upx;
    height: 100%;
}
/* 空气质量字体图标 */
.font-icon {
    position: absolute;
    left: 8upx;
    height: 100%;
    font-size: 60upx;
    display: flex;
    flex-direction: row;
    align-items: center;
}
/* 空气质量 AQI字样 */
.text-mini-icon {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 18upx;
}
/* 天气 图片图标 */
.image-icon {
    position: absolute;
    left: 8upx;
    width: 90%;
    height: 100%;
}
/* pm2.5 文字图标 */
.text-icon {
    width: 70upx;
    height: 100%;
    display: flex;
    align-items: center;
}
/* 内容单元格 */
.cell-body {
    width: 100%;
    display: flex;
    justify-content: center;
}
/* pm2.5单元格内列 */
.cell-pm25-column {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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
.sienna {
    color: sienna;
}
.rouge {
    color: red;
}
</style>
