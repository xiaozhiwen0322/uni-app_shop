<template>
	<view>
		<my-search @click="gotoSearch"></my-search>
		<view class="body">
			<!-- 左侧菜单栏区域 -->
			<scroll-view class="left-scroll" scroll-y="true" :style="{height: windowHeight + 'px'}">
				<block v-for="(item,i) in cateList" :key="i">
					<view :class="['left-scroll-item',i===active ? 'active' : '' ]" @click="changeActive(i)">
						{{item.cat_name}}
					</view>
				</block>


			</scroll-view>
			<!-- 右侧内容区域 -->
			<scroll-view class="right-scroll" scroll-y="true" :style="{height:windowHeight + 'px'}"
				:scroll-top="scroll">
				<view class="right-view" v-for="(item2,i2) in goodsList" :key="i2">
					<view class="right-title">/{{item2.cat_name}}/</view>
					<view class="cate-lv3-list">
						<view class="right-goods-item" v-for="(item3,i3) in item2.children" :key="i3"
							@click="gotoGoodsList(item3.cat_id)">
							<image :src="item3.cat_icon.replace('dev','web')" class="goods-item-img" />
							<span>{{item3.cat_name}}</span>
						</view>
					</view>

				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight: 0,
				cateList: [],
				active: 0,
				goodsList: [],
				scroll: 0
			};
		},
		methods: {
			// 获取左侧菜单数据
			async getMenuList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories');
				this.cateList = res.message
				this.goodsList = res.message[0].children
			},
			changeActive(i) {
				this.active = i
				this.goodsList = this.cateList[i].children
				this.scroll === 0 ? this.scroll = 1 : this.scroll = 0
			},
			gotoGoodsList(id) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + id
				})
			},
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		},
		onLoad() {
			const ansy = uni.getSystemInfoSync()
			this.windowHeight = ansy.windowHeight - 50;
			this.getMenuList();
		}
	}
</script>

<style lang="scss">
	.body {
		display: flex;

		// 左侧菜单栏布局
		.left-scroll {
			width: 100px;

			.left-scroll-item {
				background-color: #d5d5d5;
				line-height: 50px;
				text-align: center;
				font-size: 16px;
				margin-bottom: 2px;

				&.active {
					background-color: #ffffff;
					position: relative;

					&::before {
						content: "";
						display: block;
						position: absolute;
						width: 3px;
						height: 35px;
						background-color: #bf0b41;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}

		// 右侧展示区布局
		.right-scroll {
			.right-view {
				.right-title {
					text-align: center;
					font-size: 14px;
					font-weight: bold;
					padding: 20px 0;
				}

				.cate-lv3-list {
					display: flex;
					flex-wrap: wrap;

					.right-goods-item {
						width: 33.333%;
						text-align: center;
						margin-bottom: 10px;

						.goods-item-img {
							width: 60px;
							height: 60px;
						}

						span {
							display: block;
							font-size: 14px;
						}
					}
				}
			}
		}
	}
</style>
