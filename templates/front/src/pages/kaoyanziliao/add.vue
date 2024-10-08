<template>
<div :style='{"width":"80%","padding":"20px","margin":"10px auto","position":"relative","background":"#fff"}'>
    <el-form
	  :style='{"width":"100%","position":"relative","flexWrap":"wrap","justifyContent":"space-between","display":"flex"}'
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
    >
          <el-form-item :style='{"width":"49%","padding":"10px","margin":"0 0 10px","background":"none"}' label="资料编号" prop="ziliaobianhao">
              <el-input v-model="ruleForm.ziliaobianhao" placeholder="资料编号" disabled></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"49%","padding":"10px","margin":"0 0 10px","background":"none"}' label="资料名称" prop="ziliaomingcheng">
            <el-input v-model="ruleForm.ziliaomingcheng" 
                placeholder="资料名称" clearable :disabled=" false  ||ro.ziliaomingcheng"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"49%","padding":"10px","margin":"0 0 10px","background":"none"}'  label="资料分类" prop="ziliaofenlei">
            <el-select v-model="ruleForm.ziliaofenlei" placeholder="请选择资料分类" :disabled=" false  ||ro.ziliaofenlei" >
              <el-option
                  v-for="(item,index) in ziliaofenleiOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"width":"49%","padding":"10px","margin":"0 0 10px","background":"none"}' label="资料封面" v-if="type!='cross' || (type=='cross' && !ro.ziliaofengmian)" prop="ziliaofengmian">
            <file-upload
            tip="点击上传资料封面"
            action="file/upload"
            :limit="3"
            :multiple="true"
            :fileUrls="ruleForm.ziliaofengmian?ruleForm.ziliaofengmian:''"
            @change="ziliaofengmianUploadChange"
            ></file-upload>
          </el-form-item>
            <el-form-item :style='{"width":"49%","padding":"10px","margin":"0 0 10px","background":"none"}' class="upload" v-else label="资料封面" prop="ziliaofengmian">
                <img v-if="ruleForm.ziliaofengmian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.ziliaofengmian.split(',')[0]" width="100" height="100">
                <img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.ziliaofengmian.split(',')" :src="baseUrl+item" width="100" height="100">
            </el-form-item>
          <el-form-item :style='{"width":"49%","padding":"10px","margin":"0 0 10px","background":"none"}' label="资料文件" prop="ziliaowenjian">
            <file-upload
            tip="点击上传资料文件"
            action="file/upload"
            :limit="1"
            :multiple="true"
            :fileUrls="ruleForm.ziliaowenjian?ruleForm.ziliaowenjian:''"
            @change="ziliaowenjianUploadChange"
            ></file-upload>
          </el-form-item>  
          <el-form-item :style='{"width":"49%","padding":"10px","margin":"0 0 10px","background":"none"}' label="上传时间" prop="shangchuanshijian">
              <el-date-picker
				  :disabled=" false  ||ro.shangchuanshijian"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="ruleForm.shangchuanshijian" 
                  type="datetime"
                  placeholder="上传时间">
              </el-date-picker>
          </el-form-item>
          <el-form-item :style='{"width":"49%","padding":"10px","margin":"0 0 10px","background":"none"}' label="教师账号" prop="jiaoshizhanghao">
            <el-input v-model="ruleForm.jiaoshizhanghao" 
                placeholder="教师账号" clearable :disabled=" false  ||ro.jiaoshizhanghao"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"49%","padding":"10px","margin":"0 0 10px","background":"none"}' label="教师姓名" prop="jiaoshixingming">
            <el-input v-model="ruleForm.jiaoshixingming" 
                placeholder="教师姓名" clearable :disabled=" false  ||ro.jiaoshixingming"></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"49%","padding":"10px","margin":"0 0 10px","background":"none"}' label="资料内容" prop="ziliaoneirong">
            <editor 
                :style='{"padding":"0","boxShadow":"none","margin":"0","borderColor":"#E2E3E5","backgroundColor":"#fff","borderRadius":"0","borderWidth":"1px","width":"100%","borderStyle":"solid","height":"auto"}'
                v-model="ruleForm.ziliaoneirong" 
                class="editor" 
                action="file/upload">
            </editor>
          </el-form-item>

      <el-form-item :style='{"width":"100%","padding":"0","margin":"0","textAlign":"center"}'>
        <el-button :style='{"border":"0","cursor":"pointer","padding":"0 10px","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"#FE6917","width":"auto","lineHeight":"30px","fontSize":"14px","height":"30px"}'  type="primary" @click="onSubmit">提交</el-button>
        <el-button :style='{"border":"0","cursor":"pointer","padding":"0 10px","margin":"0","outline":"none","color":"#fff","borderRadius":"5px","background":"#9E9E9E","width":"auto","lineHeight":"30px","fontSize":"14px","height":"30px"}' @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
  export default {
    data() {
	  let self = this
      return {
        id: '',
        baseUrl: '',
        ro:{
				ziliaobianhao : false,
				ziliaomingcheng : false,
				ziliaofenlei : false,
				ziliaofengmian : false,
				ziliaowenjian : false,
				ziliaoneirong : false,
				shangchuanshijian : false,
				jiaoshizhanghao : false,
				jiaoshixingming : false,
				storeupnum : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          ziliaobianhao: this.getUUID(),
          ziliaomingcheng: '',
          ziliaofenlei: '',
          ziliaofengmian: '',
          ziliaowenjian: '',
          ziliaoneirong: '',
          shangchuanshijian: '',
          jiaoshizhanghao: '',
          jiaoshixingming: '',
          storeupnum: '',
        },
        ziliaofenleiOptions: [],


        rules: {
          ziliaobianhao: [
          ],
          ziliaomingcheng: [
          ],
          ziliaofenlei: [
          ],
          ziliaofengmian: [
          ],
          ziliaowenjian: [
          ],
          ziliaoneirong: [
          ],
          shangchuanshijian: [
          ],
          jiaoshizhanghao: [
          ],
          jiaoshixingming: [
          ],
          storeupnum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
        },
		centerType: false,
      };
    },
    computed: {



    },
    components: {
    },
    created() {
		if(this.$route.query.centerType){
			this.centerType = true
		}
	  //this.bg();
      let type = this.$route.query.type ? this.$route.query.type : '';
      this.init(type);
      this.baseUrl = this.$config.baseUrl;
      this.ruleForm.shangchuanshijian = this.getCurDateTime()
    },
    methods: {
      getMakeZero(s) {
          return s < 10 ? '0' + s : s;
      },
      // 下载
      download(file){
        window.open(`${file}`)
      },
      // 初始化
      init(type) {
        this.type = type;
        if(type=='cross'){
          var obj = JSON.parse(localStorage.getItem('crossObj'));
          for (var o in obj){
            if(o=='ziliaobianhao'){
              this.ruleForm.ziliaobianhao = obj[o];
              this.ro.ziliaobianhao = true;
              continue;
            }
            if(o=='ziliaomingcheng'){
              this.ruleForm.ziliaomingcheng = obj[o];
              this.ro.ziliaomingcheng = true;
              continue;
            }
            if(o=='ziliaofenlei'){
              this.ruleForm.ziliaofenlei = obj[o];
              this.ro.ziliaofenlei = true;
              continue;
            }
            if(o=='ziliaofengmian'){
              this.ruleForm.ziliaofengmian = obj[o].split(",")[0];
              this.ro.ziliaofengmian = true;
              continue;
            }
            if(o=='ziliaowenjian'){
              this.ruleForm.ziliaowenjian = obj[o];
              this.ro.ziliaowenjian = true;
              continue;
            }
            if(o=='ziliaoneirong'){
              this.ruleForm.ziliaoneirong = obj[o];
              this.ro.ziliaoneirong = true;
              continue;
            }
            if(o=='shangchuanshijian'){
              this.ruleForm.shangchuanshijian = obj[o];
              this.ro.shangchuanshijian = true;
              continue;
            }
            if(o=='jiaoshizhanghao'){
              this.ruleForm.jiaoshizhanghao = obj[o];
              this.ro.jiaoshizhanghao = true;
              continue;
            }
            if(o=='jiaoshixingming'){
              this.ruleForm.jiaoshixingming = obj[o];
              this.ro.jiaoshixingming = true;
              continue;
            }
            if(o=='storeupnum'){
              this.ruleForm.storeupnum = obj[o];
              this.ro.storeupnum = true;
              continue;
            }
          }
        }else if(type=='edit'){
			this.info()
		}
        // 获取用户信息
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
            if((json.jiaoshizhanghao!=''&&json.jiaoshizhanghao) || json.jiaoshizhanghao==0){
                this.ruleForm.jiaoshizhanghao = json.jiaoshizhanghao
            }
            if((json.jiaoshixingming!=''&&json.jiaoshixingming) || json.jiaoshixingming==0){
                this.ruleForm.jiaoshixingming = json.jiaoshixingming
            }
          }
        });
        this.$http.get('option/ziliaofenlei/ziliaofenlei', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.ziliaofenleiOptions = res.data.data;
          }
        });

		if (localStorage.getItem('raffleType') && localStorage.getItem('raffleType') != null) {
			localStorage.removeItem('raffleType')
			setTimeout(() => {
				this.onSubmit()
			}, 300)
		}
      },

    // 多级联动参数
      // 多级联动参数
      info() {
        this.$http.get(`kaoyanziliao/detail/${this.$route.query.id}`, {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.ruleForm = res.data.data;
          }
        });
      },
      // 提交
      onSubmit() {

			if(this.ruleForm.ziliaobianhao){
				this.ruleForm.ziliaobianhao = String(this.ruleForm.ziliaobianhao)
			}
			//更新跨表属性
			var crossuserid;
			var crossrefid;
			var crossoptnum;
			this.$refs["ruleForm"].validate(valid => {
				if(valid) {
					if(this.type=='cross'){
						var statusColumnName = localStorage.getItem('statusColumnName');
						var statusColumnValue = localStorage.getItem('statusColumnValue');
						if(statusColumnName && statusColumnName!='') {
							var obj = JSON.parse(localStorage.getItem('crossObj'));
							if(!statusColumnName.startsWith("[")) {
								for (var o in obj){
									if(o==statusColumnName){
										obj[o] = statusColumnValue;
									}
								}
								var table = localStorage.getItem('crossTable');
								this.$http.post(table+'/update', obj).then(res => {});
							} else {
								crossuserid=Number(localStorage.getItem('frontUserid'));
								crossrefid=obj['id'];
								crossoptnum=localStorage.getItem('statusColumnName');
								crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
							}
						}
					}
					if(crossrefid && crossuserid) {
						this.ruleForm.crossuserid=crossuserid;
						this.ruleForm.crossrefid=crossrefid;
						var params = {
							page: 1,
							limit: 10,
							crossuserid:crossuserid,
							crossrefid:crossrefid,
						}
						this.$http.get('kaoyanziliao/list', {
							params: params
						}).then(res => {
							if(res.data.data.total>=crossoptnum) {
								this.$message({
									message: localStorage.getItem('tips'),
									type: 'error',
									duration: 1500,
								});
								return false;
							} else {
								// 跨表计算


								this.$http.post(`kaoyanziliao/${this.ruleForm.id?'update':this.centerType?'save':'add'}`, this.ruleForm).then(res => {
									if (res.data.code == 0) {
										this.$message({
											message: '操作成功',
											type: 'success',
											duration: 1500,
											onClose: () => {
												this.$router.go(-1);
											}
										});
									} else {
										this.$message({
											message: res.data.msg,
											type: 'error',
											duration: 1500
										});
									}
								});
							}
						});
					} else {


						this.$http.post(`kaoyanziliao/${this.ruleForm.id?'update':this.centerType?'save':'add'}`, this.ruleForm).then(res => {
							if (res.data.code == 0) {
								this.$message({
									message: '操作成功',
									type: 'success',
									duration: 1500,
									onClose: () => {
										this.$router.go(-1);
									}
								});
							} else {
								this.$message({
									message: res.data.msg,
									type: 'error',
									duration: 1500
								});
							}
						});
					}
				}
			});
		},
		// 获取uuid
		getUUID () {
			return new Date().getTime();
		},
		// 返回
		back() {
			this.$router.go(-1);
		},
      ziliaofengmianUploadChange(fileUrls) {
          this.ruleForm.ziliaofengmian = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");;
      },
      ziliaowenjianUploadChange(fileUrls) {
          this.ruleForm.ziliaowenjian = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");;
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  padding: 0 10px 0 0;
	  color: #000;
	  font-weight: 500;
	  width: 80px;
	  font-size: 14px;
	  line-height: 40px;
	  text-align: right;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 80px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  border: 1px solid #E2E3E5;
	  border-radius: 0;
	  padding: 0 12px;
	  box-shadow: none;
	  outline: none;
	  color: #000;
	  width: 400px;
	  font-size: 14px;
	  height: 40px;
	}
	.add-update-preview .el-input-number /deep/ .el-input__inner {
		text-align: left;
	  border: 1px solid #E2E3E5;
	  border-radius: 0;
	  padding: 0 12px;
	  box-shadow: none;
	  outline: none;
	  color: #000;
	  width: 400px;
	  font-size: 14px;
	  height: 40px;
	}
	.add-update-preview .el-input-number /deep/ .el-input-number__decrease {
		display: none;
	}
	.add-update-preview .el-input-number /deep/ .el-input-number__increase {
		display: none;
	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  border: 1px solid #E2E3E5;
	  border-radius: 0;
	  padding: 0 10px;
	  box-shadow: none;
	  outline: none;
	  color: #000;
	  width: 400px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  border: 1px solid #E2E3E5;
	  border-radius: 0;
	  padding: 0 10px 0 30px;
	  box-shadow: none;
	  outline: none;
	  color: #000;
	  width: 400px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
	  border: 1px solid #E2E3E5;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #000;
	  width: 200px;
	  font-size: 32px;
	  line-height: 60px;
	  text-align: center;
	  height: 60px;
	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  border: 1px solid #E2E3E5;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #000;
	  width: 200px;
	  font-size: 32px;
	  line-height: 60px;
	  text-align: center;
	  height: 60px;
	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  border: 1px solid #E2E3E5;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #000;
	  width: 200px;
	  font-size: 32px;
	  line-height: 60px;
	  text-align: center;
	  height: 60px;
	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  border: 1px solid #E2E3E5;
	  border-radius: 0;
	  padding: 12px;
	  box-shadow: none;
	  outline: none;
	  color: #000;
	  width: 400px;
	  font-size: 14px;
	  height: 120px;
	}
</style>
