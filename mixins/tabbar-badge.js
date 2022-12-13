import {
	mapGetters
} from 'vuex'
export default {
	computed: {
		...mapGetters('moduleCart', ['total'])
	},
	watch: {
		total() {
			this.setBadge()
		}
	},
	methods: {
		setBadge() {
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ''
			})
		}
	},
}
