<template>
	<div>
		<div class="container" :style='{"minHeight":"100vh","alignItems":"center","background":"url(http://codegen.caihongy.cn/20231022/32f7bf7edcdc4036b69e97823b37b46b.jpg)","display":"flex","width":"100%","backgroundSize":"cover","backgroundPosition":"center bottom","backgroundRepeat":"no-repeat","justifyContent":"center"}'>
			<el-form v-if="pageFlag=='register'" :style='{"border":"0px solid #f6f6f6","padding":"80px 60px 150px 160px","margin":"20px 0","alignItems":"flex-start","textAlign":"center","display":"flex","justifyContent":"flex-start","minHeight":"600px","borderRadius":"0px","flexWrap":"wrap","background":"url(http://codegen.caihongy.cn/20231022/3e8de650473a498b9c1847c1f65282f7.png) no-repeat center top / 100% 100%","width":"600px","height":"auto"}' ref="rgsForm" class="rgs-form" :model="rgsForm" :rules="rules">
				<div v-if="true" :style='{"padding":"0px","margin":"0 0 20px","borderColor":"#eee","color":"#fff","textAlign":"center","display":"inline-block","background":"none","borderWidth":"0px","width":"86%","lineHeight":"40px","fontSize":"18px","borderStyle":"solid","fontWeight":"500"}' class="title">基于 Python 的考研学习系统的设计与实现注册</div>
				<el-form-item :style='{"padding":"0 0px","margin":"0 0 10px 0","textAlign":"left","flexWrap":"wrap","display":"flex","width":"100%","fontSize":"inherit","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='xuesheng'">
					<div v-if="true" :style='{"padding":"0 6px","color":"#ccc","textAlign":"right","left":"-120px","display":"inline-block","width":"120px","lineHeight":"40px","fontSize":"14px","position":"absolute","order":"2"}' class="lable" :class="changeRules('xueshengzhanghao')?'required':''">学生账号：</div>
					<el-input  v-model="ruleForm.xueshengzhanghao"  autocomplete="off" placeholder="学生账号"  type="text"  />
				</el-form-item>
				<el-form-item :style='{"padding":"0 0px","margin":"0 0 10px 0","textAlign":"left","flexWrap":"wrap","display":"flex","width":"100%","fontSize":"inherit","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='xuesheng'">
					<div v-if="true" :style='{"padding":"0 6px","color":"#ccc","textAlign":"right","left":"-120px","display":"inline-block","width":"120px","lineHeight":"40px","fontSize":"14px","position":"absolute","order":"2"}' class="lable" :class="changeRules('xueshengxingming')?'required':''">学生姓名：</div>
					<el-input  v-model="ruleForm.xueshengxingming"  autocomplete="off" placeholder="学生姓名"  type="text"  />
				</el-form-item>
				<el-form-item :style='{"padding":"0 0px","margin":"0 0 10px 0","textAlign":"left","flexWrap":"wrap","display":"flex","width":"100%","fontSize":"inherit","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='xuesheng'">
					<div v-if="true" :style='{"padding":"0 6px","color":"#ccc","textAlign":"right","left":"-120px","display":"inline-block","width":"120px","lineHeight":"40px","fontSize":"14px","position":"absolute","order":"2"}' class="lable" :class="changeRules('mima')?'required':''">密码：</div>
					<el-input  v-model="ruleForm.mima"  autocomplete="off" placeholder="密码"  type="password"  />
				</el-form-item>
				<el-form-item :style='{"padding":"0 0px","margin":"0 0 10px 0","textAlign":"left","flexWrap":"wrap","display":"flex","width":"100%","fontSize":"inherit","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='xuesheng'">
					<div v-if="true" :style='{"padding":"0 6px","color":"#ccc","textAlign":"right","left":"-120px","display":"inline-block","width":"120px","lineHeight":"40px","fontSize":"14px","position":"absolute","order":"2"}' class="lable" :class="changeRules('mima')?'required':''">确认密码：</div>
					<el-input  v-model="ruleForm.mima2" autocomplete="off" placeholder="确认密码" type="password" />
				</el-form-item>
				<el-form-item :style='{"padding":"0 0px","margin":"0 0 10px 0","textAlign":"left","flexWrap":"wrap","display":"flex","width":"100%","fontSize":"inherit","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='xuesheng'">
					<div v-if="true" :style='{"padding":"0 6px","color":"#ccc","textAlign":"right","left":"-120px","display":"inline-block","width":"120px","lineHeight":"40px","fontSize":"14px","position":"absolute","order":"2"}' class="lable" :class="changeRules('shoujihao')?'required':''">手机号：</div>
					<el-input  v-model="ruleForm.shoujihao"  autocomplete="off" placeholder="手机号"  type="text"  />
				</el-form-item>
				<el-form-item :style='{"padding":"0 0px","margin":"0 0 10px 0","textAlign":"left","flexWrap":"wrap","display":"flex","width":"100%","fontSize":"inherit","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='xuesheng'">
					<div v-if="true" :style='{"padding":"0 6px","color":"#ccc","textAlign":"right","left":"-120px","display":"inline-block","width":"120px","lineHeight":"40px","fontSize":"14px","position":"absolute","order":"2"}' class="lable" :class="changeRules('xingbie')?'required':''">性别：</div>
                    <el-select v-model="ruleForm.xingbie" placeholder="请选择性别" >
                        <el-option
                            v-for="(item,index) in xueshengxingbieOptions"
                            v-bind:key="index"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item :style='{"padding":"0 0px","margin":"0 0 10px 0","textAlign":"left","flexWrap":"wrap","display":"flex","width":"100%","fontSize":"inherit","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='xuesheng'">
					<div v-if="true" :style='{"padding":"0 6px","color":"#ccc","textAlign":"right","left":"-120px","display":"inline-block","width":"120px","lineHeight":"40px","fontSize":"14px","position":"absolute","order":"2"}' class="lable" :class="changeRules('nianling')?'required':''">年龄：</div>
					<el-input  v-model="ruleForm.nianling"  autocomplete="off" placeholder="年龄"  type="text"  />
				</el-form-item>
				<el-form-item :style='{"padding":"0 0px","margin":"0 0 10px 0","textAlign":"left","flexWrap":"wrap","display":"flex","width":"100%","fontSize":"inherit","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='xuesheng'">
					<div v-if="true" :style='{"padding":"0 6px","color":"#ccc","textAlign":"right","left":"-120px","display":"inline-block","width":"120px","lineHeight":"40px","fontSize":"14px","position":"absolute","order":"2"}' class="lable" :class="changeRules('touxiang')?'required':''">头像：</div>
                    <file-upload
                        tip="点击上传头像"
                        action="file/upload"
                        :limit="3"
                        :multiple="true"
                        :fileUrls="ruleForm.touxiang?ruleForm.touxiang:''"
                        @change="xueshengtouxiangUploadChange"
                    ></file-upload>
				</el-form-item>
				<el-form-item :style='{"padding":"0 0px","margin":"0 0 10px 0","textAlign":"left","flexWrap":"wrap","display":"flex","width":"100%","fontSize":"inherit","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='jiaoshi'">
					<div v-if="true" :style='{"padding":"0 6px","color":"#ccc","textAlign":"right","left":"-120px","display":"inline-block","width":"120px","lineHeight":"40px","fontSize":"14px","position":"absolute","order":"2"}' class="lable" :class="changeRules('jiaoshizhanghao')?'required':''">教师账号：</div>
					<el-input  v-model="ruleForm.jiaoshizhanghao"  autocomplete="off" placeholder="教师账号"  type="text"  />
				</el-form-item>
				<el-form-item :style='{"padding":"0 0px","margin":"0 0 10px 0","textAlign":"left","flexWrap":"wrap","display":"flex","width":"100%","fontSize":"inherit","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='jiaoshi'">
					<div v-if="true" :style='{"padding":"0 6px","color":"#ccc","textAlign":"right","left":"-120px","display":"inline-block","width":"120px","lineHeight":"40px","fontSize":"14px","position":"absolute","order":"2"}' class="lable" :class="changeRules('jiaoshixingming')?'required':''">教师姓名：</div>
					<el-input  v-model="ruleForm.jiaoshixingming"  autocomplete="off" placeholder="教师姓名"  type="text"  />
				</el-form-item>
				<el-form-item :style='{"padding":"0 0px","margin":"0 0 10px 0","textAlign":"left","flexWrap":"wrap","display":"flex","width":"100%","fontSize":"inherit","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='jiaoshi'">
					<div v-if="true" :style='{"padding":"0 6px","color":"#ccc","textAlign":"right","left":"-120px","display":"inline-block","width":"120px","lineHeight":"40px","fontSize":"14px","position":"absolute","order":"2"}' class="lable" :class="changeRules('mima')?'required':''">密码：</div>
					<el-input  v-model="ruleForm.mima"  autocomplete="off" placeholder="密码"  type="password"  />
				</el-form-item>
				<el-form-item :style='{"padding":"0 0px","margin":"0 0 10px 0","textAlign":"left","flexWrap":"wrap","display":"flex","width":"100%","fontSize":"inherit","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='jiaoshi'">
					<div v-if="true" :style='{"padding":"0 6px","color":"#ccc","textAlign":"right","left":"-120px","display":"inline-block","width":"120px","lineHeight":"40px","fontSize":"14px","position":"absolute","order":"2"}' class="lable" :class="changeRules('mima')?'required':''">确认密码：</div>
					<el-input  v-model="ruleForm.mima2" autocomplete="off" placeholder="确认密码" type="password" />
				</el-form-item>
				<el-form-item :style='{"padding":"0 0px","margin":"0 0 10px 0","textAlign":"left","flexWrap":"wrap","display":"flex","width":"100%","fontSize":"inherit","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='jiaoshi'">
					<div v-if="true" :style='{"padding":"0 6px","color":"#ccc","textAlign":"right","left":"-120px","display":"inline-block","width":"120px","lineHeight":"40px","fontSize":"14px","position":"absolute","order":"2"}' class="lable" :class="changeRules('shoujihao')?'required':''">手机号：</div>
					<el-input  v-model="ruleForm.shoujihao"  autocomplete="off" placeholder="手机号"  type="text"  />
				</el-form-item>
				<el-form-item :style='{"padding":"0 0px","margin":"0 0 10px 0","textAlign":"left","flexWrap":"wrap","display":"flex","width":"100%","fontSize":"inherit","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='jiaoshi'">
					<div v-if="true" :style='{"padding":"0 6px","color":"#ccc","textAlign":"right","left":"-120px","display":"inline-block","width":"120px","lineHeight":"40px","fontSize":"14px","position":"absolute","order":"2"}' class="lable" :class="changeRules('xingbie')?'required':''">性别：</div>
                    <el-select v-model="ruleForm.xingbie" placeholder="请选择性别" >
                        <el-option
                            v-for="(item,index) in jiaoshixingbieOptions"
                            v-bind:key="index"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item :style='{"padding":"0 0px","margin":"0 0 10px 0","textAlign":"left","flexWrap":"wrap","display":"flex","width":"100%","fontSize":"inherit","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='jiaoshi'">
					<div v-if="true" :style='{"padding":"0 6px","color":"#ccc","textAlign":"right","left":"-120px","display":"inline-block","width":"120px","lineHeight":"40px","fontSize":"14px","position":"absolute","order":"2"}' class="lable" :class="changeRules('nianling')?'required':''">年龄：</div>
					<el-input  v-model="ruleForm.nianling"  autocomplete="off" placeholder="年龄"  type="text"  />
				</el-form-item>
				<el-form-item :style='{"padding":"0 0px","margin":"0 0 10px 0","textAlign":"left","flexWrap":"wrap","display":"flex","width":"100%","fontSize":"inherit","position":"relative","height":"auto"}' class="list-item" v-if="tableName=='jiaoshi'">
					<div v-if="true" :style='{"padding":"0 6px","color":"#ccc","textAlign":"right","left":"-120px","display":"inline-block","width":"120px","lineHeight":"40px","fontSize":"14px","position":"absolute","order":"2"}' class="lable" :class="changeRules('touxiang')?'required':''">头像：</div>
                    <file-upload
                        tip="点击上传头像"
                        action="file/upload"
                        :limit="3"
                        :multiple="true"
                        :fileUrls="ruleForm.touxiang?ruleForm.touxiang:''"
                        @change="jiaoshitouxiangUploadChange"
                    ></file-upload>
				</el-form-item>
				<button :style='{"border":"0","cursor":"pointer","padding":"0 20px","boxShadow":"0 0 0px rgba(64, 158, 255, .5)","margin":"0 10px 0 0","color":"#fff","display":"inline-block","letterSpacing":"4px","outline":"none","borderRadius":"0px","background":"#ffb901","width":"auto","fontSize":"14px","height":"34px"}' type="button" class="r-btn" @click="login()">注册</button>
				<div :style='{"cursor":"pointer","padding":"0","margin":"0","color":"rgba(159, 159, 159, 1)","textAlign":"right","display":"inline-block","width":"auto","lineHeight":"36px","fontSize":"12px"}' class="r-login" @click="close()">已有账号，直接登录</div>
			</el-form>
			
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			ruleForm: {
			},
			forgetForm: {},
            pageFlag : '',
			tableName:"",
			rules: {},
            xueshengxingbieOptions: [],
            jiaoshixingbieOptions: [],
		};
	},
	mounted(){
		this.pageFlag = this.$route.query.pageFlag
		if(this.$route.query.pageFlag=='register'){
			
			let table = this.$storage.get("loginTable");
			this.tableName = table;
			if(this.tableName=='xuesheng'){
				this.ruleForm = {
					xueshengzhanghao: '',
					xueshengxingming: '',
					mima: '',
					shoujihao: '',
					xingbie: '',
					nianling: '',
					touxiang: '',
				}
			}
			if(this.tableName=='jiaoshi'){
				this.ruleForm = {
					jiaoshizhanghao: '',
					jiaoshixingming: '',
					mima: '',
					shoujihao: '',
					xingbie: '',
					nianling: '',
					touxiang: '',
				}
			}
			if ('xuesheng' == this.tableName) {
				this.rules.xueshengzhanghao = [{ required: true, message: '请输入学生账号', trigger: 'blur' }]
			}
			if ('xuesheng' == this.tableName) {
				this.rules.xueshengxingming = [{ required: true, message: '请输入学生姓名', trigger: 'blur' }]
			}
			if ('xuesheng' == this.tableName) {
				this.rules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }]
			}
			if ('jiaoshi' == this.tableName) {
				this.rules.jiaoshizhanghao = [{ required: true, message: '请输入教师账号', trigger: 'blur' }]
			}
			if ('jiaoshi' == this.tableName) {
				this.rules.jiaoshixingming = [{ required: true, message: '请输入教师姓名', trigger: 'blur' }]
			}
			if ('jiaoshi' == this.tableName) {
				this.rules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }]
			}
			this.xueshengxingbieOptions = "男,女".split(',')
			this.jiaoshixingbieOptions = "男,女".split(',')
		}
	},
	created() {
	},
	destroyed() {
		  	},
	methods: {
		changeRules(name){
			if(this.rules[name]){
				return true
			}
			return false
		},
		// 获取uuid
		getUUID () {
			return new Date().getTime();
		},
		close(){
			this.$router.push({ path: "/login" });
		},
        xueshengtouxiangUploadChange(fileUrls) {
            this.ruleForm.touxiang = fileUrls;
        },
        jiaoshitouxiangUploadChange(fileUrls) {
            this.ruleForm.touxiang = fileUrls;
        },

        // 多级联动参数


		// 注册
		login() {
			var url=this.tableName+"/register";
					if((!this.ruleForm.xueshengzhanghao) && `xuesheng` == this.tableName){
						this.$message.error(`学生账号不能为空`);
						return
					}
					if((!this.ruleForm.xueshengxingming) && `xuesheng` == this.tableName){
						this.$message.error(`学生姓名不能为空`);
						return
					}
					if((!this.ruleForm.mima) && `xuesheng` == this.tableName){
						this.$message.error(`密码不能为空`);
						return
					}
					if((this.ruleForm.mima!=this.ruleForm.mima2) && `xuesheng` == this.tableName){
						this.$message.error(`两次密码输入不一致`);
						return
					}
					if(`xuesheng` == this.tableName && this.ruleForm.shoujihao &&(!this.$validate.isMobile(this.ruleForm.shoujihao))){
						this.$message.error(`手机号应输入手机格式`);
						return
					}
            if(this.ruleForm.touxiang!=null) {
                this.ruleForm.touxiang = this.ruleForm.touxiang.replace(new RegExp(this.$base.url,"g"),"");
            }
					if((!this.ruleForm.jiaoshizhanghao) && `jiaoshi` == this.tableName){
						this.$message.error(`教师账号不能为空`);
						return
					}
					if((!this.ruleForm.jiaoshixingming) && `jiaoshi` == this.tableName){
						this.$message.error(`教师姓名不能为空`);
						return
					}
					if((!this.ruleForm.mima) && `jiaoshi` == this.tableName){
						this.$message.error(`密码不能为空`);
						return
					}
					if((this.ruleForm.mima!=this.ruleForm.mima2) && `jiaoshi` == this.tableName){
						this.$message.error(`两次密码输入不一致`);
						return
					}
					if(`jiaoshi` == this.tableName && this.ruleForm.shoujihao &&(!this.$validate.isMobile(this.ruleForm.shoujihao))){
						this.$message.error(`手机号应输入手机格式`);
						return
					}
            if(this.ruleForm.touxiang!=null) {
                this.ruleForm.touxiang = this.ruleForm.touxiang.replace(new RegExp(this.$base.url,"g"),"");
            }
			this.$http({
				url: url,
				method: "post",
				data:this.ruleForm
			}).then(({ data }) => {
				if (data && data.code === 0) {
					this.$message({
						message: "注册成功",
						type: "success",
						duration: 1500,
						onClose: () => {
							this.$router.replace({ path: "/login" });
						}
					});
				} else {
					this.$message.error(data.msg);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	.container {
	  position: relative;
	  background: url(http://codegen.caihongy.cn/20231022/32f7bf7edcdc4036b69e97823b37b46b.jpg);

		.el-date-editor.el-input {
		  width: 100%;
		}
		
		.rgs-form .el-input /deep/ .el-input__inner {
						border: 0px solid #afc3ce;
						border-radius: 4px;
						padding: 0 10px;
						box-shadow: 0 0 0px rgba(64, 158, 255, .3);
						outline: none;
						color: #ccc;
						background: #fff;
						width: 230px;
						font-size: 14px;
						height: 40px;
					}
		
		.rgs-form .el-select /deep/ .el-input__inner {
						border: 0px solid #afc3ce;
						border-radius: 4px;
						padding: 0 10px;
						box-shadow: 0 0 0px rgba(64, 158, 255, .3);
						outline: none;
						color: #ccc;
						background: #fff;
						width: 230px;
						font-size: 14px;
						height: 40px;
					}
		
		.rgs-form .el-date-editor /deep/ .el-input__inner {
						border: 0px solid #afc3ce;
						border-radius: 4px;
						padding: 0 10px 0 30px;
						box-shadow: 0 0 0px rgba(64, 158, 255, .3);
						outline: none;
						color: #ccc;
						background: #fff;
						width: 230px;
						font-size: 14px;
						height: 40px;
					}
		
		.rgs-form .el-date-editor /deep/ .el-input__inner {
						border: 0px solid #afc3ce;
						border-radius: 4px;
						padding: 0 10px 0 30px;
						box-shadow: 0 0 0px rgba(64, 158, 255, .3);
						outline: none;
						color: #ccc;
						background: #fff;
						width: 230px;
						font-size: 14px;
						height: 40px;
					}
		
		.rgs-form /deep/ .el-upload--picture-card {
			background: transparent;
			border: 0;
			border-radius: 0;
			width: auto;
			height: auto;
			line-height: initial;
			vertical-align: middle;
		}
		
		.rgs-form /deep/ .upload .upload-img {
		  		  border: 0px solid #afc3ce;
		  		  cursor: pointer;
		  		  border-radius: 4px;
		  		  color: #57697f;
		  		  background: #fff;
		  		  width: 160px;
		  		  font-size: 28px;
		  		  line-height: 60px;
		  		  text-align: center;
		  		  height: 60px;
		  		}
		
		.rgs-form /deep/ .el-upload-list .el-upload-list__item {
		  		  border: 0px solid #afc3ce;
		  		  cursor: pointer;
		  		  border-radius: 4px;
		  		  color: #57697f;
		  		  background: #fff;
		  		  width: 160px;
		  		  font-size: 28px;
		  		  line-height: 60px;
		  		  text-align: center;
		  		  height: 60px;
		  		}
		
		.rgs-form /deep/ .el-upload .el-icon-plus {
		  		  border: 0px solid #afc3ce;
		  		  cursor: pointer;
		  		  border-radius: 4px;
		  		  color: #57697f;
		  		  background: #fff;
		  		  width: 160px;
		  		  font-size: 28px;
		  		  line-height: 60px;
		  		  text-align: center;
		  		  height: 60px;
		  		}
	}
	.required {
		position: relative;
	}
	.required::after{
				color: red;
				position: absolute;
				right: 3px;
				content: "*";
				order: 3;
			}
	.editor>.avatar-uploader {
		line-height: 0;
		height: 0;
	}
</style>
