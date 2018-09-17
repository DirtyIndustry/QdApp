var state = {
    systeminfo: {}
}

const mutations = {
    setsysteminfo (state, value) {
        state.systeminfo = value
    }
}

const actions = {
    setSystemInfo (context, info) {
        context.commit('setsysteminfo', info)
    }
}

export default {
    state,
    mutations,
    actions
}
