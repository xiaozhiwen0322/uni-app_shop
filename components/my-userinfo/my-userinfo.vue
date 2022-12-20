<template>
	<view class="userinfo-container">
		<!-- 上半头像部分 -->
		<view class="head-portrait">
			<image :src="userinfo.avatarUrl"></image>
			<text>{{userinfo.nickName}}</text>
		</view>
		<!-- 下半信息展示 -->
		<view class="userinfo-detial">
			<!-- 第一个盒子 -->
			<view class="box-one">
				<view class="boxone-item">
					<text>8</text>
					<text>收藏的店铺</text>
				</view>
				<view class="boxone-item">
					<text>14</text>
					<text>收藏的商品</text>
				</view>
				<view class="boxone-item">
					<text>18</text>
					<text>关注的商品</text>
				</view>
				<view class="boxone-item">
					<text>84</text>
					<text>足迹</text>
				</view>
			</view>
			<!-- 第二个盒子 -->
			<view class="box-two">
				<view class="boxtwo-head">
					我的订单
				</view>
				<view class="boxtwo-body">
					<view class="boxtwo-item">
						<image src="../../static/icon_ixh19kha5l9/a-bianzubeifen3.png"></image>
						<text>待付款</text>
					</view>
					<view class="boxtwo-item">
						<image src="/static/icon_ixh19kha5l9/a-carsaccessories.png"></image>
						<text>待收货</text>
					</view>
					<view class="boxtwo-item">
						<image src="../../static/icon_ixh19kha5l9/tijiaoyanzi.png"></image>
						<text>退款/退货</text>
					</view>
					<view class="boxtwo-item">
						<image src="../../static/icon_ixh19kha5l9/a-mobankubeifen2.png"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!-- 第三个盒子 -->
			<view class="box-three">
				<view class="boxthree-item,line">
					<text>收货地址</text>
					<uni-icons type="forward"></uni-icons>
				</view>
				<view class="boxthree-item,line">
					<text>联系客服</text>
					<uni-icons type="forward"></uni-icons>
				</view>
				<view class="boxthree-item" @click="outlogin">
					<text>退出登录</text>
					<uni-icons type="forward"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: "my-userinfo",
		data() {
			return {

			};
		},
		computed: {
			...mapState('moduleAddress', ['userinfo'])
		},
		methods: {
			...mapMutations('moduleAddress', ['updateToken']),
			async outlogin() {
				const [err, succ] = await uni.showModal({
					title: '提示',
					content: '确定退出登录'
				}).catch(err => err)
				if (succ && succ.confirm) {
					this.updateToken('')
				}
			}
		}
	}
</script>

<style lang="scss">
	.userinfo-container {
		height: 100vh;
		background-color: #F4F4F4;

		.head-portrait {
			height: 400rpx;
			background-color: #c00a4a;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 180rpx;
				height: 180rpx;
				border-radius: 50%;
				border: 5rpx solid white;
				box-shadow: 0px 1px 5px rgba(0, 0, 0, 1);
				margin-bottom: 10px;
			}

			text {
				color: #fff;
				font-size: 15px;
			}
		}

		.userinfo-detial {
			position: relative;
			top: -20px;
			width: 90%;
			margin: 0 auto;
			background-color: #F4F4F4;
			height: 600rpx;
			border-radius: 10px;

			.box-one {
				display: flex;
				justify-content: space-around;
				background-color: #fff;
				border-radius: 6px 6px 0 0;

				.boxone-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					font-size: 14px;
					margin: 10px 0;
				}
			}

			.box-two {
				margin-top: 10px;
				background-color: #fff;
				padding: 10px 5px;
				border-radius: 6px 6px 0 0;

				.boxtwo-body {
					display: flex;
					justify-content: space-around;
					margin-top: 10px;

					.boxtwo-item {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						font-size: 14px;

						image {
							width: 30px;
							height: 30px;
						}
					}

				}
			}

			.box-three {
				margin-top: 10px;
				background-color: #fff;
				padding: 0px 5px;
				border-radius: 6px;

				.boxthree-item {
					height: 50px;
					// background-color: #fff;
					display: flex;
					justify-content: space-between;
					align-items: center;

					&.line {
						border-bottom: 1px solid #f4f4f4;
					}
				}
			}
		}
	}
</style>
