<template>
	<view class="my-settle">
		<label class="radio">
			<radio :checked="allChecked" @click="changeChecked" color="#C00000" /><text>全选</text>
		</label>
		<view class="total">
			合计:<text>￥{{totalPrice}}</text>
		</view>
		<view class="pay">
			<text>结算({{checkedCount}})</text>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('moduleCart', ['changeAllChecked']),
			changeChecked() {
				this.changeAllChecked(!this.allChecked)
			}
		},
		computed: {
			...mapGetters('moduleCart', ['checkedCount', 'allChecked', 'totalPrice'])
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
