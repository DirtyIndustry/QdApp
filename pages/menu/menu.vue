<template>
    <view class="page-body menu-page" catchtouchmove>
        <image src="../../static/Images/back_images.png" mode="aspectFill" style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: -1;" />
        <view class="menu-table">
            <!-- 第一行 -->
            <view class="menu-row">
                <!-- 第一行左 -->
                <view class="menu-cell menu-column">
                    <view class="button-container" >
                        <view class="menu-button" hover-class="button-hover" type="default" @tap="cityforeTap">
                            <image class="menu-button-icon" mode="aspectFit" src="../../static/Images/city_img.png" />
                            <view class="text-large text-dark">近海预报</view>
                        </view>
                        <view class="button-shadow" />
                    </view>
                </view>
                <!-- 第一行右 -->
                <view class="menu-cell menu-column">
                    <view class="button-container">
                        <view class="menu-button" hover-class="button-hover" type="default" @tap="warninglistTap">
                            <image class="menu-button-icon" mode="aspectFit" src="../../static/Images/Warning_img.png" />
                            <view class="text-large text-dark">海洋警报</view>
                        </view>
                        <view class="button-shadow" />
                    </view>
                </view>
            </view>
            <!-- 第二行 -->
            <view class="menu-row">
                <!-- 第二行左 -->
                <view class="menu-cell menu-column">
                    <view class="button-container">
                        <view class="menu-button" hover-class="button-hover" type="default" @tap="oceanforecastTap">
                            <image class="menu-button-icon" mode="aspectFit" src="../../static/Images/area_img.png" />
                            <view class="text-large text-dark">海区预报</view>
                        </view>
                        <view class="button-shadow" />
                    </view>
                </view>
                <!-- 第二行右 -->
                <view class="menu-cell menu-column">
                    <view class="button-container">
                        <view class="menu-button" hover-class="button-hover" type="default" @tap="typhoonpathTap">
                            <image class="menu-button-icon" mode="aspectFit" src="../../static/Images/Typhoon_img.png" />
                            <view class="text-large text-dark">台风路径</view>
                        </view>
                        <view class="button-shadow" />
                    </view>
                </view>
            </view>
            <!-- 第三行 -->
            <view class="menu-row">
                <!-- 第三行左 -->
                <view class="menu-cell menu-column">
                    <view class="button-container">
                        <view class="menu-button" hover-class="button-hover" type="default" @tap="satelliteimgTap">
                            <image class="menu-button-icon" mode="aspectFit" src="../../static/Images/SatelliteCloudMap_img.png" />
                            <view class="text-large text-dark">卫星云图</view>
                        </view>
                        <view class="button-shadow" />
                    </view>
                </view>
                <!-- 第三行右 -->
                <view class="menu-cell menu-column">
                    <view class="button-container">
                        <view class="menu-button" hover-class="button-hover" type="default" @tap="radarimgTap">
                            <image class="menu-button-icon" mode="aspectFit" src="../../static/Images/RadarMap_img.png" />
                            <view class="text-large text-dark">雷达图</view>
                        </view>
                        <view class="button-shadow" />
                    </view>
                </view>
            </view>
            <!-- 第四行 -->
            <view class="menu-row">
                <!-- 第四行左 -->
                <view class="menu-cell menu-column">
                    <view class="button-container">
                        <view class="menu-button" hover-class="button-hover" type="default" @tap="weatherimgTap">
                            <image class="menu-button-icon" mode="aspectFit" src="../../static/Images/WeatherMap_img.png" />
                            <view class="text-large text-dark">天气图</view>
                        </view>
                        <view class="button-shadow" />
                    </view>
                </view>
                <!-- 第四行右 -->
                <view class="menu-cell menu-column">
                    <view class="button-container">
                        <view class="menu-button" hover-class="button-hover" type="default" @tap="weatherTap">
                            <image class="menu-button-icon" mode="aspectFit" src="../../static/Images/WeatherForecast_img.png" />
                            <view class="text-large text-dark">天气预报</view>
                        </view>
                        <view class="button-shadow" />
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    methods: {
        // 近海预报
        cityforeTap (e) {
            console.log('近海预报点击')
            uni.navigateTo({
                url: '../cityforecast/cityforecast'
            })
        },
        // 海洋警报
        warninglistTap (e) {
            console.log('海洋警报点击')
            uni.navigateTo({
                url: '../warninglist/warninglist'
            })
        },
        // 海区预报
        oceanforecastTap (e) {
            console.log('海区预报点击')
            uni.navigateTo({
                url: '../oceanforecast/oceanforecast'
            })
        },
        // 台风路径
        typhoonpathTap (e) {
            console.log('台风路径点击')
            uni.navigateTo({
                url: '../typhoonmap/typhoonmap'
            })
        },
        // 卫星云图
        satelliteimgTap (e) {
            console.log('卫星云图点击')
            uni.navigateTo({
                url: '../satelliteimg/satelliteimg'
            })
        },
        // 雷达图
        radarimgTap (e) {
            console.log('雷达图点击')
            uni.navigateTo({
                url: '../radarimg/radarimg'
            })
        },
        // 天气图
        weatherimgTap (e) {
            console.log('天气图点击')
            uni.navigateTo({
                url: '../weatherimg/weatherimg'
            })
        },
        // 天气预报
        weatherTap (e) {
            console.log('天气预报点击')
            uni.navigateTo({
                url: '../weatherforecast/weatherforecast'
            })
        }
    }
}
</script>

<style scoped>
    @import "../../common/generic.css";

    .menu-page {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .menu-table {
        height: 85%;
        width: 90%;
        display: flex;
        flex-direction: column;
    }

    .menu-row {
        flex: 1;
        display: flex;
        flex-direction: row;
    }

    .menu-column {
        flex: 1;
    }

    .menu-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .button-container {
        width: 300upx;
        height: 140upx;
        position: relative;
    }
    .menu-button {
        position: absolute;
        width: 100%;
        height: 130upx;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        border: 1upx solid #373737;
        border-radius: 10upx;
        z-index: 3;
    }
    .button-hover {
        background-color: rgb(221, 221, 221);
    }
    .button-shadow {
        position: absolute;
        top: 10upx;
        left: 2upx;
        width: calc(100% - 2upx);
        height: 130upx;
        background:repeating-linear-gradient(60deg,#fb3, #fb3 2upx, rgba(255, 255, 255, 0.4) 0,rgba(255, 255, 255, 0.4) 10upx);
        border: 1upx solid #fb3;
        border-radius: 10upx;
        z-index: 2;
    }
    .menu-button-icon {
        width: 50upx;
        height: 50upx;
    }

</style>
