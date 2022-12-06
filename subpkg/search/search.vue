<template>
	<view>
		<!-- 搜索栏 -->
		<view class="search-box">
			<uni-search-bar placeholder="请输入搜索内容" @input="input" :radius="100" cancelButton="none"></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="goods-list" v-if="searchList.length">
			<view class="goods-item" v-for="(item,i) in searchList" :key="item.goods_id">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="forward" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="s-history" v-else>
			<view class="h-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="20" @click="cleanHistory"></uni-icons>
			</view>
			<view class="h-item">
				<uni-tag :text="item" v-for="(item,i) in reverseHistory" :key="i" @click="gotoGoodsList(item)">
				</uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyWord: '',
				searchList: [],
				searchHistory: [],
				timer: null
			};
		},
		methods: {
			input(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.keyWord = e;
					this.getSearchList()
				}, 1000)
			},
			async getSearchList() {
				if (this.keyWord) {
					const {
						data: res
					} = await uni.$http.get('/api/public/v1/goods/qsearch', {
						query: this.keyWord
					})
					if (res.meta.status !== 200) return uni.$showMsg()
					this.searchList = res.message
					this.addSearchKey()
				} else this.searchList = []
			},
			addSearchKey() {
				// this.searchHistory.push(this.keyWord)
				let Arr = new Set(this.searchHistory)
				Arr.delete(this.keyWord)
				Arr.add(this.keyWord)
				this.searchHistory = Array.from(Arr)
				uni.setStorageSync('kw', JSON.stringify(this.searchHistory))
			},
			cleanHistory() {
				this.searchHistory = ''
				uni.setStorageSync('kw', '[]')
			},
			gotoGoodsList(kw) {
				uni.navigateTo({
					url: ('/subpkg/goods_detail/goods_detail?query=' + kw)
				})
			}
		},
		computed: {
			reverseHistory() {
				return [...this.searchHistory].reverse()
			}
		},
		onLoad() {
			this.searchHistory = JSON.parse(uni.getStorageSync('kw') || '[]')
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.goods-list {
		width: 95%;
		margin: 0 auto;

		.goods-item {
			display: flex;
			height: 45px;
			line-height: 45px;
			justify-content: space-around;
			border-bottom: 1px solid #d8d8d8;

			.goods-name {
				width: 90%;
				font-size: 14px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}

	.s-history {
		padding: 0 5px;

		.h-title {
			display: flex;
			justify-content: space-between;
			font-size: 16px;
			height: 35px;
			align-items: center;
			border-bottom: 1px solid #d8d8d8;
		}

		.h-item {
			display: flex;
			flex-wrap: wrap;

			.uni-tag {
				display: inline-block;
				margin-top: 5px;
				margin-right: 5px;
				background-color: #bdbdbd;
				border: #bdbdbd;
			}

		}
	}
</style>
