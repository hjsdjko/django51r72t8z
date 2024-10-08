<template>
	<div class="container">
		<div class="top-content">
			<div class="left-content">
				{{paper.name}}（ 总题目：
				<span class="tip-text">{{dataList.length}}</span> 道。）
			</div>
			<div class="right-content">
				考试剩余时间：
				<span class="tip-text">{{SecondToDate}}</span>
			</div>
			<div class="right-content">
				<el-button type="danger" round @click="leaveTap">结束考试</el-button>
			</div>
		</div>
		<el-card class="card_view" v-if="isEndFlag">
			<div class="item-content" style="text-align: center;">
				<span class="label">
					考试成绩：
					<span style="font-size:24px;font-weight:blod;color:red">{{scoreChange()}}</span>
				</span>
				<span class="content">分</span>
			</div>
			<div class="item-content" style="color:#888888;text-align: center;">
				<el-button v-if="!isSubmitFlag" @click="isSubmitFlag=true" type="primary">查看解析</el-button>
				<el-button @click="finishTap" type="primary">结束考试</el-button>
			</div>
		</el-card>
		<el-card class="card_view" v-if="!isEndFlag||isSubmitFlag">
			<div v-for="(item,index) in dataList" :key="index" style="width: 100%;">
				<div class="item-content">
					<span class="label">
						{{index + 1}}：
					</span>
					<span class="content">{{item.questionname}}</span>({{item.score}}分)
					<el-tag type="success" v-if="item.type==0">单选题</el-tag>
					<el-tag type="warning" v-if="item.type==1">多选题</el-tag>
					<el-tag type="info" v-if="item.type==2">判断题</el-tag>
					<el-tag type="primary" v-if="item.type==3">填空题</el-tag>
					<el-tag type="danger" v-if="item.type==4">主观题</el-tag>
				</div>
				<div v-if="(item.type==0||item.type==2)&&!isSubmitFlag" class="item-content"
					style="border-top:1px solid #eeeeee">
					<span class="label">选择答案：</span>
					<span class="content">
						<el-select v-model="item.myanswer">
							<el-option :label="item.text" :value="item.code" v-for="(item,index) in item.optionList"
								v-bind:key="index"></el-option>
						</el-select>
					</span>
				</div>
				<div v-if="item.type==1&&!isSubmitFlag" class="item-content" style="border-top:1px solid #eeeeee">
					<span class="label">选择答案：</span>
					<span class="content">
						<el-select v-model="item.myanswer" multiple>
							<el-option :label="item.text" :value="item.code" v-for="(item,index) in item.optionList"
								v-bind:key="index"></el-option>
						</el-select>
					</span>
				</div>
				<div v-if="item.type==3&&!isSubmitFlag" class="item-content" style="border-top:1px solid #eeeeee">
					<span class="label">填写答案：</span>
					<span class="content">
						<el-input v-model="item.myanswer" style="width:300px" placeholder="填写答案" clearable></el-input>
					</span>
				</div>
				<div v-if="item.type==4&&!isSubmitFlag" class="item-content" style="border-top:1px solid #eeeeee">
					<span class="label">填写答案：</span>
					<span class="content">
						<el-input v-model="item.myanswer" type="textarea" style="width:300px" placeholder="填写答案" clearable></el-input>
					</span>
				</div>
				<div v-if="isSubmitFlag" class="item-content" style="border-top:1px solid #eeeeee">
					<span class="label">填写答案：</span>
					<span class="content">{{item.myanswer}}</span>
				</div>
				<div v-if="isSubmitFlag" class="item-content" style="color:#888888">
					<span class="label" v-if="item.type!=4" style="color:red;margin-right:20px">{{item.myanswer==item.answer?'正确':'错误'}}</span>
					<span class="label">解析：</span>
					<span class="content">{{item.analysis}}</span>
				</div>
			</div>
			<div class="item-content" style="color:#888888">
				<el-button v-if="!isSubmitFlag" @click="submitTap" type="primary">提交答案</el-button>
			</div>
		</el-card>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				dataList: [],
				// 当前题目
				paper: {},
				// 倒计时定时器
				inter: null,
				// 倒计时时间
				count: 0,
				// 是否提交点击下一题
				isSubmitFlag: false,
				user: {},
				// 考试是否结束
				isEndFlag: false,
				// 是否存在主观题
				hassubject: false
			};
		},
		computed: {
			SecondToDate: function() {
				var time = this.count;
				if (null != time && "" != time) {
					if (time > 60 && time < 60 * 60) {
						time =
						parseInt(time / 60.0) +
						"分钟" +
						parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) +
						"秒";
					} else if (time >= 60 * 60 && time < 60 * 60 * 24) {
						time =
						parseInt(time / 3600.0) +
						"小时" +
						parseInt(
						  (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
						) +
						"分钟" +
						parseInt(
						  (parseFloat(
							(parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
						  ) -
							parseInt(
							  (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
							)) *
							60
						) +
						"秒";
					} else if (time >= 60 * 60 * 24) {
						time =
						parseInt(time / 3600.0 / 24) +
						"天" +
						parseInt(
						  (parseFloat(time / 3600.0 / 24) - parseInt(time / 3600.0 / 24)) *
							24
						) +
						"小时" +
						parseInt(
						  (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
						) +
						"分钟" +
						parseInt(
						  (parseFloat(
							(parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
						  ) -
							parseInt(
							  (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
							)) *
							60
						) +
						"秒";
					} else {
						if(parseInt(time)<=0) {
							time = "0秒";
						} else {
							time = parseInt(time) + "秒";
						}
					}
				}
				return time;
			}
		},
		destroyed: function() {
			window.clearInterval(this.inter);
		},
		mounted() {
			this.$http({
				url: `${this.$storage.get("sessionTable")}/session`,
				method: "get"
			}).then(({ data }) => {
				if (data && data.code === 0) {
					this.user = data.data;
				} else {
					this.$message.error(data.msg);
				}
			});
			console.log(this.$route.params.id);
			// 获取 试题
			var params = {
				page: 1,
				limit: 999,
				paperid: this.$route.params.id
			};
			this.$http({
				url: this.$api.examquestionpage,
				method: "get",
				params: params
			}).then(({ data }) => {
				if (data && data.code === 0) {
					for(let x in data.data.list){
						if(data.data.list[x].type==4){
							this.hassubject = true
						}
						if(data.data.list[x].options){
							data.data.list[x].optionList = JSON.parse(data.data.list[x].options)
						}
					}
					data.data.list.sort(function (a, b) {
						return (b.sequence - a.sequence)
					});
					this.dataList = data.data.list;
				} else {
					this.dataList = [];
				}
				this.dataListLoading = false;
			});
			// 获取试题测试
			this.$http({
				url: `${this.$api.exampaperinfo}${this.$route.params.id}`,
				method: "get"
			}).then(({ data }) => {
				if (data && data.code === 0) {
					this.paper = data.data;
					if (this.paper.time) {
						this.count = this.paper.time*60;
						if (this.count > 0) {
							var _this = this;
							this.inter = window.setInterval(function() {
								_this.count = _this.count - 1;
								if (_this.count < 0) {
									window.clearInterval(_this.inter);
									_this.isEndFlag = true;
								}
							}, 1000);
						}
					}
				} else {
					this.$message.error(data.msg);
				}
			});
		},
		methods: {
			leaveTap() {
				this.$confirm(`确定离开考试?未答题目按0分计算`, "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					this.isEndFlag = true;
				});
			},
			finishTap() {
				this.$router.go(-1);
			},
			submitTap() {
				this.$confirm(`是否完成作答，提交试题测试？`, "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					for(let x in this.dataList){
						if(this.dataList[x].type==1){
							this.dataList[x].myanswer = this.dataList[x].myanswer.sort().join(',')
						}
						if(this.dataList[x].type!=4){
							if(this.dataList[x].answer == this.dataList[x].myanswer){
								this.dataList[x].myscore = this.dataList[x].score
							}else{
								this.dataList[x].myscore = 0
							}
						}else{
							this.dataList[x].myscore = 0
						}
						this.saverecord(this.dataList[x])
					}
					this.isEndFlag = true;
				});
			},
			// 保存答题记录
			saverecord(row){
				let record = {
					userid: this.user.id,
					username: this.user.xueshengxingming,
					paperid: this.paper.id,
					papername: this.paper.name,
					questionid: row.id,
					questionname: row.questionname,
					options: row.options,
					score: row.score,
					answer: row.answer,
					analysis: row.analysis,
					myscore: row.myscore,
					
					myanswer: row.myanswer,
					type: row.type,
					ismark: this.hassubject? 0 : 1
				};
				this.$http({
					url: `${this.$api.examrecordsave}`,
					method: "post",
					data: record
				}).then(({
					data
				}) => {});
			},
			scoreChange(){
				let score = 0
				for(let x in this.dataList){
					score += Number(this.dataList[x].myscore)
				}
				return score
			},
		}
	};
</script>
<style lang="scss" scoped>
	.container {
		border: 1px solid #eeeeee;
	}
	
	.tip-text {
		font-size: 24px;
		color: #f96332;
	}
	
	.top-content {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		font-size: 18px;
		background: #409eff;
		color: #ffffff;
		border-radius: 20px;
	}
	.detail-content {
		padding: 20px;
		color: #333333;
	
		.item-content {
			padding: 20px;
		}
	}
	.card_view {
		width: 90%;
		margin: 20px auto;
		padding: 20px;
		color: #333333;
		.item-content {
			padding: 20px;
			width: 100%;
		}
	}
</style>
