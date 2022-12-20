export default {
	namespaced: true,
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		// token: JSON.parse(uni.getStorageSync('token') || '0'),
		token: uni.getStorageSync('token') || '',
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		redirectInfo: null
	}),
	mutations: {
		updateAddress(state, address) {
			state.address = address,
				this.commit('moduleAddress/saveAddressToStorage')
		},
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		updateUserinfo(state, userinfo) {
			state.userinfo = userinfo
			this.commit('moduleAddress/saveUserinfoToStorage')
		},
		saveUserinfoToStorage(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
		// updateToken(state, token) {
		// 	uni.setStorageSync('token', JSON.stringify(token))
		// 	state.token = JSON.parse(uni.getStorageSync('token') || '')
		// },
		updateToken(state, token) {
			state.token = token
			this.commit('moduleAddress/saveTokenToStorage')
		},
		saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
		},
		updateRedirectInfo(state, info) {
			state.redirectInfo = info
			console.log(state.redirectInfo);
		}
	},
	getters: {
		addstr(state) {
			if (!state.address.provinceName) return
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
				.detailInfo
		}
	}
}
