var state = {
    // 实时天气
    weatherdata: {
        temperature: '25', // 气温
        aircondition: '35', // 空气质量
        airconDesc: '优',
        weather: '晴',
        weatherIcon: '../../static/Images/right_weather_fine.png', // 天气图表
        pm25: '8', // PM2.5
        pm25Style: 'good'
    },
    // 潮汐预报
    tidedata: {
        chartTideOneTitle: '',	// 两个图表的地区
        chartTideTwoTitle: '',
        chartTideTwoShow: true,	// 第二个图表是否显示
        optionTideOne: {},		// 两个图表的option
        optionTideTwo: {}
    },
    // 近海预报
    inshoredata: {
        location: "",
        time: "",
        data: [
            {
                loc: "海域",
                wave: "浪高(m)",
                temp: "表层水温(℃)"
            },
            {
                loc: "",
                wave: "",
                temp: ""
            },
            {
                loc: "",
                wave: "",
                temp: ""
            },
            {
                loc: "",
                wave: "",
                temp: ""
            },
            {
                loc: "",
                wave: "",
                temp: ""
            }
        ],
        showextra: true,
        extrawave48h: "",
        extratemp48h: "",
        extrawave72h: "",
        extratemp72h: ""
    },
    // 浴场预报
    bathsdata: {
        showBaths: true,
        data: [
            {
                PublishDate: "",
                BathsName: "",
                WaveHeight: "",
                WaterTemp: "",
                Swimming: ""
            },
            {
                PublishDate: "",
                BathsName: "",
                WaveHeight: "",
                WaterTemp: "",
                Swimming: ""
            },
            {
                PublishDate: "",
                BathsName: "",
                WaveHeight: "",
                WaterTemp: "",
                Swimming: ""
            },
            {
                PublishDate: "",
                BathsName: "",
                WaveHeight: "",
                WaterTemp: "",
                Swimming: ""
            },
            {
                PublishDate: "",
                BathsName: "",
                WaveHeight: "",
                WaterTemp: "",
                Swimming: ""
            }
        ]
    },
    // 精细化预报
    refineddata: {
        optionOne: {},	// 两个图表的option
        optionTwo: {},
        show: true,	// 精细化模块是否显示
        showTwo: true,	// 第二个图表是否显示
        dataOne: [	// 图标周围显示的数据
            {
                loc: '',
                time: '',
                wave: '',
                temp: '',
                windLvl: '',
                windDir: ''
            },
            {
                loc: '',
                time: '',
                wave: '',
                temp: '',
                windLvl: '',
                windDir: ''
            },
            {
                loc: '',
                time: '',
                wave: '',
                temp: '',
                windLvl: '',
                windDir: ''
            },
        ],
        dataTwo: [	// 图标周围显示的数据
            {
                loc: '',
                time: '',
                wave: '',
                temp: '',
                windLvl: '',
                windDir: ''
            },
            {
                loc: '',
                time: '',
                wave: '',
                temp: '',
                windLvl: '',
                windDir: ''
            },
            {
                loc: '',
                time: '',
                wave: '',
                temp: '',
                windLvl: '',
                windDir: ''
            },
        ]
    },
    // 五日天气
    fivedaydata: {
        fivedayWeather: [   // 五日天气详情
            {
                week: '',
                date: '',
                weather: '',
                weatherIcon: '',
                windDir: '',
                windLvl: ''
            },
            {
                week: '',
                date: '',
                weather: '',
                weatherIcon: '',
                windDir: '',
                windLvl: ''
            },
            {
                week: '',
                date: '',
                weather: '',
                weatherIcon: '',
                windDir: '',
                windLvl: ''
            },
            {
                week: '',
                date: '',
                weather: '',
                weatherIcon: '',
                windDir: '',
                windLvl: ''
            },
            {
                week: '',
                date: '',
                weather: '',
                weatherIcon: '',
                windDir: '',
                windLvl: ''
            }
        ],
        optionFiveday: {}   // 五日高低温图表option
    },
    // 青岛首页专项
    qdoceandata: {
        wave: '',
        temp: '',
        tidehigh: '',
        tidelow: ''
    }
}

const mutations = {
    setweather (state, value) {
        state.weatherdata = value
    },
    settide (state, value) {
        state.tidedata = value
    },
    setinshore (state, value) {
        state.inshoredata = value
    },
    setbaths (state, value) {
        state.bathsdata = value
    },
    setrefined (state, value) {
        state.refineddata = value
    },
    setfiveday (state, value) {
        state.fivedaydata = value
    },
    setqdocean (state, value) {
        state.qdoceandata = value
    }
}

const actions = {
    setWeatherData (context, weatherdata) {
        context.commit('setweather', weatherdata)
    },
    setTideData (context, tidedata) {
        context.commit('settide', tidedata)
    },
    setInshoreData (context, inshoredata) {
        context.commit('setinshore', inshoredata)
    },
    setBathsData (context, bathsdata) {
        context.commit('setbaths', bathsdata)
    },
    setRefinedData (context, refineddata) {
        context.commit('setrefined', refineddata)
    },
    setFivedayData (context, fivedaydata) {
        context.commit('setfiveday', fivedaydata)
    },
    setQdOceanData (context, qdoceandata) {
        context.commit('setqdocean', qdoceandata)
    }
}

export default {
    state,
    mutations,
    actions
}
