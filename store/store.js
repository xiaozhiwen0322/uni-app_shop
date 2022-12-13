import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from './cart.js'
import moduleAddress from './address.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		moduleCart,
		moduleAddress
	}
})

export default store
