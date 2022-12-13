export default {
	namespaced: true,
	state: () => ({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	mutations: {
		addToCart(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			// console.log('result', findResult);
			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			this.commit('moduleCart/saveCart')
			// console.log('cart', state.cart);
		},
		saveCart(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		updateGoodsState(state, goods) {
			const findResult = state.cart.find(x =>
				x.goods_id === goods.goods_id
			)
			if (findResult) {
				findResult.goods_state = goods.goods_state
				this.commit('moduleCart/saveCart')
			}
		},
		updateGoodsCount(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findResult) {
				// console.log('findResult', findResult);
				findResult.goods_count = goods.goods_count
				// state.cart.goods_count = goods.goods_count
				this.commit('moduleCart/saveCart')
			}
		},
		deleteGoods(state, goods) {
			state.cart = state.cart.filter(x => x.goods_id != goods.goods_id)
			this.commit('moduleCart/saveCart')
		},
		changeAllChecked(state, newCheck) {
			state.cart.forEach(item => item.goods_state = newCheck)
			this.commit('moduleCart/saveCart')
		}
	},
	getters: {
		total(state) {
			let c = 0
			state.cart.forEach(item => {
				c += item.goods_count
			})
			return c
		},
		checkedCount(state) {
			return state.cart.filter(x => x.goods_state).reduce((count, item) =>
				count += item.goods_count, 0)
		},
		allChecked(state) {
			const checkedCount = state.cart.filter(x => x.goods_state).reduce((count, item) => count += item
				.goods_count, 0)
			const allCount = state.cart.reduce((count, item) => count += item.goods_count, 0)
			if (checkedCount === allCount) return true
			return false
		},
		totalPrice(state) {
			return state.cart.filter(x => x.goods_state).reduce((count, item) =>
				count += item.goods_price * item.goods_count, 0)
		}
	}

}
