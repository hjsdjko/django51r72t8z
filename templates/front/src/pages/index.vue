<template>
	<div class="main-containers">
		<div class="body-containers" :style='{"minHeight":"100vh","padding":"170px 0 0","margin":"0","position":"relative","background":"#F7F5F7"}'>
		<div class="top-container" :style='{"boxShadow":"0px 4px 10px 0px rgba(0,0,0,0.3)","padding":"0 20px 0 35%","alignItems":"flex-start","display":"flex","justifyContent":"flex-end","overflow":"hidden","top":"0","left":"0","background":"#ffffff","width":"100%","position":"absolute","height":"170px","zIndex":"1002"}'>
			<!-- info -->
			<div :style='{"padding":"0 20px","position":"absolute","alignItems":"center","left":"0","display":"flex","height":"120px"}'>
			  <el-image :style='{"width":"124px","objectFit":"cover","borderRadius":"0","float":"left","height":"94px"}' src="http://codegen.caihongy.cn/20240120/58d4fa693d4f4c6587c4cf5ed0c320ef.png" fit="cover" />
			  <span :style='{"padding":"0 0 0 12px","lineHeight":"44px","fontSize":"30px","color":"#4261A6","float":"left"}'>基于 Python 的考研学习系统的设计与实现</span>
			</div>
			
			<div v-if="false" :style='{"color":"#666","margin":"0 10px","fontSize":"14px"}'>0753-1234567</div>
			
			<img v-if="headportrait&&Token" :style='{"width":"50px","margin":"20px 12px","borderRadius":"50%","height":"50px","order":"5"}' :src="headportrait?baseUrl + headportrait:require('@/assets/avator.png')">
			<div v-if="Token" :style='{"padding":"0 10px","fontSize":"16px","lineHeight":"90px","color":"#3554A4","height":"90px","order":"6"}'>{{username}}</div>
			<div v-if="Token && notAdmin" :style='{"padding":"0 10px","fontSize":"16px","lineHeight":"90px","color":"#3554A4","height":"90px","order":"7"}' @click="goMenu('/index/center')">个人中心</div>
			<el-button v-if="!Token" @click="toLogin()" :style='{"border":"none","padding":"0 12px","margin":"0 10px","color":"#3554A4","borderRadius":"0","background":"none","display":"inline-block","fontSize":"16px","lineHeight":"90px","fontWeight":"bold","height":"90px","order":"8"}'>登录/注册</el-button>
			<el-button v-if="Token" @click="logout" :style='{"border":"none","padding":"0 12px","margin":"0 10px","color":"#3554A4","borderRadius":"0","background":"none","display":"inline-block","fontSize":"16px","lineHeight":"90px","fontWeight":"bold","height":"90px","order":"9"}'>退出</el-button>
		</div>


			<div class="menu-preview" :style='{"padding":"0 20px","borderColor":"#efefef","top":"90px","left":"10%","background":"#ffffff","borderWidth":"0","width":"90%","position":"absolute","borderStyle":"solid","height":"auto","zIndex":"1004"}'>
			<el-scrollbar wrap-class="scrollbar-wrapper-horizontal">
				<el-menu class="el-menu-horizontal-demo" :style='{"border":0,"padding":"15px 0","listStyle":"none","margin":"0","background":"#FFF","display":"flex","position":"relative","justifyContent":"center","height":"80px"}' :default-active="activeMenu" :unique-opened="true" mode="horizontal" :router="true" @select="handleSelect">
					<div class="userinfo" :style='{"width":"84px","padding":"6px 10px 0","display":"none","height":"auto"}'>
					  <el-image :style='{"width":"100%","objectFit":"cover","borderRadius":"20px","display":"block","height":"32px"}' src="http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg" fit="cover"></el-image>
					  <div :style='{"fontSize":"12px","lineHeight":"1.5","color":"#333","textAlign":"center"}'>nickname</div>
					</div>
					<el-menu-item class="home" index="/index/home" @click.native="goMenu('/index/home')">
						<span :style='{"padding":"0 10px","margin":"0 5px 0 0","color":"inherit","width":"14px","lineHeight":"56px","fontSize":"inherit","height":"56px"}' class="icon iconfont icon-shouye-zhihui"></span>
						<span :style='{"padding":"0 10px","lineHeight":"56px","fontSize":"inherit","color":"inherit","height":"56px"}'>系统首页</span>
					</el-menu-item>
					<el-menu-item class="item" v-for="(menu, index) in menuList" :index="menu.url" :key="index" @click.native="goMenu(menu.url)">
						<i :style='{"padding":"0 10px","margin":"0 5px 0 0","color":"inherit","width":"16px","lineHeight":"56px","fontSize":"inherit","height":"56px"}' :class="iconArr[index]"></i>
						<span :style='{"padding":"0 10px","lineHeight":"56px","fontSize":"inherit","color":"inherit","height":"56px"}'>{{menu.name}}</span>
					</el-menu-item>
					<el-menu-item class="user" index="/index/center" v-if="Token && notAdmin" @click.native="goMenu('/index/center')">
						<span :style='{"padding":"0 10px","margin":"0","color":"inherit","width":"14px","lineHeight":"56px","fontSize":"14px","height":"56px"}' class="icon iconfont icon-shouye-zhihui"></span>
						<span :style='{"padding":"0 10px","lineHeight":"56px","fontSize":"14px","color":"inherit","height":"56px"}'>个人中心</span>
					</el-menu-item>
				</el-menu>
			</el-scrollbar>
			</div>


			<router-view id="scrollView"></router-view>
			
			<div class="bottom-preview" :style='{"width":"100%","height":"auto"}'>
				<div :style='{"minHeight":"100px","width":"100%","padding":"20px","overflow":"hidden","background":"#000","height":"auto"}'><div v-html="bottomContent"></div></div>
			</div>
		</div>
		
	</div>
</template>

<script>
import Vue from 'vue'
import Swiper from "swiper";
import axios from 'axios'

export default {
    data() {
		return {
            activeIndex: '0',
			roleMenus: [{"backMenu":[{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-pic","buttons":["新增","查看","修改","删除"],"menu":"学生","menuJump":"列表","tableName":"xuesheng"}],"menu":"学生管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-vipcard","buttons":["新增","查看","修改","删除"],"menu":"教师","menuJump":"列表","tableName":"jiaoshi"}],"menu":"教师管理"},{"child":[{"allButtons":["新增","查看","修改","删除","查看评论"],"appFrontIcon":"cuIcon-news","buttons":["查看","删除","查看评论"],"menu":"课程信息","menuJump":"列表","tableName":"kechengxinxi"}],"menu":"课程信息管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-link","buttons":["新增","查看","修改","删除"],"menu":"课程分类","menuJump":"列表","tableName":"kechengfenlei"}],"menu":"课程分类管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-attentionfavor","buttons":["查看","删除"],"menu":"考研资料","menuJump":"列表","tableName":"kaoyanziliao"}],"menu":"考研资料管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-rank","buttons":["新增","查看","修改","删除"],"menu":"资料分类","menuJump":"列表","tableName":"ziliaofenlei"}],"menu":"资料分类管理"},{"child":[{"allButtons":["新增","查看","修改","删除","审核"],"appFrontIcon":"cuIcon-skin","buttons":["查看","删除"],"menu":"报考志愿","menuJump":"列表","tableName":"baokaozhiyuan"}],"menu":"报考志愿管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-group","buttons":["新增","查看","修改","删除"],"menu":"学习论坛","tableName":"forum"}],"menu":"学习论坛"},{"child":[{"allButtons":["新增","查看","修改","删除","组卷","调查统计"],"appFrontIcon":"cuIcon-copy","buttons":["查看","修改","删除","调查统计"],"menu":"试题测试管理","tableName":"exampaper"}],"menu":"试题测试管理"},{"child":[{"allButtons":["新增","查看","修改","删除","导出","打印"],"appFrontIcon":"cuIcon-addressbook","buttons":["查看","修改","删除","打印"],"menu":"试题管理","tableName":"examquestion"}],"menu":"试题管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除"],"menu":"考研资讯","tableName":"news"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除"],"menu":"考研资讯分类","tableName":"newstype"},{"allButtons":["查看","修改"],"appFrontIcon":"cuIcon-form","buttons":["查看","修改"],"menu":"关于我们","tableName":"aboutus"},{"allButtons":["查看","修改"],"appFrontIcon":"cuIcon-copy","buttons":["查看","修改"],"menu":"系统简介","tableName":"systemintro"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-phone","buttons":["查看","修改","删除"],"menu":"轮播图管理","tableName":"config"}],"menu":"系统管理"},{"child":[{"allButtons":["新增","查看","修改","删除","导出","打印","批卷"],"appFrontIcon":"cuIcon-clothes","buttons":["查看","修改","删除","导出"],"menu":"考试记录","tableName":"examrecord"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-similar","buttons":["查看","删除"],"menu":"错题本","tableName":"examfailrecord"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-baby","buttons":["查看","修改","删除"],"menu":"试题测试列表","tableName":"exampaperlist"}],"menu":"考试管理"}],"frontMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","查看评论"],"appFrontIcon":"cuIcon-newshot","buttons":["查看","查看评论"],"menu":"课程信息列表","menuJump":"列表","tableName":"kechengxinxi"}],"menu":"课程信息模块"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-taxi","buttons":["查看"],"menu":"考研资料列表","menuJump":"列表","tableName":"kaoyanziliao"}],"menu":"考研资料模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"管理员","tableName":"users"},{"backMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","审核"],"appFrontIcon":"cuIcon-skin","buttons":["新增","查看","修改","删除"],"menu":"报考志愿","menuJump":"列表","tableName":"baokaozhiyuan"}],"menu":"报考志愿管理"},{"child":[{"allButtons":["新增","查看","修改","删除","导出","打印","批卷"],"appFrontIcon":"cuIcon-clothes","buttons":["查看"],"menu":"考试记录","tableName":"examrecord"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-similar","buttons":["查看"],"menu":"错题本","tableName":"examfailrecord"}],"menu":"考试管理"}],"frontMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","查看评论"],"appFrontIcon":"cuIcon-newshot","buttons":["查看","查看评论"],"menu":"课程信息列表","menuJump":"列表","tableName":"kechengxinxi"}],"menu":"课程信息模块"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-taxi","buttons":["查看"],"menu":"考研资料列表","menuJump":"列表","tableName":"kaoyanziliao"}],"menu":"考研资料模块"}],"hasBackLogin":"否","hasBackRegister":"否","hasFrontLogin":"是","hasFrontRegister":"是","roleName":"学生","tableName":"xuesheng"},{"backMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","查看评论"],"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除","查看评论"],"menu":"课程信息","menuJump":"列表","tableName":"kechengxinxi"}],"menu":"课程信息管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-attentionfavor","buttons":["新增","查看","修改","删除"],"menu":"考研资料","menuJump":"列表","tableName":"kaoyanziliao"}],"menu":"考研资料管理"},{"child":[{"allButtons":["新增","查看","修改","删除","审核"],"appFrontIcon":"cuIcon-skin","buttons":["审核","查看"],"menu":"报考志愿","menuJump":"列表","tableName":"baokaozhiyuan"}],"menu":"报考志愿管理"},{"child":[{"allButtons":["新增","查看","修改","删除","组卷","调查统计"],"appFrontIcon":"cuIcon-copy","buttons":["新增","查看","修改","删除","调查统计"],"menu":"试题测试管理","tableName":"exampaper"}],"menu":"试题测试管理"},{"child":[{"allButtons":["新增","查看","修改","删除","导出","打印"],"appFrontIcon":"cuIcon-addressbook","buttons":["新增","查看","修改","删除","打印"],"menu":"试题管理","tableName":"examquestion"}],"menu":"试题管理"},{"child":[{"allButtons":["新增","查看","修改","删除","导出","打印","批卷"],"appFrontIcon":"cuIcon-clothes","buttons":["查看","导出","批卷"],"menu":"考试记录","tableName":"examrecord"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-similar","buttons":["查看"],"menu":"错题本","tableName":"examfailrecord"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-baby","buttons":["新增","查看","修改","删除"],"menu":"试题测试列表","tableName":"exampaperlist"}],"menu":"考试管理"}],"frontMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","查看评论"],"appFrontIcon":"cuIcon-newshot","buttons":["查看","查看评论"],"menu":"课程信息列表","menuJump":"列表","tableName":"kechengxinxi"}],"menu":"课程信息模块"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-taxi","buttons":["查看"],"menu":"考研资料列表","menuJump":"列表","tableName":"kaoyanziliao"}],"menu":"考研资料模块"}],"hasBackLogin":"是","hasBackRegister":"是","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"教师","tableName":"jiaoshi"}],
			baseUrl: '',
			menuList: [],
			form: {
				ask: '',
				userid: localStorage.getItem('frontUserid')
			},
			headportrait: localStorage.getItem('frontHeadportrait')?localStorage.getItem('frontHeadportrait'):'',
			Token: localStorage.getItem('frontToken'),
            username: localStorage.getItem('username'),
            notAdmin: localStorage.getItem('frontSessionTable')!='"users"',
			timer: '',
			iconArr: [
				'el-icon-star-off',
				'el-icon-goods',
				'el-icon-warning',
				'el-icon-question',
				'el-icon-info',
				'el-icon-help',
				'el-icon-picture-outline-round',
				'el-icon-camera-solid',
				'el-icon-video-camera-solid',
				'el-icon-video-camera',
				'el-icon-bell',
				'el-icon-s-cooperation',
				'el-icon-s-order',
				'el-icon-s-platform',
				'el-icon-s-operation',
				'el-icon-s-promotion',
				'el-icon-s-release',
				'el-icon-s-ticket',
				'el-icon-s-management',
				'el-icon-s-open',
				'el-icon-s-shop',
				'el-icon-s-marketing',
				'el-icon-s-flag',
				'el-icon-s-comment',
				'el-icon-s-finance',
				'el-icon-s-claim',
				'el-icon-s-opportunity',
				'el-icon-s-data',
				'el-icon-s-check'
			],
			bottomContent: '',
		}
    },
    created() {
		this.baseUrl = this.$config.baseUrl;
		this.menuList = this.$config.indexNav;
        if(localStorage.getItem('frontToken') && localStorage.getItem('frontToken')!=null) {
			this.getSession()
        }
    },
    mounted() {
        this.activeIndex = localStorage.getItem('keyPath') || '0';



    },
    computed: {
		activeMenu() {
			const route = this.$route
			const {
				meta,
				path
			} = route
			// if st path, the sidebar will highlight the path you sete
			if (meta.activeMenu) {
				return meta.activeMenu
			}
			return path
		},
    },
    watch: {
        $route(newValue) {
            let that = this
            let url = window.location.href
            let arr = url.split('#')
            for (let x in this.menuList) {
                if (newValue.path == this.menuList[x].url) {
                    this.activeIndex = x
                }
            }
            this.Token = localStorage.getItem('frontToken')
            if(arr[1]!='/index/home'){
            	var element = document.getElementById('scrollView');
            	var distance = element.offsetTop;
            	window.scrollTo( 0, distance )
            }else{
            	window.scrollTo( 0, 0 )
            }
        },
		headportrait(){
			this.$forceUpdate()
		},
    },
    methods: {

		async getSession() {
			await this.$http.get(`${localStorage.getItem('UserTableName')}/session`, {emulateJSON: true}).then(async res => {
				if (res.data.code == 0) {
					localStorage.setItem('sessionForm',JSON.stringify(res.data.data))
					localStorage.setItem('frontUserid', res.data.data.id);
					if(res.data.data.vip) {
						localStorage.setItem('vip', res.data.data.vip);
					}
					if(res.data.data.touxiang) {
						this.headportrait = res.data.data.touxiang
						localStorage.setItem('frontHeadportrait', res.data.data.touxiang);
					} else if(res.data.data.headportrait) {
						this.headportrait = res.data.data.headportrait
						localStorage.setItem('frontHeadportrait', res.data.data.headportrait);
					}
				}
			});
		},
        handleSelect(keyPath) {
            if (keyPath) {
                localStorage.setItem('keyPath', keyPath)
            }
        },
		toLogin() {
		  this.$router.push('/login');
		},
        logout() {
            localStorage.clear();
            Vue.http.headers.common['Token'] = "";
            this.$router.push('/index/home');
            this.activeIndex = '0'
            localStorage.setItem('keyPath', this.activeIndex)
            this.Token = ''
            this.$forceUpdate()
            this.$message({
                message: '登出成功',
                type: 'success',
                duration: 1000,
            });
        },
		goBackend() {
			localStorage.setItem('Token', localStorage.getItem('frontToken'));
			localStorage.setItem('role', localStorage.getItem('frontRole'));
			localStorage.setItem('sessionTable', localStorage.getItem('frontSessionTable'));
			localStorage.setItem('headportrait', localStorage.getItem('frontHeadportrait'));
			localStorage.setItem('userid', localStorage.getItem('frontUserid'));
			window.open(`${this.$config.baseUrl}admin/dist/index.html`, "_blank");
		},
		goMenu(path) {
            this.$router.push(path);
		},
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.menu-preview {
	  .el-scrollbar {
	    height: 100%;
	  
	    & /deep/ .scrollbar-wrapper-vertical {
	      overflow-x: hidden;
	    }
	  
	    & /deep/ .scrollbar-wrapper-horizontal {
	      overflow-y: hidden;
	  
	      .el-scrollbar__view {
	        white-space: nowrap;
	      }
	    }
	  }
	}
	
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.home {
				cursor: pointer;
				border: 0;
				padding: 0 5px 0 20px;
				color: #000;
				white-space: nowrap;
				display: flex;
				font-size: 18px;
				line-height: 36px;
				background: none;
				align-items: center;
				position: relative;
				list-style: none;
				height: 36px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.home:hover {
				color: #FE6917;
				background: none;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.home.is-active {
				color: #FE6917;
				background: none;
				font-weight: bold;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.user {
				cursor: pointer;
				border: 0;
				padding: 0 20px;
				color: #333;
				white-space: nowrap;
				display: none;
				font-size: 14px;
				line-height: 56px;
				background: #fff;
				align-items: center;
				position: relative;
				list-style: none;
				height: 56px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.user:hover {
				color: #fff;
				background: red;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.user.is-active {
				color: #fff;
				background: blue;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.service {
				cursor: pointer;
				border: 0;
				padding: 0 20px;
				color: #333;
				white-space: nowrap;
				display: none;
				font-size: 14px;
				line-height: 56px;
				background: #fff;
				align-items: center;
				position: relative;
				list-style: none;
				height: 56px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.service:hover {
				color: #fff;
				background: red;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.service.is-active {
				color: #fff;
				background: blue;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.shop {
				cursor: pointer;
				border: 1px solid #000;
				padding: 0 5px;
				color: #000;
				white-space: nowrap;
				display: flex;
				font-size: 18px;
				line-height: 36px;
				background: none;
				border-width: 0 0 0 2px;
				align-items: center;
				position: relative;
				list-style: none;
				height: 36px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.shop:hover {
				color: #FE6917;
				background: none;
				font-weight: bold;
				border-color: #FE6917;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.shop.is-active {
				color: #FE6917;
				background: none;
				font-weight: bold;
				border-color: #FE6917;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.back {
				cursor: pointer;
				border: 1px solid #000;
				padding: 0 5px;
				color: #000;
				white-space: nowrap;
				display: flex;
				font-size: 18px;
				line-height: 36px;
				background: none;
				border-width: 0 0 0 2px;
				align-items: center;
				position: relative;
				list-style: none;
				height: 36px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.back:hover {
				color: #FE6917;
				background: none;
				font-weight: bold;
				border-color: #FE6917;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.back.is-active {
				color: #FE6917;
				background: none;
				font-weight: bold;
				border-color: #FE6917;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.item {
				cursor: pointer;
				border: 1px solid #000;
				padding: 0 5px;
				color: #000;
				white-space: nowrap;
				display: flex;
				font-size: 18px;
				line-height: 1;
				background: none;
				border-width: 0 0 0 2px;
				align-items: center;
				position: relative;
				list-style: none;
				height: 36px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.item:hover {
				color: #FE6917;
				background: none;
				font-weight: bold;
				border-color: #FE6917;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.item.is-active {
				color: #FE6917;
				background: none;
				font-weight: bold;
				border-color: #FE6917;
			}
	
	.banner-preview {
	  .el-carousel /deep/ .el-carousel__indicator button {
	    width: 0;
	    height: 0;
	    display: none;
	  }
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--left {
		width: 36px;
		font-size: 12px;
		height: 36px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--left:hover {
		background: red;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--right {
		width: 36px;
		font-size: 12px;
		height: 36px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--right:hover {
		background: red;
	}

	.banner-preview .el-carousel /deep/ .el-carousel__indicators {
		padding: 0;
		margin: 0;
		z-index: 2;
		position: absolute;
		list-style: none;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li {
		padding: 0;
		margin: 0 4px;
		background: #3554A4;
		display: inline-block;
		width: 12px;
		opacity: 0.8;
		transition: 0.3s;
		height: 12px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li:hover {
		padding: 0;
		margin: 0 4px;
		background: #FE6917;
		display: inline-block;
		width: 24px;
		opacity: 0.7;
		height: 12px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li.is-active {
		padding: 0;
		margin: 0 4px;
		background: #FE6917;
		display: inline-block;
		width: 24px;
		opacity: 1;
		height: 12px;
	}

    .chat-content {
        padding-bottom: 20px;
        width: 100%;
        margin-bottom: 10px;
        max-height: 300px;
        height: 300px;
        overflow-y: scroll;
        border: 1px solid #eeeeee;
        background: #fff;

        .left-content {
            float: left;
            margin-bottom: 10px;
            padding: 10px;
            max-width: 80%;
        }

        .right-content {
            float: right;
            margin-bottom: 10px;
            padding: 10px;
            max-width: 80%;
        }
    }

    .clear-float {
        clear: both;
    }


	
	// -------- search --------
	.main-containers .search .select /deep/ .el-input__inner {
				border: 0;
				border-radius: 4px;
				padding: 0 30px 0 10px;
				box-shadow: 0 0 6px rgba(64, 158, 255, .3);
				outline: none;
				color: rgba(64, 158, 255, 1);
				width: 180px;
				font-size: 14px;
				height: 44px;
			}
	
	.main-containers .search .input /deep/ .el-input__inner {
				border: 0;
				border-radius: 4px;
				padding: 0 10px;
				box-shadow: 0 0 6px rgba(64, 158, 255, .3);
				outline: none;
				color: rgba(64, 158, 255, 1);
				width: 180px;
				font-size: 14px;
				height: 44px;
			}
	// -------- search --------
	
	.main-containers .btn-service {
				border: 0;
				padding: 0;
				margin: 0 10px;
				color: #3554A4;
				background: none;
				width: auto;
				font-size: 16px;
				line-height: 90px;
				height: 90px;
				order: 4;
			}
	
	.main-containers .btn-service:hover {
				opacity: 0.8;
			}
	
	.main-containers .btn-shop {
				border: 0;
				padding: 0;
				margin: 0 10px;
				color: #3554A4;
				background: none;
				display: none;
				width: auto;
				font-size: 16px;
				line-height: 90px;
				height: 90px;
			}
	
	.main-containers .btn-shop:hover {
				opacity: 0.8;
			}
</style>
