<template>
  <div :style='{"color":"#666","padding":"20px 30px 30px","fontSize":"14px"}'>
    <el-form
	  :style='{"border":"1px solid #bababa","padding":"40px 30px 20px","borderRadius":"8px","alignItems":"flex-start","flexWrap":"wrap","background":"rgba(255,255,255,1)","display":"flex","fontSize":"inherit"}'
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="150px"
    >
      <el-form-item :style='{"border":"1px solid #eee","padding":"20px 0","margin":"0 0 2px 0","color":"inherit","borderRadius":"0px","width":"100%","fontSize":"inherit"}' label="选择试题测试" prop="paperid">
        <el-select @change="onPaperChange" v-model="ruleForm.paperid" placeholder="选择试题测试">
          <el-option
            v-for="(item,index) in paperOptions"
            v-bind:key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :style='{"border":"1px solid #eee","padding":"20px 0","margin":"0 0 2px 0","color":"inherit","borderRadius":"0px","width":"100%","fontSize":"inherit"}' label="试题" prop="questionname">
        <el-input
          type="textarea"
          min="1"
          v-model="ruleForm.questionname"
          placeholder="试题"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item :style='{"border":"1px solid #eee","padding":"20px 0","margin":"0 0 2px 0","color":"inherit","borderRadius":"0px","width":"100%","fontSize":"inherit"}' label="类型" prop="type">
        <el-select @change="typeChange" v-model="ruleForm.type" placeholder="类型">
          <el-option label="单选题" value="0"></el-option>
          <el-option label="多选题" value="1"></el-option>
          <el-option label="判断题" value="2"></el-option>
          <el-option label="填空题" value="3"></el-option>
          <el-option label="主观题" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :style='{"border":"1px solid #eee","padding":"20px 0","margin":"0 0 2px 0","color":"inherit","borderRadius":"0px","width":"100%","fontSize":"inherit"}' v-if="ruleForm.type!=3&&ruleForm.type!=2&&ruleForm.type!=4" label="选项" prop="options">
        <div class="options" v-for="(item,index) in options" v-bind:key="index">
          {{item.text}}           <el-button size="mini" @click="editOptions(index)" type="warning" round>修改</el-button><el-button size="mini" @click="deleteOptions(index)" type="warning" round>删除</el-button>
        </div>
        <el-button size="small" @click="addOptionsDialog" type="primary" round>添加选项</el-button>
      </el-form-item>
      <el-form-item :style='{"border":"1px solid #eee","padding":"20px 0","margin":"0 0 2px 0","color":"inherit","borderRadius":"0px","width":"100%","fontSize":"inherit"}' v-if="ruleForm.type==0 && options.length>0" label="答案" prop="answer">
        <el-select v-model="ruleForm.answer" @change="answerChange">
          <el-option
            :label="item.code"
            :value="item.code"
            v-for="(item,index) in options"
            v-bind:key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :style='{"border":"1px solid #eee","padding":"20px 0","margin":"0 0 2px 0","color":"inherit","borderRadius":"0px","width":"100%","fontSize":"inherit"}' v-if="ruleForm.type==1 && options.length>0" label="答案" prop="answer">
        <el-select v-model="ruleForm.answer" multiple @change="answerChange">
          <el-option
            :label="item.code"
            :value="item.code"
            v-for="(item,index) in options"
            v-bind:key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :style='{"border":"1px solid #eee","padding":"20px 0","margin":"0 0 2px 0","color":"inherit","borderRadius":"0px","width":"100%","fontSize":"inherit"}' v-if="ruleForm.type==2 && options.length>0" label="答案" prop="answer">
        <el-select v-model="ruleForm.answer" @change="answerChange">
          <el-option
            :label="item.text"
            :value="item.code"
            v-for="(item,index) in options"
            v-bind:key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :style='{"border":"1px solid #eee","padding":"20px 0","margin":"0 0 2px 0","color":"inherit","borderRadius":"0px","width":"100%","fontSize":"inherit"}' v-if="ruleForm.type==3" label="答案" prop="answer">
        <el-input v-model="ruleForm.answer" placeholder="答案" clearable @change="answerChange"></el-input>
      </el-form-item>
      <el-form-item :style='{"border":"1px solid #eee","padding":"20px 0","margin":"0 0 2px 0","color":"inherit","borderRadius":"0px","width":"100%","fontSize":"inherit"}' label="分数" prop="score">
        <el-input-number v-model="ruleForm.score" :min="1" :max="100" label="分数"></el-input-number>
      </el-form-item>
      <el-form-item :style='{"border":"1px solid #eee","padding":"20px 0","margin":"0 0 2px 0","color":"inherit","borderRadius":"0px","width":"100%","fontSize":"inherit"}' label="分析" prop="analysis">
        <el-input
          type="textarea"
          min="1"
          v-model="ruleForm.analysis"
          placeholder="分析"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item :style='{"border":"1px solid #eee","padding":"20px 0","margin":"0 0 2px 0","color":"inherit","borderRadius":"0px","width":"100%","fontSize":"inherit"}' label="排序" prop="sequence">
        <el-input-number v-model="ruleForm.sequence" :min="1" :max="20" label="排序"></el-input-number>
      </el-form-item>
      <el-form-item :style='{"padding":"0","margin":"30px 0","alignItems":"center","textAlign":"center","display":"flex","width":"100%","perspective":"320px","-webkitPerspective":"320px","fontSize":"48px","justifyContent":"flex-start"}'>
		<el-button class="btn3" :style='{"border":"1px solid #0260ad","cursor":"pointer","padding":"0 20px","margin":"0px 4px","outline":"none","color":"#0260ad","borderRadius":"4px","background":"none","width":"auto","fontSize":"14px","lineHeight":"24px","height":"36px"}' type="success" @click="onSubmit">
			<span class="icon iconfont icon-tijiao16" :style='{"margin":"0 2px","fontSize":"18px","color":"inherit","display":"none"}'></span>
			保存
		</el-button>
		<el-button class="btn4" :style='{"border":"0px solid rgba(126, 96, 16, .2)","cursor":"pointer","padding":"0 20px","margin":"0px 4px","outline":"none","color":"#fff","borderRadius":"4px","background":"#ff518a","width":"auto","fontSize":"14px","lineHeight":"24px","height":"36px"}' type="success" @click="back()">
			<span class="icon iconfont icon-quxiao09" :style='{"margin":"0 2px","fontSize":"18px","color":"inherit","display":"none"}'></span>
			取消
		</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="添加选项" :visible.sync="addOptionsDialogVisiable" width="50%">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogRules" label-width="80px">
        <el-form-item label="选项" prop="code">
          <el-select v-model="dialogForm.code" placeholder="选项">
            <el-option label="A" value="A" :disabled="changeCode('A')"></el-option>
            <el-option label="B" value="B" :disabled="changeCode('B')"></el-option>
            <el-option label="C" value="C" :disabled="changeCode('C')"></el-option>
            <el-option label="D" value="D" :disabled="changeCode('D')"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="text">
          <el-input type="textarea" min="1" v-model="dialogForm.text" placeholder="内容" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOptionsDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="addOptions">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { isNumber } from "@/utils/validate";
export default {
  data() {
    var validateNumber = (rule, value, callback) => {
      if (!isNumber(value)) {
        callback(new Error("请输入数字"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {},
      options: [],
      addOptionsDialogVisiable: false,
      dialogForm: {},
      paperOptions: [],
      dialogRules: {
        text: [{ required: true, message: "请填写内容", trigger: "blur" }],
        code: [{ required: true, message: "请选择选项", trigger: "blur" }],
      },
      rules: {
        paperid: [{ required: true, message: "请选择试题测试", trigger: "blur" }],
        questionname: [
          { required: true, message: "试题内容不能为空", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择试题类型", trigger: "blur" }],
        sequence: [{ required: true, message: "排序不能为空", trigger: "blur" }],
        analysis: [
          { required: true, message: "分析不能为空", trigger: "blur" }
        ],
        score: [{ required: true, message: "分数不能为空", trigger: "blur" }]
      },
	  editIndex: -1
    };
  },
  props: ["parent"],
  methods: {
    // 初始化
    init(id) {
      if (id) {
        this.info(id);
      } else {
        this.$http({
          url: this.$api.exampaperpage,
          method: "get",
          params: {
            page: 1,
            limit: 999
          }
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.paperOptions = data.data.list;
          }
        });
        this.ruleForm.created = new Date();
      }
    },
    info(id) {
      this.$http({
        url: this.$api.exampaperpage,
        method: "get",
        params: {
          page: 1,
          limit: 999
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.paperOptions = data.data.list;
          this.$http({
            url: `${this.$api.examquestioninfo}${id}`,
            method: "get"
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.ruleForm = data.data;
              this.ruleForm.type = this.ruleForm.type + "";
              this.options = JSON.parse(this.ruleForm.options);
              if (this.ruleForm.type == 1) {
                this.ruleForm.answer = this.ruleForm.answer.split(",");
              }
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
    // 提交
    onSubmit() {
      // return;
      if (!this.options && this.type != 3) {
        this.$message.error("请设置选项");
        return;
      }
      if (this.ruleForm.type == 1) {
        this.ruleForm.answer = this.ruleForm.answer.join(",");
      }
		if(this.ruleForm.type!=4&&this.ruleForm.answer==''){
			this.$message.error("答案不能为空");
			return false
		}
      this.ruleForm.options = JSON.stringify(this.options);
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: `${
              !this.ruleForm.id
                ? `${this.$api.examquestionsave}`
                : `${this.$api.examquestionupdate}`
            }`,
            method: "post",
            data: this.ruleForm
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.parent.showFlag = false;
                  this.parent.search();
                }
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
    // 返回
    back() {
      this.parent.showFlag = false;
    },
	// 新增选项弹窗
    addOptionsDialog() {
      this.addOptionsDialogVisiable = !this.addOptionsDialogVisiable;
    },
	// 新增选项
    addOptions() {
      this.$refs["dialogForm"].validate(valid => {
        if (valid) {
			if(this.editIndex == -1){
			  this.options.push({
				text: this.dialogForm.code + "." + this.dialogForm.text,
				code: this.dialogForm.code,
			  });
			  
			}else{
				this.options[this.editIndex] = {
					text: this.dialogForm.code + "." + this.dialogForm.text,
					code: this.dialogForm.code,
				}
			}
			this.dialogForm = {};
			this.addOptionsDialogVisiable = !this.addOptionsDialogVisiable;
			this.editIndex = -1
        }
      });
    },
	// 修改选项
	editOptions(index) {
		this.editIndex = index
		let arr = JSON.parse(JSON.stringify(this.options[index]))
		arr.text = arr.text.split(`${arr.code}.`)[1]
		this.dialogForm = arr
		this.addOptionsDialogVisiable = !this.addOptionsDialogVisiable;
	},
	// 删除选项
    deleteOptions(index) {
      this.options.splice(index, 1);
    },
    onPaperChange(e) {
      for (let item of this.paperOptions) {
        if (item.id == e) {
          this.ruleForm.papername = item.name;
        }
      }
    },
	// 是否有相同选项
	changeCode(index) {
		for (let x in this.options) {
			if (this.options[x].code == index) {
				return true
			}
		}
		return false
	},
    typeChange(e) {
		if (e == 2) {
			this.options = [];
			this.options.push({
				text: "A.对",
				code: "A"
			});
			this.options.push({
				text: "B.错",
				code: "B"
			});
			this.ruleForm.answer = ''
		} else {
			if(e==1){
				this.ruleForm.answer = []
			}else{
				this.ruleForm.answer = ''
			}
			this.options = [];
		}
    },
	answerChange(){
		this.$forceUpdate()
	},
  }
};
</script>
<style lang="scss" scoped>

.options {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  width: 400px;
}
	
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  	  padding: 0 10px 0 0;
	  	  color: #333;
	  	  font-weight: 500;
	  	  display: inline-block;
	  	  width: 150px;
	  	  font-size: inherit;
	  	  line-height: 40px;
	  	  text-align: right;
	  	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 150px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  	  padding: 0 12px;
	  	  color: inherit;
	  	  font-size: 14px;
	  	  border-color: #ddd;
	  	  border-radius: 0px;
	  	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  	  outline: none;
	  	  background: none;
	  	  width: auto;
	  	  border-width: 0 0 1px;
	  	  border-style: solid;
	  	  min-width: 350px;
	  	  height: 39px;
	  	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  	  border-radius: 0px;
	  	  padding: 0 10px;
	  	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  	  outline: none;
	  	  color: inherit;
	  	  background: none;
	  	  width: auto;
	  	  font-size: 14px;
	  	  border-color: #ddd;
	  	  border-width: 0 0 1px;
	  	  border-style: solid;
	  	  height: 39px;
	  	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  	  border-radius: 0px;
	  	  padding: 0 10px 0 30px;
	  	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  	  outline: none;
	  	  color: inherit;
	  	  background: none;
	  	  width: auto;
	  	  font-size: 14px;
	  	  border-color: #ddd;
	  	  border-width: 0 0 1px;
	  	  border-style: solid;
	  	  height: 39px;
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
	  	  cursor: pointer;
	  	  color: #bbb;
	  	  object-fit: cover;
	  	  font-size: 24px;
	  	  border-color: #ddd;
	  	  line-height: 60px;
	  	  border-radius: 0px;
	  	  background: none;
	  	  width: 140px;
	  	  border-width: 0 0 1px;
	  	  border-style: solid;
	  	  text-align: center;
	  	  height: 60px;
	  	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  	  cursor: pointer;
	  	  color: #bbb;
	  	  object-fit: cover;
	  	  font-size: 24px;
	  	  border-color: #ddd;
	  	  line-height: 60px;
	  	  border-radius: 0px;
	  	  background: none;
	  	  width: 140px;
	  	  border-width: 0 0 1px;
	  	  border-style: solid;
	  	  text-align: center;
	  	  height: 60px;
	  	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  	  cursor: pointer;
	  	  color: #bbb;
	  	  object-fit: cover;
	  	  font-size: 24px;
	  	  border-color: #ddd;
	  	  line-height: 60px;
	  	  border-radius: 0px;
	  	  background: none;
	  	  width: 140px;
	  	  border-width: 0 0 1px;
	  	  border-style: solid;
	  	  text-align: center;
	  	  height: 60px;
	  	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  	  padding: 12px;
	  	  color: inherit;
	  	  font-size: 14px;
	  	  border-color: #ddd;
	  	  border-radius: 0px;
	  	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  	  outline: none;
	  	  background: none;
	  	  width: auto;
	  	  border-width: 0 0 1px;
	  	  border-style: solid;
	  	  min-width: 50%;
	  	  height: auto;
	  	}
	
	.add-update-preview .btn .btn3 {
				border: 1px solid #0260ad;
				cursor: pointer;
				border-radius: 4px;
				padding: 0 20px;
				margin: 0px 4px;
				outline: none;
				color: #0260ad;
				background: none;
				width: auto;
				font-size: 14px;
				line-height: 24px;
				height: 36px;
			}
	
	.add-update-preview .btn .btn3:hover {
				transform: scale(0.9) translate3d(0px, -10px, 0px);
				opacity: 0.8;
			}
	
	.add-update-preview .btn .btn4 {
				border: 0px solid rgba(126, 96, 16, .2);
				cursor: pointer;
				border-radius: 4px;
				padding: 0 20px;
				margin: 0px 4px;
				outline: none;
				color: #fff;
				background: #ff518a;
				width: auto;
				font-size: 14px;
				line-height: 24px;
				height: 36px;
			}
	
	.add-update-preview .btn .btn4:hover {
				transform: scale(0.9) translate3d(0px, -10px, 0px);
				opacity: 0.8;
			}
</style>
