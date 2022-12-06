<template>
	<view @click="MyClick">
		<view class="my-search-container">
			<view class="my-search-content">
				<uni-icons type="search" size="18"></uni-icons><span>搜索</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		data() {
			return {

			};
		},
		methods: {
			MyClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		height: 45px;
		background-color: #c00a4a;

		.my-search-content {
			height: 30px;
			background-color: #ffffff;
			border-radius: 15px;
			margin: 0 10px;
			text-align: center;
			line-height: 30px;

			span {
				margin-left: 5px;
				font-size: 15px;
				vertical-align: top;
			}
		}
	}
</style>
