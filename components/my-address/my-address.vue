<template>
	<view>
		<!-- 添加收获地址 -->
		<view class="context-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" @click="chooseAddress">添加收获地址+</button>
		</view>
		<!-- 已有收获地址 -->
		<view @click="chooseAddress" class="address-show" v-else>
			<view class="name-and-tel">
				<view class="left">
					<text>收货人:{{address.userName}}</text>
				</view>
				<view class="right">
					<text>电话：{{address.telNumber}}</text>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
			</view>
			<view class="shipping-address">
				<text>收获地址:{{addstr}}</text>
			</view>
		</view>
		<!-- 分割线 -->
		<view>
			<image class="cut-line" src="/static/images/cutLine.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		name: "my-address",
		data() {
			return {};
		},
		methods: {
			...mapMutations('moduleAddress', ['updateAddress']),
			async chooseAddress() {
				const [err, succ] = await uni.chooseAddress().catch(err => err)
				if (err === null && succ.errMsg === 'chooseAddress:ok') {
					// this.address = succ
					this.updateAddress(succ)
				}
			}
		},
		computed: {
			...mapState('moduleState', ['address']),
			...mapGetters('moduleAddress', ['addstr'])
		}
	}
</script>

<style lang="scss">
	.context-box {
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.address-show {
		.name-and-tel {
			display: flex;
			justify-content: space-between;
			padding: 0 5px;
			margin: 7px 0;

			.right {
				line-height: 20px;

				uni-icons {
					vertical-align: middle;
				}
			}
		}

		.shipping-address {
			padding: 0 5px;
			margin: 7px 0;
			margin-bottom: 14px;
		}
	}

	.cut-line {
		display: block;
		width: 100%;
		height: 5px;
	}
</style>
