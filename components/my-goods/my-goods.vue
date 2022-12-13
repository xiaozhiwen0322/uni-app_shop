<template>
	<view class="goods-item">
		<!-- 左侧的盒子 -->
		<view class="goods-item-left">
			<radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="changeState">
			</radio>
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<!-- 右侧的盒子 -->
		<view class="goods-item-right">
			<!-- 商品的名字 -->
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">
					￥{{goods.goods_price | toFixed}}
				</view>
				<view class="num-box">
					<uni-number-box min="1" v-if="showNum" :value="goods.goods_count" @change="changeNum">
					</uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		props: {
			goods: {
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNum: {
				type: Boolean,
				default: false
			}
		},
		filters: {
			toFixed(num) {
				return Number(num).toFixed(2)
			}
		},
		data() {
			return {

			};
		},
		methods: {
			changeState() {
				this.$emit('radioChange', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			changeNum(val) {
				this.$emit('numChange', {
					goods_id: this.goods.goods_id,
					goods_count: val + 0
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 5px;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}

			.goods-info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.goods-price {
					color: #c00000;
					font-size: 16px;
				}
			}
		}
	}
</style>
