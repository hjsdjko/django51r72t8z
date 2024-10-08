<template>
  <div>
    <div class="container" :style='{"minHeight":"100vh","alignItems":"center","background":"url(http://codegen.caihongy.cn/20231022/32f7bf7edcdc4036b69e97823b37b46b.jpg)","display":"flex","width":"100%","backgroundSize":"100% 100%","backgroundPosition":"center center","backgroundRepeat":"no-repeat","justifyContent":"center"}'>
      <el-form :style='{"border":"0px solid #f6f6f6","padding":"50px 60px 250px 300px","boxShadow":"0 0px 0px rgba(0, 0, 0, .1)","margin":"0 auto","alignItems":"flex-start","textAlign":"center","display":"flex","minHeight":"600px","borderRadius":"0","flexWrap":"wrap","background":"url(http://codegen.caihongy.cn/20231022/ff2e688355dd4d46aea962ee689061f4.png) no-repeat center top / 100% 100%","width":"600px","fontSize":"14px","position":"relative","height":"auto"}'>
        <div v-if="true" :style='{"padding":"0px","margin":"0 0 20px","borderColor":"#ddd","color":"#fff","textAlign":"center","display":"inline-block","background":"none","borderWidth":"0px","width":"86%","lineHeight":"40px","fontSize":"18px","borderStyle":"solid","fontWeight":"500"}' class="title-container">基于 Python 的考研学习系统的设计与实现登录</div>
        <div v-if="loginType==1" class="list-item" :style='{"width":"250px","margin":"0 0 20px 0","position":"relative","alignItems":"center","flexWrap":"wrap","display":"flex"}'>
          <div v-if="true" class="lable" :style='{"color":"#ccc","left":"-100px","textAlign":"right","width":"100px","lineHeight":"44px","fontSize":"inherit","position":"absolute"}'>用户名：</div>
          <input :style='{"border":"0px solid #afc3ce","padding":"0 10px","boxShadow":"0 0 0px rgba(64, 158, 255, .3)","outline":"0px solid #eee","color":"#ccc","outlineOffset":"0px","borderRadius":"4px","background":"#fff","width":"100%","fontSize":"inherit","height":"40px"}' placeholder="请输入用户名" name="username" type="text" v-model="rulesForm.username">
        </div>
        <div v-if="loginType==1" class="list-item" :style='{"width":"250px","margin":"0 0 20px 0","position":"relative","alignItems":"center","flexWrap":"wrap","display":"flex"}'>
          <div v-if="true" class="lable" :style='{"color":"#ccc","left":"-100px","textAlign":"right","width":"100px","lineHeight":"44px","fontSize":"inherit","position":"absolute"}'>密码：</div>
          <input :style='{"border":"0px solid #afc3ce","padding":"0 10px","boxShadow":"0 0 0px rgba(64, 158, 255, .3)","outline":"0px solid #eee","color":"#ccc","outlineOffset":"0px","borderRadius":"4px","background":"#fff","width":"100%","fontSize":"inherit","height":"40px"}' placeholder="请输入密码" name="password" type="password" v-model="rulesForm.password">
        </div>

		<div class="list-item select" :style='{"width":"250px","margin":"0 0 20px 0","position":"relative","alignItems":"center","flexWrap":"wrap","display":"flex"}' v-if="roles.length>1">
		  <el-select v-model="rulesForm.role" placeholder="请选择角色">
		    <el-option v-for="item in roles" :key="item.roleName" :label="item.roleName" :value="item.roleName" />
		  </el-select>
		</div>

		
        <div :style='{"margin":"0","alignItems":"center","top":"32px","flexWrap":"wrap","left":"20px","background":"none","display":"flex","width":"210px","fontSize":"16px","position":"absolute","justifyContent":"space-between"}'>
          <el-button v-if="loginType==1" :style='{"border":"0","cursor":"pointer","padding":"0 10px","margin":"0 20px","color":"#fff","textAlign":"right","letterSpacing":"4px","outline":"none","borderRadius":"0px","background":"#ffb901","width":"auto","fontSize":"14px","height":"32px","order":"2"}' type="primary" @click="login()" class="loginInBt">登录</el-button>
          <el-button :style='{"border":"0px solid rgba(64, 158, 255, 1)","cursor":"pointer","padding":"0 16px","margin":"0 5px 16px","borderColor":"rgba(167,142,68,1)","color":"#fff","textAlign":"left","clipPath":"polygon(100% 0, 100% 20%, 93% 50%, 100% 80%, 100% 100%, 0 100%, 0 0)","outline":"none","borderRadius":"0px","background":"#ffb901","borderWidth":"0px","width":"100%","fontSize":"14px","borderStyle":"solid","fontWeight":"500","height":"44px"}' type="primary" @click="register('jiaoshi')" class="register">注册教师</el-button>
        </div>
      </el-form>

    </div>
  </div>
</template>
<script>
import menu from "@/utils/menu";
export default {
  data() {
    return {
		verifyCheck2: false,
		flag: false,
      baseUrl:this.$base.url,
      loginType: 1,
      rulesForm: {
        username: "",
        password: "",
        role: "",
      },
      menus: [],
      roles: [],
      tableName: "",
    };
  },
  mounted() {
    let menus = menu.list();
    this.menus = menus;

    for (let i = 0; i < this.menus.length; i++) {
      if (this.menus[i].hasBackLogin=='是') {
        this.roles.push(this.menus[i])
      }
    }

  },
  created() {

  },
  destroyed() {
	    },
  components: {
  },
  methods: {

    //注册
    register(tableName){
		this.$storage.set("loginTable", tableName);
		this.$router.push({path:'/register',query:{pageFlag:'register'}})
    },
    // 登陆
    login() {

		if (!this.rulesForm.username) {
			this.$message.error("请输入用户名");
			return;
		}
		if (!this.rulesForm.password) {
			this.$message.error("请输入密码");
			return;
		}
		if(this.roles.length>1) {
			if (!this.rulesForm.role) {
				this.$message.error("请选择角色");
				return;
			}

			let menus = this.menus;
			for (let i = 0; i < menus.length; i++) {
				if (menus[i].roleName == this.rulesForm.role) {
					this.tableName = menus[i].tableName;
				}
			}
		} else {
			this.tableName = this.roles[0].tableName;
			this.rulesForm.role = this.roles[0].roleName;
		}
		
		this.loginPost()
    },
	loginPost() {
		this.$http({
			url: `${this.tableName}/login?username=${this.rulesForm.username}&password=${this.rulesForm.password}`,
			method: "post"
		}).then(({ data }) => {
			if (data && data.code === 0) {
				this.$storage.set("Token", data.token);
				this.$storage.set("role", this.rulesForm.role);
				this.$storage.set("sessionTable", this.tableName);
				this.$storage.set("adminName", this.rulesForm.username);
				this.$router.replace({ path: "/" });
			} else {
				this.$message.error(data.msg);
			}
		});
	},
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  position: relative;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
      background: url(http://codegen.caihongy.cn/20231022/32f7bf7edcdc4036b69e97823b37b46b.jpg);
        
  .list-item /deep/ .el-input .el-input__inner {
		border: 0px solid #afc3ce;
		border-radius: 4px;
		padding: 0 10px;
		box-shadow: 0 0 0px rgba(64, 158, 255, .3);
		outline: 0px solid #eee;
		color: #ccc;
		background: #fff;
		width: 100%;
		font-size: inherit;
		outline-offset: 0px;
		height: 40px;
	  }
  
  .list-item.select /deep/ .el-select .el-input__inner {
		border: 0px solid #afc3ce;
		border-radius: 4px;
		padding: 0 10px;
		margin: 0;
		color: #ccc;
		background: #fff;
		width: 240px;
		font-size: 14px;
		height: 40px;
	  }
  
  .list-code /deep/ .el-input .el-input__inner {
  	  	border: 0px solid #afc3ce;
  	  	border-radius: 4px 0 0 4px;
  	  	padding: 0 10px;
  	  	outline: none;
  	  	color: #ccc;
  	  	background: #fff;
  	  	width: calc(100% - 80px);
  	  	font-size: inherit;
  	  	height: 40px;
  	  }

  .list-type /deep/ .el-radio__input .el-radio__inner {
		background: rgba(53, 53, 53, 0);
		border-color: #666666;
	  }
  .list-type /deep/ .el-radio__input.is-checked .el-radio__inner {
        background: rgba(167,142,68,.2);
        border-color: rgba(167,142,68,.2);
      }
  .list-type /deep/ .el-radio__label {
		color: #666666;
		font-size: 16px;
	  }
  .list-type /deep/ .el-radio__input.is-checked+.el-radio__label {
        color: rgba(50,50,50,1);
        font-size: 16px;
      }
}

</style>
