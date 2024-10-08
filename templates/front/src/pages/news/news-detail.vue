<template>
	<div :style='{"width":"100%","margin":"0 auto","position":"relative","background":"none"}'>
	<el-button :style='{"border":"0","cursor":"pointer","padding":"0 10px","margin":"0 auto 10px","outline":"none","color":"#fff","borderRadius":"10px","background":"#FE6917","width":"40%","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="warning" size="mini" @click="backClick" class="el-icon-back">返回</el-button>
	<div :style='{"width":"100%"}'>
		<div :style='{"width":"80%","margin":"0 auto","background":"url(http://codegen.caihongy.cn/20240120/777684ebe3104d3cb040057bea6e001c.png) center center/100% 100% no-repeat","height":"60px"}'>
			<div :style='{"margin":"10px 0","fontSize":"20px","lineHeight":"60px","color":"#fff","textAlign":"center","background":"none"}'>考研资讯</div>
		</div>
		<div :style='{"padding":"20px","margin":"20px auto 0","flexWrap":"wrap","background":"#fff","display":"flex","width":"60%","position":"relative"}'>
			<div  :style='{"width":"100%","lineHeight":"40px","fontSize":"18px","color":"#000","textAlign":"center","fontWeight":"bold"}'>{{detail.title}}</div>
			
			<div :style='{"width":"50%","alignItems":"center","justifyContent":"flex-start","display":"flex"}'>
			  <div :style='{"padding":"0 5px 0 0"}'>
			    <span class="icon iconfont icon-shijian21" :style='{"margin":"0 2px 0 0","lineHeight":"1.5","fontSize":"12px","color":"#9E9E9E"}'></span>
			    <span :style='{"color":"#9E9E9E","lineHeight":"1.5","fontSize":"12px"}'>发布时间：{{detail.addtime}}</span>
			  </div>
			  <div :style='{"padding":"0 5px 0 0"}'>
			    <span class="icon iconfont icon-geren16" :style='{"margin":"0 2px 0 0","lineHeight":"1.5","fontSize":"12px","color":"#9E9E9E"}'></span>
			    <span :style='{"color":"#9E9E9E","lineHeight":"1.5","fontSize":"12px"}'>{{detail.name}}</span>
			  </div>
			  <div :style='{"padding":"0 5px 0 0"}'>
			    <span class="icon iconfont icon-zan10" :style='{"margin":"0 2px 0 0","lineHeight":"1.5","fontSize":"12px","color":"#9E9E9E"}'></span>
			    <span :style='{"color":"#9E9E9E","lineHeight":"1.5","fontSize":"12px"}'>{{detail.thumbsupnum}}</span>
			  </div>
			  <div :style='{"padding":"0 5px 0 0"}'>
			    <span class="icon iconfont icon-shoucang10" :style='{"margin":"0 2px 0 0","lineHeight":"1.5","fontSize":"12px","color":"#9E9E9E"}'></span>
			    <span :style='{"color":"#9E9E9E","lineHeight":"1.5","fontSize":"12px"}'>{{detail.storeupnum}}</span>
			  </div>
			  <div :style='{"padding":"0"}'>
			    <span class="icon iconfont icon-chakan9" :style='{"margin":"0 2px 0 0","lineHeight":"1.5","fontSize":"12px","color":"#9E9E9E"}'></span>
			    <span :style='{"color":"#9E9E9E","lineHeight":"1.5","fontSize":"12px"}'>{{detail.clicknum}}</span>
			  </div>
			</div>
			<div class="operate" :style='{"width":"50%","padding":"10px 0","alignItems":"center","justifyContent":"flex-end","display":"flex"}'>
				<div @click="zanClick" :style='{"padding":"0 15px","alignItems":"center","borderRadius":"30px","background":"#0B4D49","justifyContent":"center","display":"flex"}'>
					<span class="icon iconfont icon-guanzhu-zhihui" :style='{"margin":"0 2px 0 0","lineHeight":"30px","fontSize":"14px","color":"#fff"}'></span>
					<span :style='{"color":"#fff","lineHeight":"30px","fontSize":"14px"}'>{{zanType?'取消赞':'点赞'}}</span>
				</div>
				<div @click="collectClick" :style='{"padding":"0 15px","margin":"0 0 0 10px","alignItems":"center","borderRadius":"30px","background":"#FFC174","display":"flex","justifyContent":"center"}'>
					<span class="icon iconfont icon-shoucang10" :style='{"margin":"0 2px 0 0","lineHeight":"30px","fontSize":"14px","color":"#fff"}'></span>
					<span :style='{"color":"#fff","lineHeight":"30px","fontSize":"14px"}'>{{collectType?'取消收藏':'收藏'}}</span>
				</div>
			</div>
			
			<div :style='{"width":"100%","lineHeight":"1.5","height":"auto"}' class="content-detail" v-html="detail.content"></div>
		</div>
		<!-- option -->
		<div :style='{"padding":"0 20px 20px","margin":"0 auto 20px","background":"#fff","display":"flex","width":"60%","justifyContent":"center","height":"auto"}'>
		  <div :style='{"padding":"0 20px","margin":"0 10px 0 0","color":"#fff","borderRadius":"30px","background":"#B0B0B0","lineHeight":"30px","fontSize":"14px"}' @click="prepDetailClick">上一篇：prev</div>
		  <div :style='{"padding":"0 20px","lineHeight":"30px","fontSize":"14px","color":"#fff","borderRadius":"30px","background":"#FE6917"}' @click="nextDetailClick">下一篇：next</div>
		</div>

		<!-- 热门文章 -->
		<div class="hot" :style='{"border":"1px solid #FE6917","boxShadow":"none","top":"80px","background":"#fff","borderWidth":"20px 0 0","width":"150px","position":"absolute","right":"calc(20% - 160px)","height":"auto"}'>
		  <div :style='{"color":"#FFC174","borderRadius":"0 0 20px 20px","textAlign":"center","background":"#3554A4","width":"100%","lineHeight":"44px","fontSize":"14px"}'>热门文章</div>
		  <div :style='{"width":"100%","padding":"0 0 5px 0","background":"#fff","height":"auto"}'>
		    <div v-for="item in hotList" :key="item.id" :style='{"width":"100%","padding":"5px 5px 0","margin":"5px 00","background":"#fff","height":"auto"}' @click="toDetail(item.id)">
		      <img :style='{"width":"100%","objectFit":"cover","display":"block","height":"100px"}' :src="baseUrl + item.picture" alt="">
		      <div :style='{"padding":"4px 5px 0","lineHeight":"1.5","fontSize":"14px","color":"#000","textAlign":"center","fontWeight":"bold"}'>{{ item.title }}</div>
		      <div :style='{"padding":"0 5px","lineHeight":"1.4","fontSize":"12px","color":"#000","textAlign":"center"}'>{{item.addtime}}</div>
		    </div>
		  </div>
		</div>
		<!-- 热门标签 -->
		<div class="tags" :style='{"border":"1px solid #FE6917","boxShadow":"none","margin":"0 0 0 -210px","top":"80px","left":"20%","background":"#fff","borderWidth":"20px 0 0","width":"200px","position":"absolute","height":"auto"}'>
		  <div :style='{"color":"#fff","borderRadius":"0 0 20px 20px","textAlign":"center","background":"#3554A4","width":"100%","lineHeight":"44px","fontSize":"18px"}'>热门标签</div>
		  <div :style='{"padding":"5px ","flexWrap":"wrap","background":"#fff","display":"flex","width":"100%","justifyContent":"space-between","height":"auto"}'>
		    <div v-for="(item,index) in categoryList" :key="index" :style='{"width":"50%","lineHeight":"28px","fontSize":"14px","color":"#000","textAlign":"center"}'>{{ item.typename }}</div>
		  </div>
		</div>
		<!-- 推荐文章 -->
		<div class="news" :style='{"border":"1px solid #FE6917","padding":"0 0 0 20%","margin":"0 auto 0 0","flexWrap":"wrap","background":"none","borderWidth":"20px 0 0","display":"flex","width":"80%","height":"auto"}'>
		  <div :style='{"padding":"0 20px","color":"#fff","borderRadius":"0 0 20px 20px","textAlign":"center","background":"#3554A4","width":"40%","lineHeight":"60px","fontSize":"20px"}'>推荐文章</div>
		  <div :style='{"padding":"20px","margin":"10px 0 0","background":"none","display":"flex","width":"100%","justifyContent":"space-between","height":"auto"}'>
		    <div v-for="item in recommendList" :key="item.id" :style='{"border":"2px solid #3554A4","width":"24%","padding":"10px","background":"#fff","height":"auto"}' @click="toDetail(item.id)">
		      <img :style='{"width":"100%","objectFit":"cover","display":"block","height":"170px"}' :src="baseUrl + item.picture" alt="">
		      <div :style='{"padding":"0 10px","lineHeight":"32px","fontSize":"16px","color":"#3554A4","textAlign":"center"}'>{{ item.title }}</div>
		      <div :style='{"padding":"0 10px","lineHeight":"12px","fontSize":"14px","color":"#3554A4","textAlign":"center"}'>{{item.addtime}}</div>
		    </div>
		  </div>
		</div>
	</div>
	</div>
</template>

<script>
	export default {
		//数据集合
		data() {
			return {
				id: 0,
				detail: {},
				zanType: false,
				zanForm: {},
				collectType:false,
				collectForm: {},
				baseUrl:'',
				hotList: [],
				recommendList: [],
				categoryList: [],
				currentIndex: 0,
				allList: []
			}
		},
		created() {
			this.id = this.$route.query.id
			this.baseUrl = this.$config.baseUrl;
			this.getCategoryList()
			this.getDetail()
			this.getNewsList()
			this.getHotList()
			this.getRecommendList()
		},
		watch:{
			$route(newValue) {
				this.id = this.$route.query.id
			    this.getDetail()
			}
		},
		methods: {
			  backClick() {
				  history.back()
			  },
			getNewsList() {
				let params = {page:1, limit: 100,sort:'addtime',order:'desc'};
				this.$http.get('news/list', {params: params}).then(res => {
					if (res.data.code == 0) {
						for(let x in res.data.data.list){
							if(res.data.data.list[x].id == this.id){
								this.currentIndex = Number(x)
								break
							}
						}
						this.allList = res.data.data.list
					}
				});
			},
			// 上一篇
			prepDetailClick(){
				if(this.currentIndex == 0){
					this.$message.error('已经是第一篇了')
					return false
				}
				this.currentIndex--
				this.$router.push({path: '/index/newsDetail', query: {id: this.allList[this.currentIndex].id}});
			},
			// 下一篇
			nextDetailClick(){
				if(this.currentIndex == this.allList.length - 1){
					this.$message.error('已经是最后一篇了')
					return false
				}
				this.currentIndex++
				this.$router.push({path: '/index/newsDetail', query: {id: this.allList[this.currentIndex].id}});
			},
			getCategoryList(){
				this.$http.get('newstype/list', {}).then(res => {
					if (res.data.code == 0) {
						this.categoryList = res.data.data;
					}
				});
			},
			// 获取热门列表
			getHotList(){
				let params = {page:1, limit: 4,sort:'addtime',order:'desc'};
				this.$http.get('news/autoSort', {params: params}).then(res => {
					if (res.data.code == 0) {
						this.hotList = res.data.data.list;
					}
				});
			},
			// 获取推荐列表
			getRecommendList(){
				let url = 'news/autoSort'
				if(localStorage.getItem('frontToken')){
					url = 'news/autoSort2'
				}
				let params = {page:1, limit: 4,sort:'addtime',order:'desc'};
				this.$http.get(url, {params: params}).then(res => {
					if (res.data.code == 0) {
						this.recommendList = res.data.data.list;
					}
				});
			},
			// 跳转详情
			toDetail(id){
				this.$router.push({path: '/index/newsDetail', query: {id: id}});
			},
			getDetail(){
				this.$http.get(`news/detail/${this.id}`,{}).then(res=>{
					if(res.data&&res.data.code==0){
						this.detail = res.data.data
						window.scrollTo(0, 100)
						this.getZan()
						this.getCollect()
					}
				})
			},
			getZan() {
				this.$http.get('storeup/list', {
					params: {
						page: 1,
						limit: 1,
						type: 21,
						userid: localStorage.getItem('frontUserid'),
						tablename: 'news',
						refid: this.id
					}
				}).then(res=>{
					if(res.data&&res.data.code==0){
						if(res.data.data.list.length){
							this.zanType = true
							this.zanForm = res.data.data.list[0]
						}else{
							this.zanType = false
						}
					}
				})
			},
			getCollect(){
				this.$http.get('storeup/list', {
					params: {
						page: 1,
						limit: 1,
						type: 1,
						userid: localStorage.getItem('frontUserid'),
						tablename: 'news',
						refid: this.id
					}
				}).then(res=>{
					if(res.data&&res.data.code==0){
						if(res.data.data.list.length){
							this.collectType = true
							this.collectForm = res.data.data.list[0]
						}else{
							this.collectType = false
						}
					}
				})
			},
			zanClick() {
				if(this.zanType){
					this.$http.post('storeup/delete', [this.zanForm.id]).then(res => {
						if (res.data && res.data.code == 0) {
							this.$message.success('取消成功')
							this.detail.thumbsupnum--
							this.$http.post('news/update',this.detail).then(obj=>{})
							this.getZan()
						}
					})
				}else{
					let data = {
						name: this.detail.title,
						picture: this.detail.picture,
						refid: this.detail.id,
						type: 21,
						tablename: 'news',
						userid: localStorage.getItem('frontUserid')
					}
					this.$http.post('storeup/add', data).then(res => {
						if (res.data && res.data.code == 0) {
							this.$message.success('点赞成功')
							this.detail.thumbsupnum++
							this.$http.post('news/update',this.detail).then(obj=>{})
							this.getZan()
						}
					})
				}
			},
			collectClick(){
				if(this.collectType){
					this.$http.post('storeup/delete', [this.collectForm.id]).then(res => {
						if (res.data && res.data.code == 0) {
							this.$message.success('取消成功')
							this.detail.storeupnum--
							this.$http.post('news/update',this.detail).then(obj=>{})
							this.getCollect()
						}
					})
				}else{
					let data = {
						name: this.detail.title,
						picture: this.detail.picture,
						refid: this.detail.id,
						type: 1,
						tablename: 'news',
						userid: localStorage.getItem('frontUserid')
					}
					this.$http.post('storeup/add', data).then(res => {
						if (res.data && res.data.code == 0) {
							this.detail.storeupnum++
							this.$http.post('news/update',this.detail).then(obj=>{})
							this.$message.success('收藏成功')
							this.getCollect()
						}
					})
				}
			},
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.section {
		width: 900px;
		margin: 0 auto;
	}
	.editor /deep/ .avatar-uploader {
		height: 0;
		line-height: 0;
	}
	.section-content {
		margin-top: 30px;
	}
	.content-title {
		text-align: center;
		font-size: 22px;
		font-weight: bold;
	}
	.content-sub-title {
		text-align: center;
		margin-top: 20px;
		color: #888888;
		font-size: 14px;
	}
	.operate{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 40px;
	}
</style>