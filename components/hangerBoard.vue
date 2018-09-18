<template>
    <view class="board-body">
        <image class="background" src="../../static/Images/middle_bottom_right_Sec.png" mode="scaleToFill" />
        <view class="foreground">
            <view class="empty-upper"/>
            <view class="board-content">
                <slot></slot>
            </view>
        </view>
    </view>
</template>

<script>
export default {
name: 'hangerBoard',
}
</script>

<style scoped>
.board-body {
    position: relative;
    width: 100%;
    height: 100%;
}
.background {
    position: absolute;
    width: 100%;
    height: 100%;
}
.foreground {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.empty-upper {
    width: 100%;
    height: 29%;
}
.board-content {
    border: 1upx solid #000;
    width: 100%;
    height: 60%;
}
</style>
