<template>
	<view class="no-shop" v-if="cart.length === 0">
		<view>
			<image class="shopcar" src="/static/images/shopcar.png" mode=""></image>
		</view>
		<text>这里还什么都没有呢~</text>
	</view>
	<view v-else>
		<my-address></my-address>
		<!-- 标题区域 -->
		<view class="cart-title">
			<!-- 左侧图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧文本 -->
			<text class="cart-title-text">购物车</text>
		</view>
		<!-- 渲染商品数据 -->
		<uni-swipe-action>
			<block class="goods-item" v-for="(item,i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="delGoods(item)">
					<my-goods :goods="item" :showRadio='true' :showNum="true" @radioChange="radioChangeHandler"
						@numChange="numChangeHandler"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<my-settle></my-settle>
	</view>
</template>

<script>
	import tabbarBadge from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [tabbarBadge],
		data() {
			return {
				options: [{
					text: "删除",
					style: {
						backgroundColor: "#C00000"
					}
				}]
			};
		},
		methods: {
			...mapMutations('moduleCart', ['updateGoodsState', 'updateGoodsCount', 'deleteGoods']),
			radioChangeHandler(e) {
				this.updateGoodsState(e)
			},
			numChangeHandler(e) {
				// console.log(e);
				this.updateGoodsCount(e)
			},
			delGoods(goods) {
				this.deleteGoods(goods)
			}
		},
		computed: {
			...mapState('moduleCart', ['cart'])
		},

		onShow() {
			this.setBadge()
		}
	}
</script>

<style lang="scss">
	.no-shop {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;

		.shopcar {
			width: 100px;
			height: 100px;

		}

		text {
			font-size: 12px;
			margin-top: 10px;
		}
	}

	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #EFEFEF;

		.cart-title-text {
			font-size: 14px;
			margin-left: 10px;
		}
	}
</style>
