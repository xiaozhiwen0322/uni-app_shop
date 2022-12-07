<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods,i) in goodslist" :key="i" @click="gotoDetail(goods)">
				<my-goods :goods='goods'></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goodslist: [],
				total: 0,
				flag: 0
			};
		},
		methods: {
			async getGoodsList(cb) {
				this.flag = 1
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				if (res.meta.status !== 200) return uni.$showMsg()
				this.goodslist = [...this.goodslist, ...res.message.goods]
				this.total = res.message.total
				this.flag = 0
				cb && cb()
			},
			gotoDetail(goods) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
				})
			}
		},
		onReachBottom() {
			if (this.flag) return
			this.queryObj.pagenum += 1
			if (this.queryObj.pagenum * this.queryObj.pagesize < this.total) {
				this.getGoodsList()
			} else return uni.$showMsg('再怎么找也没有啦~')

		},
		onLoad(option) {
			this.queryObj.query = option.query || ''
			this.queryObj.cid = option.cid || ''
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.goodslist = []
			this.total = 0
			this.flag = 0
			this.getGoodsList(() => {
				uni.stopPullDownRefresh()
			})
		}
	}
</script>

<style lang="scss">

</style>
