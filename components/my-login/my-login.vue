<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
		<view class="tips-text">
			登录后尽享更多权益
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		computed: {
			...mapState('moduleAddress', ['redirectInfo'])
		},
		methods: {
			...mapMutations('moduleAddress', ['updateUserinfo', 'updateToken', 'updateRedirectInfo']),
			async getUserProfile() {
				const res = await uni.getUserProfile({
					desc: "登录"
				})
				// console.log(res)
				if (res[1].errMsg === 'getUserInfo:fail auto deny') return uni.$showMsg('您取消了授权')
				else {
					// console.log(res[1].userInfo);
					this.updateUserinfo(res[1].userInfo)
					this.getToken(res[1])

				}
			},
			async getToken(info) {
				const [err, res] = await uni.login().catch(err => err)
				// console.log(res);
				if (res.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
				// console.log(info);
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				const {
					data: loginResult
				} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				// console.log(loginResult);
				if (loginResult.meta.status === 400) {
					uni.$showMsg('登录成功')
					this.updateToken(
						'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
					)
					this.navigateBack()
				}
			},
			navigateBack() {
				if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
					uni.switchTab({
						url: '/pages/cart/cart',
						complete: () => {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}

	}
</script>

<style lang="scss">
	.login-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;

		.btn-login {
			margin-top: 10px;
			width: 80%;
			border-radius: 22px;
			background-color: #C00000;
		}

		.tips-text {
			margin-top: 10px;
			font-size: 12px;
			color: #8f8f8f;
		}
	}
</style>
