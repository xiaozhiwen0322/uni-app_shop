<template>
	<view class="my-settle">
		<label class="radio">
			<radio :checked="allChecked" @click="changeChecked" color="#C00000" /><text>全选</text>
		</label>
		<view class="total">
			合计:<text>￥{{totalPrice}}</text>
		</view>
		<view class="pay" @click="settlement">
			<text>结算({{checkedCount}})</text>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				second: 3,
				timer: null
			};
		},
		methods: {
			...mapMutations('moduleCart', ['changeAllChecked']),
			...mapMutations('moduleAddress', ['updateRedirectInfo']),
			changeChecked() {
				this.changeAllChecked(!this.allChecked)
			},
			settlement() {
				if (!this.checkedCount) return uni.$showMsg('请选择商品')
				// if (!this.addstr) return uni.$showMsg('请选择收货地址')
				// if (!this.token) return uni.$showMsg('请先登录')
				if (!this.token) return this.countdown()
				this.payOrder()
			},
			async payOrder() {
				// 组织订单数据
				const orderInfo = {
					// order_price: this.totalPrice,
					order_price: 0.01,
					consignee_addr: this.addstr,
					goods: this.cart.filter(x => x.goods_state).map(x => ({
						goods_id: x.goods_id,
						goods_number: x.goods_count,
						goods_price: x.goods_price
					}))
				}
				// 发起订单请求
				const {
					data: res
				} = await uni.$http.post('/api/public/v1/my/orders/creat', orderInfo)
				console.log(res);
				if (res.status !== 200) return uni.$showMsg('创建订单失败')
				// 得到服务器的订单编号

			},
			countdown() {
				this.showTips(this.second)
				this.timer = setInterval(() => {
					this.second--
					this.showTips(this.second)
					if (this.second <= 0) {
						clearInterval(this.timer)
						uni.switchTab({
							url: '/pages/my/my',
							success: () => {
								this.updateRedirectInfo({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})

						this.second = 3
					}

				}, 1000)
			},
			showTips(n) {
				uni.showToast({
					icon: 'none',
					title: '您还未登录，将在' + n + '秒后为您跳转到登录页面',
					mask: true,
					duration: 1500
				})
			}
		},
		computed: {
			...mapGetters('moduleCart', ['checkedCount', 'allChecked', 'totalPrice']),
			...mapState('moduleAddress', ['token', 'addstr']),
			...mapState('moduleCart', ['cart'])
		}
	}
</script>

<style lang="scss">
	.my-settle {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 50px;
		padding-left: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #d8d8d8;

		.radio {
			display: flex;
			align-items: center;
		}

		.total {
			text {
				color: #C00000;
			}
		}

		.pay {
			width: 33.333%;
			height: 100%;
			background-color: #C00000;
			text-align: center;
			line-height: 50px;
			color: #ffffff;
		}
	}
</style>
