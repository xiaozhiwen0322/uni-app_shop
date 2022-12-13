<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in goodsinfo.pics" :key="i" @click="preview(i)">
				<image :src="item.pics_big"></image>
			</swiper-item>
		</swiper>
		<!-- 主要信息 -->
		<view class="primary">
			<!-- 商品价格 -->
			<view class="goods-price">
				￥{{goodsinfo.goods_price}}
			</view>
			<!-- 商品名称及收藏 -->
			<view class="name-star">
				<!-- 商品名称 -->
				<view class="goods-name">
					{{goodsinfo.goods_name}}
				</view>
				<!-- 收藏 -->
				<view class="collent">
					<uni-icons type="star" size="25"></uni-icons>
					<text>收藏</text>
				</view>


			</view>
			<!-- 快递-免运费 -->
			<view class="express">快递:免运费--{{cart.length}}</view>

		</view>
		<rich-text :nodes="goodsinfo.goods_introduce"></rich-text>
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
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
		data() {
			return {
				goodsinfo: {},
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		computed: {
			...mapState('moduleCart', ['cart']),
			...mapGetters('moduleCart', ['total'])
		},
		methods: {
			...mapMutations('moduleCart', ['addToCart']),
			buttonClick(e) {
				if (e.content.text === "加入购物车") {
					const goods = {
						goods_id: this.goodsinfo.goods_id,
						goods_name: this.goodsinfo.goods_name,
						goods_price: this.goodsinfo.goods_price,
						goods_count: 1,
						goods_small_logo: this.goodsinfo.goods_small_logo,
						goods_state: true
					}
					this.addToCart(goods)
					this.options[2].info = this.total
				}
			},
			async getGoodsInfo(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block"').replace(/webp /g, 'jpg')
				this.goodsinfo = res.message
			},
			preview(i) {
				uni.previewImage({
					current: i,
					urls: this.goodsinfo.pics.map(pic => {
						return pic.pics_big
					})
				})
			},
			onClick(e) {
				if (e.content.text == "购物车") {
					uni.switchTab({
						url: ('/pages/cart/cart')
					})
				}
			}
		},
		onLoad(options) {
			const goods_id = options.goods_id
			this.getGoodsInfo(goods_id)
			this.options[2].info = this.total
		}

	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.primary {
		.goods-price {
			font-size: 20px;
			color: #9e0d16;
			margin-top: 10px;
			margin-left: 5px;
		}

		.name-star {
			margin-top: 7px;
			display: flex;
			justify-content: space-between;

			.goods-name {
				width: 80%;
				margin-left: 5px;
				font-size: 15px;
				align-items: center;
				padding-right: 5px;
				border-right: 1px solid #a2a2a2;
			}

			.collent {
				display: flex;
				flex-direction: column;
				margin-right: 15px;
				color: #a2a2a2;
				font-size: 14px;
				justify-content: space-around;
				align-items: center;
			}
		}

		.express {
			color: #a2a2a2;
			font-size: 14px;
			margin-top: 7px;
			margin-left: 5px;
		}
	}

	.goods-nav {
		position: sticky;
		bottom: 0;
		z-index: 999;
	}
</style>
