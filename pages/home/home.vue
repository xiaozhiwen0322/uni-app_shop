<template>
	<view>
		<view class="search">
			<my-search @click="gotoSearch"></my-search>
		</view>

		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="item in bannerList" :key="item.goods_id">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>

		<!-- navItem区域 -->
		<view class="nav-box">
			<view v-for="(item,i) in navList" :key="i" class="nav-item" @click="navClickHandle(item.name)">
				<image :src="item.image_src" mode="" class="nav-img"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList" :key="i">
				<!-- 标题区 -->
				<image :src="item.floor_title.image_src" class="title-image"></image>
				<!-- 图片展示区 -->
				<view class="image-show">
					<!-- 左侧长图片区域 -->
					<navigator :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧四个小图片 -->
					<view class="right-smallimg">
						<navigator class="smallimg-item" v-for="(item2,i2) in item.product_list" :key="i2"
							:url="item2.url" v-if="i2 !== 0">
							<image :src="item2.image_src" :style="{width:item2.image_width + 'rpx'}" mode="widthFix">
							</image>
						</navigator>
					</view>
				</view>

			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				// 轮播图数据
				bannerList: [],
				// 分类导航数据
				navList: [],
				// 楼层数据
				floorList: []
			};
		},
		onLoad() {
			this.getBannerList();
			this.getnavList();
			this.getFloorList()
		},
		methods: {
			// 获取轮播图数据请求
			async getBannerList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				} else {
					this.bannerList = res.message
				}
			},
			// 获取分类导航数据请求
			async getnavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems');
				if (res.meta.status !== 200) return uni.$showMsg();
				this.navList = res.message
			},
			// 获取楼层数据请求
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata');
				if (res.meta.status !== 200) return uni.$showMsg();

				// 处理数据
				console.log(res);
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = prod.navigator_url = "/subpkg/goods_list/goods_list?" + prod
							.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			},
			// 分类导航点击事件
			navClickHandle(name) {
				if (name == "分类")
					uni.switchTab({
						url: "/pages/cate/cate"
					})
			},
			//搜索栏跳转
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}

	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			height: 100%;
			width: 100%;
		}
	}

	.nav-box {
		display: flex;
		justify-content: space-around;

		.nav-item {
			width: 128rpx;
			margin: 15px;

			.nav-img {
				width: 100%;
				height: 140rpx;
			}
		}
	}

	.floor-list {
		.floor-item {
			.title-image {
				height: 36px;
				width: 100%;
			}
		}

		.image-show {
			display: flex;
			justify-content: space-between;
			padding-left: 10rpx;

			.right-smallimg {
				width: 500rpx;
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
			}
		}

		.search {
			position: sticky;
			top: 0;
			z-index: 999;
		}
	}
</style>
